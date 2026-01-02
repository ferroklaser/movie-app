import { Movie } from "@/src/components/MovieList"
import MyList from "./MyList";

const MyListPage = async ({ searchParams } : {
     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const { page, sort, order } = await searchParams;
    let initialMovies : Movie[] = [];
    let totalPages : number = 0;
    const currentPage = Number(page) || 1;
    const currentSort = sort || 'created_at';
    const currentOrder = order || 'ASC';

    try {
        const response = await fetch(`http://localhost:3000/movies?page=${currentPage}&sort=${currentSort}&order=${currentOrder}`, {
            method: "GET",
            headers: {
                "Content-Type": "application.json"
            },
        });
        const data = await response.json();
        const formattedData = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            rating: movie.rating,
            releaseDate: new Date(movie.release_date).toLocaleDateString('en-GB')
        }));
        initialMovies = formattedData;
        totalPages = data.total_pages
    } catch (err: any) {
        console.log(err.message);
    }

    return (
        <MyList initialMovies={initialMovies} totalPages={totalPages}/>
    )
}

export default MyListPage;