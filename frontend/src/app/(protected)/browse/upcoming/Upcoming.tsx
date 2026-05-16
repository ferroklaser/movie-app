'use client'
import { Movie } from "@/src/model/movies"
import MovieList from "@/src/components/MovieList"
import { formatDateToIso } from "@/src/utilities/formatDateToIso"
import MovieCard from "@/src/components/MovieCard"
import MyButton from "@/src/components/MyButton"
import Pagination from "@/src/components/Pagination"
import AddMovieButton from "@/src/components/Browse/AddMovieButton"

const Upcoming = ({ initialMovies, totalPages } : { initialMovies : Movie[], totalPages : number }) => {

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
            <AddMovieButton movie={movie} />
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