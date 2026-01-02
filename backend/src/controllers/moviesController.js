import { pool } from "../db.js"

const TMDB_BASE_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const VALID_SORT_FIELDS = ['created_at', 'release_date', 'rating'];
const VALID_SORT_ORDER = ['ASC', 'DESC'];

// get movies from local database for a specific page
export const getUserMovies = async (req, res) => {
    try {
        const limit = 20;
        const currentPage = Number(req.query.page) || 1;
        const offset = limit * (currentPage - 1);
        
        const sortField = req.query.sort;
        const sortOrder = req.query.order;

        const [dataQuery, countQuery] = await Promise.all([
            await pool.query(`SELECT * FROM movies ORDER BY ${sortField} ${sortOrder} LIMIT $1 OFFSET $2`, [limit, offset]),
            await pool.query('SELECT COUNT(*) FROM movies')
        ]);

        const totalNumberOfRows = parseInt(countQuery.rows[0].count);
        const numberOfPages = Math.ceil(totalNumberOfRows / limit)
        res.status(200).json({
            results: dataQuery.rows,
            total_pages: numberOfPages
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting all user movies');
    }
};

// insert a movie into database
export const insertUserMovie = async (req, res) => {
    try {
        const { id, title, posterPath, rating, releaseDate } = req.body;
        const result = await pool.query(
            'INSERT INTO movies (tmdb_id, title, poster_path, rating, release_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, title, posterPath, rating, releaseDate]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            res.status(409).json({ error : "The movie is already in your list."})
        } else {
            console.error(err.message);
            res.status(500).send('Error inserting user movie');
        }
        
    }
}

//: is to represent a variable
export const deleteUserMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM movies WHERE id = $1', [id]);
        res.status(200).json('Movie deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error deleting user movie');
    }
}

// result.ok only for fetching from an api
export const getNowPlayingMovies = async (req, res) => {
    try {
        const pageNumber = req.query.page || 1;
        const result = await fetch(TMDB_BASE_URL + `now_playing?language=en-US&page=${pageNumber}&api_key=${TMDB_API_KEY}`);
        if (!result.ok) {
            throw new Error(`Response status: ${result.status}`);
        }
        const data = await result.json();
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting now playing movies from TMDB.');
    }
}

export const getUpcomingMovies = async (req, res) => {
    try {
        const pageNumber = req.query.page || 1;
        const result = await fetch(TMDB_BASE_URL + `upcoming?language=en-US&page=${pageNumber}&api_key=${TMDB_API_KEY}`);
        if (!result.ok) {
            throw new Error(`Response status: ${result.status}`);
        }
        const data = await result.json();
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting upcoming movies from TMDB.');
    }
}

export const getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await fetch(TMDB_BASE_URL + `${id}?language=en-US&api_key=${TMDB_API_KEY}`);
        if (!result.ok) {
            throw new Error(`Response status: ${result.status}`);
        }
        const data = await result.json();
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting movie details');
    }
}