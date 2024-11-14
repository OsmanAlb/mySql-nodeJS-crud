import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});


export const checkConnection = async () => {
    try {
        // Directly run a query on the pool object
        await pool.query('SELECT 1'); // A simple query to check if the connection is alive
        console.log("Database connection successful!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};