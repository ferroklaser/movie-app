'use client'
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import MovieList from "@/src/components/MovieList";
import MovieCard from "@/src/components/MovieCard";
import Pagination from "@/src/components/Pagination";
import { blue, white } from "@/src/resources/colors";
import { Movie } from "@/src/model/movies";
import AddMovieButton from "@/src/components/Browse/AddMovieButton";

const NowPlaying = ({ initialMovies, totalPages } : { initialMovies : Movie[], totalPages : number}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleView = async (movie : Movie) => {
        const tmdb_id = movie.id;
        if (!tmdb_id) {
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('view', tmdb_id.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll : false });
    }

    const movieCards = initialMovies.map(movie =>
        <MovieCard key={movie.id}
            id={movie.id}
            tmdb_id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
            posterOnClick={() => handleView(movie)}
        >
            <AddMovieButton movie={movie} style={{ width: '100%' }}/>
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

export default NowPlaying;