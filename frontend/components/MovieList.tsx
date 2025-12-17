import React from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
    const movies = [
        {
            id: 1,
            title: "Inception",
            poster_url: "https://image.tmdb.org/t/p/original/frq4ygwcIMusECNv9rPBrvJwyxG.jpg",
            release_date: "2010-07-15",
            rating: 8.8
        },
        {
            id: 2,
            title: "The Super Mario Bros. Movie",
            poster_url: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
            release_date: "2023-04-05",
            rating: 7.8
        }
    ];

    const movieCards = movies.map(movie => 
        <MovieCard key={movie.id} title={movie.title} posterUrl={movie.poster_url} rating={movie.rating} releaseDate={movie.release_date}/>
    )

    return (
        <div className="grid grid-cols-5 gap-5">
            {movieCards}
        </div>
    )
}

export default MovieList;