import pool from "../config/db.js";

export const login = async(username, password) => {
    const rows ='SELECT * FROM users WHERE username = ? AND password = ?';
    const [foundUser] = await pool.query(rows, [username, password]);
    // console.log('foundUser===',foundUser);
    return foundUser[0];
}

export const fetchUserWithRole = async(username) => {
    const sql = "SELECT r.role FROM roles AS r " +
                "INNER JOIN users AS u " +
                "ON r.user_id = u.id " +
                "WHERE u.username = ?";

    const [roles] = await pool.query(sql, [username]);
    // console.log('roles===', roles);

    const userRoles = roles.map(role => role.role);
    // console.log('userRoles===', userRoles);           

    return userRoles;
}

export const getAllUser = async () => {
    const sql = `
        SELECT u.id, u.username, u.email, r.role
        FROM users u
        INNER JOIN roles r
        ON u.id = r.user_id
        WHERE r.role = 'user'
    `;

    const [rows] = await pool.query(sql);
    return rows;
};