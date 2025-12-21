'use client'
import MovieList, { Movie } from "@/src/components/MovieList"
import { useEffect, useState } from "react"

const MyList = () => {
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
                        "Content-Type" : "application.json"
                    },
                });

                const data = await response.json();

                const formattedData = data.map((movie : any) => ({
                    id: movie.id,
                    title: movie.title,
                    posterUrl: movie.poster_url,
                    rating: movie.rating,
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

    return (
        <MovieList movies={movies} onDelete={handleDelete}/>
    )
}

export default MyList;