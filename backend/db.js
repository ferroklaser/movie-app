import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;

dotenv.config();

export const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.LOCAL_HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
})

export const query = (text, params) => pool.query(text, params)
