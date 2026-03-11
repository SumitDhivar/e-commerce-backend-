import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { login, fetchUserWithRole, getAllUser } from "../models/UserModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUser();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user exists
        const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).send({ error: "User with this email already exists" });
        }

        const userRole = role || "user";
        const [result] = await pool.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, userRole]);

        const newUser = { id: result.insertId, username, email, role: userRole };
        return res.status(201).send({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};

export const deleteByUsername = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE username = ?', [req.params.username]);
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send(`<h3>User with username ${req.params.username} is deleted<h3/>`);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT username, email, role FROM users WHERE id = ?', [req.params.userId]);
        if (rows.length === 0) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
};

export const userlogin = async (req, res) => {
    const requestedUser = req.body;
    // console.log('requestedUser===',requestedUser);

    const foundUser = await login(requestedUser.username, requestedUser.password);
    // console.log('foundUser===',foundUser);

    if (foundUser) {

        const roles = await fetchUserWithRole(requestedUser.username);
        // console.log('roles===',roles);

        const token = jwt.sign({ username: requestedUser.username, role: roles }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TIME });
        console.log(token);
        res.cookie("jwtcookie", token, { maxAge: 10 * 1000 });
        return res.status(200).send({ message: "Login successful" });
    } else {
        return res.status(404).send({ error: "Invalid username or password" });
    }
}