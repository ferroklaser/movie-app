import { pool } from "../db.js"
import { notifyActivity } from "../utilities/notifyActivity.js";
import { supabase } from "../supabase.js";

const TMDB_BASE_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// get movies from local database for a specific page
export const getUserMovies = async (req, res) => {
    try {
        const limit = 20;
        const currentPage = Number(req.query.page) || 1;
        const offset = limit * (currentPage - 1);
        
        const sortField = req.query.sort;
        const sortOrder = req.query.order;

        const { data : movies, count, error } = await supabase
            .from('movies')
            .select('*', { count: 'exact' })
            .order(sortField, { ascending: 'asc' === sortOrder })
            .range(offset, offset + limit - 1)

        if (error) throw error

        const totalNumberOfRows = count
        const numberOfPages = Math.ceil(totalNumberOfRows / limit)

        res.status(200).json({
            results: movies,
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

        const newMovie = {
            tmdb_id: id,
            title: title,
            poster_path: posterPath,
            rating: rating,
            release_date: releaseDate
        }

        console.log(newMovie)

        const { data : movie, error } = await supabase
            .from('movies')
            .insert(newMovie)
            .select()
            .single()

        if (error) {
            console.log(error)

            if (error.code === '23505') {
                return res.status(409).json({
                    success: false,
                    error: "This movie is already in your watchlist!"
                })
            }
        } 

        await notifyActivity(title)
        res.status(201).json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Error inserting user movie');
    }
}

//: is to represent a variable
export const deleteUserMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await supabase
            .from("movies")
            .delete()
            .eq('id', id)

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

export const getPopularMovies = async (req, res) => {
    try {
        const pageNumber = req.query.page || 1;
        const result = await fetch(TMDB_BASE_URL + `popular?language=en-US&page=${pageNumber}&api_key=${TMDB_API_KEY}`);
        if (!result.ok) {
            throw new Error(`Response status: ${result.status}`);
        }
        const data = await result.json();
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting popular movies from TMDB.');
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

export const searchMovie = async (req, res) => {
    const { query, page } = req.query;

    try {
        const pageNumber = page || 1;
        const result = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=${pageNumber}&language=en-US&api_key=${TMDB_API_KEY}`);
        if (!result.ok) {
            throw new Error(`Response status: ${result.status}`);
        }
        const data = await result.json();
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting popular movies from TMDB.');
    }
}