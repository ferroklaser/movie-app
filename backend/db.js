const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.LOCAL_HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
})

module.exports = {
    query: (text, params) => pool.query(text, params)
};