import express from 'express';
import { getUserMovie, insertUserMovie, deleteUserMovie, getNowPlayingMovies, getUpcomingMovies } from '../controllers/moviesController.js';

const router = express.Router();

//Get all movies
router.get('/', getUserMovie);

//Insert movie
router.post('/', insertUserMovie);

//Delete a movie
//: is to represent a variable
router.delete('/:id', deleteUserMovie);

router.get('/now-playing', getNowPlayingMovies);

router.get('/upcoming', getUpcomingMovies);

export default router;