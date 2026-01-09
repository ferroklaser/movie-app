import express from 'express';
import { getUserMovies, 
    insertUserMovie, 
    deleteUserMovie, 
    getNowPlayingMovies, 
    getUpcomingMovies, 
    getMovieDetails,
    getPopularMovies
} from '../controllers/moviesController.js';


// express reads routes from top to bottom, specific first before generic.
const router = express.Router();

//Get all movies
router.get('/', getUserMovies);

//Insert movie
router.post('/', insertUserMovie);

//Get now-playing movies
router.get('/now-playing', getNowPlayingMovies);

//Get upcoming movies
router.get('/upcoming', getUpcomingMovies);

//Get popular movies
router.get('/popular', getPopularMovies);

//Get movie details
router.get('/:id', getMovieDetails);

//Delete a movie
//: is to represent a variable
router.delete('/:id', deleteUserMovie);

export default router;