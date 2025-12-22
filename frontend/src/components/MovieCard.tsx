import React from "react";
import { Movie } from "./MovieList";

interface MovieCardProps extends Movie {
    children? : React.ReactNode
}

const MovieCard = ({ id, title, posterUrl, rating, releaseDate, children}: MovieCardProps) => {
    return (
        <div className="flex flex-col border w-full items-center my-4">
            <div className="flex m-2">
                <img src={posterUrl} alt="new"/>
            </div>
            <div className="flex flex-col w-full px-4">
                <div>Title: {title}</div>
                <div>Rating: {rating}</div>
                <div>Release Date: {releaseDate}</div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default MovieCard