'use client'
import MovieList, { Movie } from "@/src/components/MovieList"
import { formatDateToIso } from "@/src/utilities/formatDateToIso"
import MovieCard from "@/src/components/MovieCard"
import MyButton from "@/src/components/MyButton"
import Pagination from "@/src/components/Pagination"

const Upcoming = ({ initialMovies, totalPages } : { initialMovies : Movie[], totalPages : number }) => {
    const handleAdd = async (movie : Movie) => {
        const formattedMovie = {
            ...movie,
            releaseDate: formatDateToIso(movie.releaseDate)
        }

        const response = await fetch("http://localhost:3001/api/express/movies", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formattedMovie),
            credentials: 'include'
        });

        const data = await response.json();
        if (response.status == 409) {
            alert(data.error);
            return;
        }
    }

    const movieCards = initialMovies.map(movie =>
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
        <>
            <MovieList>
                {movieCards}
            </MovieList>
            <div className="flex justify-end pr-5 pb-4">
                <div>
                    <Pagination totalPages={totalPages}/>
                </div>
            </div>
        </>
    )
}

export default Upcoming;