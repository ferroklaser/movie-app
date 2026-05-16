import MyButton from "../MyButton"
import { Movie } from  "@/src/model/movies"
import { clientFetch } from "@/src/utilities/api/client-api"
import { formatDateToIso } from "@/src/utilities/formatDateToIso"
import { MovieButtonProps } from "@/src/model/components"

const AddMovieButton = ({ movie, ...props } : MovieButtonProps) => {

    const handleAddMovie = async (movie : Movie) => {
        const formattedMovie = {
            ...movie, 
            releaseDate: formatDateToIso(movie.releaseDate)
        }

        try {
            await clientFetch('/movies', {
                method: "POST",
                body: JSON.stringify(formattedMovie)
            })
        
            alert("Added movie successfully")
        } catch (err : any) {
            alert(err.message)
        }
    }

    return (
        <MyButton label="Add" onClick={() => handleAddMovie(movie)} {...props}/>
    )
}

export default AddMovieButton