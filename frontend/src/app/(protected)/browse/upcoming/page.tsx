import { Movie } from "@/src/components/MovieList"
import Upcoming from "./Upcoming"
import { serverFetch } from "@/src/utilities/api";

const UpcomingPage = async ({ searchParams } : {
    searchParams : Promise<{[key: string]: string | string[] | undefined }>
}) => {
    const { page } = await searchParams;
    let initialMovies : Movie[] = [];
    let totalPages : number = 0;
    const currentPage = Number(page) || 1;

    const { data, response } = await serverFetch(`/movies/upcoming?page=${currentPage}`, {
        method: "GET"
    })
    
    const formattedData = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        rating: movie.vote_average,
        releaseDate: new Date(movie.release_date).toLocaleDateString('en-GB')
    }));
    initialMovies = formattedData;
    totalPages = data.total_pages;


        
    return (
        <Upcoming initialMovies={initialMovies} totalPages={totalPages}/>
    )
}

export default UpcomingPage;