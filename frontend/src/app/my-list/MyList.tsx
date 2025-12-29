'use client'
import MovieList, { Movie } from "@/src/components/MovieList";
import MovieCard from "@/src/components/MovieCard";
import MyButton from "@/src/components/MyButton";
import Pagination from "@/src/components/Pagination";
import { useRouter } from "next/navigation";

const MyList = ({ initialMovies, totalPages } : { initialMovies : Movie[], totalPages : number }) => {
    const router = useRouter();

    const handleDelete = async (id : number) => {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        if (response.ok) {
            router.refresh();
        }
    }

    const movieCards = initialMovies.map(movie =>
        <MovieCard key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
        >
            <MyButton label="View" onClick={() => { }} />
            <MyButton label="Remove" onClick={() => handleDelete(movie.id)} />
        </MovieCard>)

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

export default MyList