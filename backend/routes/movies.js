import express from 'express';
import { pool } from "../db.js"

const router = express.Router();

//Get all movies
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM movies');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting all movies');
    }
});

//Insert movie
router.post('/', async (req, res) => {
    try {
        const { api_id, title, poster_url, rating, release_date } = req.body;
        const result = await pool.query(
            'INSERT INTO movies (api_id, title, poster_url, rating, release_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [api_id, title, poster_url, rating, release_date]);
        //response back to front end so it knows to update
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Error inserting movie');
    }
});

//Delete a movie
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM movies WHERE id = $1', [id]);
        res.status(200).json('Movie deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error deleting movie');
    }
})

export default router;