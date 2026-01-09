'use client'
import MovieList, { Movie } from "@/src/components/MovieList";
import MovieCard from "@/src/components/MovieCard";
import MyButton from "@/src/components/MyButton";
import Pagination from "@/src/components/Pagination";

const Popular = ({ initialMovies, totalPages } : { initialMovies : Movie[], totalPages : number }) => {
    
    const movieCards = initialMovies.map(movie =>
        <MovieCard key={movie.id}
            id={movie.id}
            tmdb_id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
        >
            <MyButton label="View" onClick={() => {}}/>
            <MyButton label="Add" onClick={() => {}}/>
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

export default Popular;