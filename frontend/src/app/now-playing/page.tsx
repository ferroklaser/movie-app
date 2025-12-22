'use client'
import MovieCard from "@/src/components/MovieCard";
import MovieList, { Movie } from "@/src/components/MovieList"
import MyButton from "@/src/components/MyButton";
import { useState, useEffect } from "react";

const NowPlaying = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/movies/now-playing", {
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                });
                const data = await response.json();
                const formattedData = data.results.map((movie : any) => ({
                    id: movie.id,
                    title: movie.title,
                    posterUrl: 'https://image.tmdb.org/t/p/original/' + movie.poster_path,
                    rating: movie.vote_average, 
                    releaseDate: new Date(movie.release_date).toLocaleDateString()
                }));

                setMovies(formattedData);
            } catch (err : any) {
                console.log(err.message);
            }
        }

        fetchData();
        return () => {}
    }, []);

    const movieCards = movies.map(movie =>
        <MovieCard key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
        >
            <MyButton label="View"/>
            <MyButton label="Add"/>
        </MovieCard>
    )

    return (
        <MovieList>
            {movieCards}
        </MovieList>
    )
}

export default NowPlaying;