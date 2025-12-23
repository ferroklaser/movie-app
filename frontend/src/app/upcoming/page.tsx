'use client'
import MovieCard from "@/src/components/MovieCard"
import MovieList, { Movie } from "@/src/components/MovieList"
import MyButton from "@/src/components/MyButton"
import { useEffect, useState } from "react"
import { formatDateToIso } from "@/src/utilities/formatDateToIso"

const Upcoming = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/movies/upcoming", {
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
            const formattedMovie = {
                ...movie,
                releaseDate : formatDateToIso(movie.releaseDate)
            }
            const response = await fetch("http://localhost:3000/movies", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formattedMovie)
            });
            const data = await response.json();
            if (response.status == 409) {
                alert(data.error);
            }
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
            <MyButton label="View" />
            <MyButton label="Add" onClick={() => handleAdd(movie)}/>
        </MovieCard>
    )

    return (
        <MovieList>
            {movieCards}
        </MovieList>
    )
}

export default Upcoming;