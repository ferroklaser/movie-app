'use client'
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import MovieList, { Movie } from "@/src/components/MovieList";
import { formatDateToIso } from "@/src/utilities/formatDateToIso";
import MovieCard from "@/src/components/MovieCard";
import MyButton from "@/src/components/MyButton";
import Pagination from "@/src/components/Pagination";
import { blue, white } from "@/src/resources/colors";

const NowPlaying = ({ initialMovies, totalPages } : { initialMovies : Movie[], totalPages : number}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleAdd = async (movie : Movie) => {
        const formattedMovie = {
            ...movie,
            releaseDate: formatDateToIso(movie.releaseDate)
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
            return;
        }
    }

    const handleView = async (movie : Movie) => {
        const tmdb_id = movie.id;
        if (!tmdb_id) {
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('view', tmdb_id.toString());
        router.push(`${pathname}?${params.toString()}`);
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
            <MyButton label="Add" onClick={() => handleAdd(movie)} style={{ width: '100%' }}/>
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