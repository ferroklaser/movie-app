import React from "react";
import MovieCard from "./MovieCard";

export interface Movie {
    id: number,
    title : string,
    posterUrl : string, 
    rating : number,
    releaseDate : string
}

export interface MovieListProps {
    movies: Movie[],
    onDelete: (id : number) => void
}

const MovieList = ({ movies, onDelete } : MovieListProps) => {

    const movieCards = movies.map(movie =>
        <MovieCard key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
            onDelete={() => { onDelete }} />
    )

    return (
        <div className="grid grid-cols-5 gap-5 m-5">
            {movieCards}
        </div>
    )
}

export default MovieList;