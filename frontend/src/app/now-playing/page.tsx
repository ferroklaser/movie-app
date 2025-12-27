import { Movie } from "@/src/components/MovieList"
import NowPlaying from "./NowPlaying";

const NowPlayingPage = async ({ searchParams } : {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const { page } = await searchParams;
    let initialMovies : Movie[] = [];
    let totalPages : number = 0;
    const currentPage = Number(page) || 1;

    try {
        const response = await fetch(`http://localhost:3000/movies/now-playing?page=${currentPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        const formattedData = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            rating: movie.vote_average,
            releaseDate: new Date(movie.release_date).toLocaleDateString()
        }));
        totalPages = data.total_pages;
        initialMovies = formattedData;
    } catch (err: any) {
        console.log(err.message);
    }

    return (
        <NowPlaying initialMovies={initialMovies} totalPages={totalPages}/>
    )
}

export default NowPlayingPage;