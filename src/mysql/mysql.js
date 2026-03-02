import mysql from 'mysql2';
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    connectionLimit: 5,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log("Database not connected", err.message)
    } else {
        console.log("Connected to database");
        connection.release();
    }
})

export default pool.promise();