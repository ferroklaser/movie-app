'use client'
import MovieCard from "@/src/components/MovieCard";
import MovieList, { Movie } from "@/src/components/MovieList"
import MyButton from "@/src/components/MyButton";
import { formatDateToIso } from "@/src/utilities/formatDateToIso";
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
                    posterPath: movie.poster_path,
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

    const handleAdd = async (movie : Movie) => {
        movie.releaseDate = formatDateToIso(movie.releaseDate);
        const response = await fetch("http://localhost:3000/movies", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(movie)
        });
        const data = await response.json();
        console.log(data)
    }

    const movieCards = movies.map(movie =>
        <MovieCard key={movie.id}
            id={movie.id}
            tmdb_id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
        >
            <MyButton label="View"/>
            <MyButton label="Add" onClick={() => handleAdd(movie)}/>
        </MovieCard>
    )

    return (
        <MovieList>
            {movieCards}
        </MovieList>
    )
}

export default NowPlaying;