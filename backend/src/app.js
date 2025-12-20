import moviesRouter from './routes/moviesRouter.js'
import express from 'express'
import cors from 'cors';

const app = express();
const port = process.env.PORT

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use('/movies', moviesRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})