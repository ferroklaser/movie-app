'use client'
import MovieCard from "@/src/components/MovieCard";
import MovieList, { Movie } from "@/src/components/MovieList"
import MyButton from "@/src/components/MyButton";
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

    const movieCards = movies.map(movie =>
        <MovieCard key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
        >
            <MyButton label="View" onClick={() => {}} />
            <MyButton label="Remove" onClick={() => handleDelete(movie.id)} />
        </MovieCard>)

    return (
        <MovieList>
            {movieCards}
        </MovieList> 
    )
}

export default MyList;