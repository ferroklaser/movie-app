import { Movie } from "@/src/components/MovieList"
import MyList from "./MyList";
import { serverFetch } from "@/src/utilities/api/server-api";

const MyListPage = async ({ searchParams } : {
     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const { page, sort, order } = await searchParams;
    let initialMovies : Movie[] = [];
    let totalPages : number = 0;
    const currentPage = Number(page) || 1;
    const currentSort = sort || 'created_at';
    const currentOrder = order || 'ASC';

    const { data, response } = await serverFetch(`/movies?page=${currentPage}&sort=${currentSort}&order=${currentOrder}`, {
        method: "GET"
    })

    const formattedData = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        rating: movie.rating,
        releaseDate: new Date(movie.release_date).toLocaleDateString('en-GB')
    }));
    initialMovies = formattedData;
    totalPages = data.total_pages
    
    return (
        <MyList initialMovies={initialMovies} totalPages={totalPages}/>
    )
}

export default MyListPage;