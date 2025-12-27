'use client'
import MovieList, { Movie } from "@/src/components/MovieList";
import { useState } from "react";
import MovieCard from "@/src/components/MovieCard";
import MyButton from "@/src/components/MyButton";

const MyList = ({ initialMovies } : { initialMovies : Movie[] }) => {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);

    const handleDelete = async (id : number) => {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        setMovies(movies.filter(movie => movie.id !== id));
    }

    const movieCards = movies.map(movie =>
        <MovieCard key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
        >
            <MyButton label="View" onClick={() => { }} />
            <MyButton label="Remove" onClick={() => handleDelete(movie.id)} />
        </MovieCard>)

    return (
        <MovieList>
            {movieCards}
        </MovieList>
    )
}

export default MyList