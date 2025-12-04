import express from 'express';
import { pool } from "../db.js"

const router = express.Router();

//Get all movies
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM movies');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

export default router;