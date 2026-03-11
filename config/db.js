import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // Trying 'root' as password
    database: 'myStore_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// A separate connection without database selected for initialization
export const rootPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
