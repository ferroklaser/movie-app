'use client'

import { MovieButtonProps } from "@/src/model/components"
import MyButton from "../MyButton"
import { Movie } from "@/src/model/movies"
import { clientFetch } from "@/src/utilities/api/client-api"
import { useRouter } from "next/navigation"

const DeleteMovieButton = ({ movie, ...props } : MovieButtonProps) => {

    const router = useRouter()
    
    const handleDeleteMovie = async (movie : Movie) => {
        const id = movie.id

        try {
            const { response } = await clientFetch(`/movies/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                router.refresh()
                alert("Removed movie successfully")
            }
            
        } catch (err : any) {
            alert(err.message)
        }
    }
    
    return (
        <MyButton label="Remove" onClick={() => handleDeleteMovie(movie)} {...props}/>
    )
}

export default DeleteMovieButton