import { Movie } from "@/src/components/MovieList"
import MyList from "./MyList";

const MyListPage = async () => {
    let initialMovies: Movie[] = [];
    try {
        const response = await fetch("http://localhost:3000/movies", {
            method: "GET",
            headers: {
                "Content-Type": "application.json"
            },
        });
        const data = await response.json();
        const formattedData = data.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            rating: movie.rating,
            releaseDate: new Date(movie.release_date).toLocaleDateString('en-GB')
        }));
        initialMovies = formattedData;
    } catch (err: any) {
        console.log(err.message);
    }

    return (
        <MyList initialMovies={initialMovies}/>
    )
}

export default MyListPage;