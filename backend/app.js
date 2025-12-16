import moviesRouter from './routes/movies.js'
import express from 'express'
import cors from 'cors';

const app = express();
const port = 3000


app.use(express.json());
app.use(cors());
app.use('/movies', moviesRouter);
app.use(cors({ origin: 'http://localhost:3001' }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})