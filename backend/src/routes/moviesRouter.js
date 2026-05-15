import express from 'express';
import { getUserMovies, 
    insertUserMovie, 
    deleteUserMovie, 
    getNowPlayingMovies, 
    getUpcomingMovies, 
    getMovieDetails,
    getPopularMovies,
    searchMovie
} from '../controllers/moviesController.js';
import { requireAuth } from '../middleware/auth.js';


// express reads routes from top to bottom, specific first before generic.
const router = express.Router();

router.use(requireAuth)

//Get all movies
router.get('/', getUserMovies);

//Insert movie
router.post('/', insertUserMovie);

//Search movie
router.get('/search', searchMovie);

//Get now-playing movies
router.get('/now-playing', getNowPlayingMovies);

//Get upcoming movies
router.get('/upcoming', getUpcomingMovies);

//Get popular movies
router.get('/popular', getPopularMovies);

//Get movie details
router.get('/:id', getMovieDetails);

// Inside your protected routes file (e.g., routes/movies.js)
router.get('/test-auth', (req, res) => {
  // If we get here, requireAuth worked perfectly!
  res.json({
    success: true,
    message: "Express successfully read your cookie!",
    userId: req.user.id,
    email: req.user.email
  });
});

//Delete a movie
//: is to represent a variable
router.delete('/:id', deleteUserMovie);

export default router;