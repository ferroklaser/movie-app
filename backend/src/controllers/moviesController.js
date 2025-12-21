import { pool } from "../db.js"

const TMDB_BASE_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// get all movies from database
export const getUserMovie = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM movies');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting all user movies');
    }
};

// insert a movie into database
export const insertUserMovie = async (req, res) => {
    try {
        const { api_id, title, poster_url, rating, release_date } = req.body;
        const result = await pool.query(
            'INSERT INTO movies (api_id, title, poster_url, rating, release_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [api_id, title, poster_url, rating, release_date]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Error inserting user movie');
    }
}

//: is to represent a variable
export const deleteUserMovie = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM movies WHERE id = $1', [id]);
        res.status(200).json('Movie deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error deleting user movie');
    }
}

export const getNowPlayingMovies = async (req, res) => {
    try {
        const result = await fetch(TMDB_BASE_URL + `now_playing?language=en-US&page=1&api_key=${TMDB_API_KEY}`);
        const data = await result.json();
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting now playing movies from TMDB.');
    }
}
