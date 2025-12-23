import React from "react";
import { Movie } from "./MovieList";
import { getPosterUrl } from "../utilities/getPosterUrl";

interface MovieCardProps extends Movie {
    children? : React.ReactNode
}

const MovieCard = ({title, posterPath, rating, releaseDate, children}: MovieCardProps) => {
    return (
        <div className="flex flex-col border w-full items-center my-4 bg-white">
            <div className="flex m-2">
                <img src={getPosterUrl(posterPath)} alt="new"/>
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