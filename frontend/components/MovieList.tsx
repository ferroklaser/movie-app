import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

export interface Movie {
    id: number,
    title : string,
    posterUrl : string, 
    rating : number,
    releaseDate : string
}

const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    // add the delete handling to parent and pass to child
    const handleDelete = async (id : number) => {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type" : "application/json"
            },
        });
        //to re render page
        setMovies(movies.filter(movie => movie.id !== id));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/movies", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const data = await response.json();

                // map returns new array
                const formattedData = data.map((movie : any) => ({
                    id: movie.id,
                    title: movie.title,
                    posterUrl: movie.poster_url,
                    rating: movie.rating,
                    releaseDate: new Date(movie.release_date).toLocaleDateString()
                }))

                setMovies(formattedData);
            } catch (error) {
                console.log("GET error")
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
             onDelete={() => {handleDelete(movie.id)}}/>
    )

    return (
        <div className="grid grid-cols-5 gap-5">
            {movieCards}
        </div>
    )
}

export default MovieList;