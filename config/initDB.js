import pool, { rootPool } from './db.js';

const initDB = async () => {
    try {
        console.log("Initializing database...");

        // 1. Create database if it doesn't exist
        await rootPool.query(`CREATE DATABASE IF NOT EXISTS myStore_db;`);
        console.log("Database 'myStore_db' ready.");

        // 2. Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log("Table 'users' ready.");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS roles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(255) NOT NULL DEFAULT 'user',
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);
        console.log("Table 'roles' ready.");

        // 3. Create products table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL
            );
        `);
        console.log("Table 'products' ready.");

        // Seed some initial products if empty
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM products');
        if (rows[0].count === 0) {
            await pool.query(`
                INSERT INTO products (name, price) VALUES 
                ('Laptop', 100.00),
                ('Smartphone', 200.00),
                ('Headphones', 300.00)
            `);
            console.log("Inserted initial products.");
        }

        // 4. Create cart_items table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cart_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL
            );
        `);
        console.log("Table 'cart_items' ready.");

        // 5. Create orders table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                total_amount DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Table 'orders' ready.");

        // 6. Create order_items table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
            );
        `);
        console.log("Table 'order_items' ready.");

        console.log("Database initialization completed successfully.");
        process.exit(0);

    } catch (error) {
        console.error("Error initializing database:", error);
        process.exit(1);
    }
};

initDB();
