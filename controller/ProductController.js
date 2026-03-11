import pool from '../config/db.js';

export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const [result] = await pool.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
        res.status(201).send({ id: result.insertId, name, price });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.productId]);
        if (rows.length === 0) return res.status(404).send({ error: "Product not found" });
        res.status(200).send(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.productId]);
        if (result.affectedRows === 0) return res.status(404).send({ error: "Product not found" });
        res.status(200).send(`<h3>Product with id ${req.params.productId} is deleted<h3/>`);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};