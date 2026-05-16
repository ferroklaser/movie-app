import React from "react";
import { Movie } from "../model/movies";
import { getPosterUrl } from "../utilities/getPosterUrl";

interface MovieCardProps extends Movie {
    children? : React.ReactNode,
    posterOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const MovieCard = ({title, posterPath, rating, releaseDate, children, posterOnClick}: MovieCardProps) => {
    return (
        <div className="flex flex-col border w-full h-fullitems-center my-4 bg-white">
            <button className="flex m-2 cursor-pointer hover:brightness-40 relative group" onClick={posterOnClick} >
                <img src={getPosterUrl(posterPath, '/w500')} alt="new"/>
            </button>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MovieCard