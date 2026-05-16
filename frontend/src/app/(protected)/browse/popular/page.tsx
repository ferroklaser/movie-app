import Popular from "./Popular"
import { Movie } from "@/src/components/MovieList";
import { serverFetch } from "@/src/utilities/api";


const PopularPage = async ({ searchParams } : {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const { page } = await searchParams;
    let initialMovies : Movie[] = [];
    let totalPages : number = 0;
    const currentPage = Number(page) || 1;

    const { data, response } = await serverFetch(`/movies/popular?page=${currentPage}`, {
        method: "GET"
    })

    if (!response?.ok) alert("Failed fetch")


    const formattedData = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        rating: movie.vote_average,
        releaseDate: new Date(movie.release_date).toLocaleDateString('en-GB')
    }));
    totalPages = data.total_pages;
    initialMovies = formattedData;

    return (
        <Popular initialMovies={initialMovies} totalPages={totalPages}/>
    )
}

export default PopularPage;