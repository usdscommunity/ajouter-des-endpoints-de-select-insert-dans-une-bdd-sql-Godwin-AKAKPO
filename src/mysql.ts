
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user : 'root',
    password: '',
    database: 'usds_tp2_bd',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const sql_db_pool_promise = pool.promise();

