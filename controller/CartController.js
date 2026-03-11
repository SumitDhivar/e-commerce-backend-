import pool from "../config/db.js";

export const getCartItems = async (req, res) => {
    try {
        // the frontend expects `id`, which might map to product.id in the original array
        const [rows] = await pool.query('SELECT product_id as id, name, price FROM cart_items');
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};

export const addToCart = async (req, res) => {
    try {
        console.log(req.body);
        const { id, name, price } = req.body;
        const [result] = await pool.query('INSERT INTO cart_items (product_id, name, price) VALUES (?, ?, ?)', [id, name, price]);
        res.status(201).send({ id: id, name, price });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM cart_items WHERE product_id = ?', [id]);
        res.status(200).send(`<h3>Item with id ${id} is deleted from cart</h3>`);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};
