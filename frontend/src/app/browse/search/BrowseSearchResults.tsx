import MovieCard from "@/src/components/MovieCard"
import MovieList, { Movie } from "@/src/components/MovieList"
import Pagination from "@/src/components/Pagination"

const BrowseSearchResults = ({ initialMovies, totalPages } : { initialMovies : Movie[], totalPages : number }) => {
    const movieCards = initialMovies.map(movie => 
        <MovieCard key={movie.id}
            id={movie.id}
            tmdb_id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
            posterOnClick={() => {}}
        ></MovieCard>
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