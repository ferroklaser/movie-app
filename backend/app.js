import moviesRouter from './routes/movies.js'
import express from 'express'

const app = express();
const port = 3000

app.use(express.json())
app.use('/movies', moviesRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})