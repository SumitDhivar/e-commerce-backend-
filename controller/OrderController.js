import pool from "../config/db.js";

export const placeOrder = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).send({ error: "Username is required to place an order" });
        }

        if (req.user.username !== username) {
            return res.status(403).send({ error: "Forbidden: You can only place orders for yourself" });
        }

        // 1. Get all items currently in the cart
        const [cartItems] = await pool.query('SELECT product_id, name, price FROM cart_items');

        if (cartItems.length === 0) {
            return res.status(400).send({ error: "Cart is empty" });
        }

        // 2. Calculate total amount
        const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

        // 3. Create the order record
        const [orderResult] = await pool.query(
            'INSERT INTO orders (username, total_amount) VALUES (?, ?)',
            [username, totalAmount]
        );
        const orderId = orderResult.insertId;

        // 4. Insert order items
        for (const item of cartItems) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, name, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.name, item.price]
            );
        }

        // 5. Clear the cart
        await pool.query('DELETE FROM cart_items');

        res.status(201).send({ message: "Order placed successfully", orderId });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).send({ error: "Database error while placing order" });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).send({ error: "Username is required" });
        }

        if (req.user.username !== username && !req.user.role?.includes('admin')) {
            return res.status(403).send({ error: "Forbidden: You can only view your own orders" });
        }

        // Fetch orders for the user
        const [orders] = await pool.query('SELECT * FROM orders WHERE username = ? ORDER BY created_at DESC', [username]);

        // For each order, fetch its items
        for (let order of orders) {
            const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
            order.items = items;
        }

        res.status(200).send(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).send({ error: "Database error while fetching orders" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.status(200).send(orders);
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).send({ error: "Database error while fetching orders" });
    }
};