import React from "react";
import { Movie } from "./MovieList";
import { getPosterUrl } from "../utilities/getPosterUrl";

interface MovieCardProps extends Movie {
    children? : React.ReactNode
}

const MovieCard = ({title, posterPath, rating, releaseDate, children}: MovieCardProps) => {
    return (
        <div className="flex flex-col border w-full h-fullitems-center my-4 bg-white">
            <div className="flex m-2 cursor-pointer">
                <img src={getPosterUrl(posterPath, '/w500')} alt="new"/>
            </div>
            <div className="flex flex-col">
                {/* <div className="flex flex-col w-full h-[10vh] lg:h-[12vh] px-4 text-sm xl:text-base 2xl:text-lg items-start">
                    <div>Title: {title}</div>
                    <div>Rating: {rating}</div>
                    <div>Release Date: {releaseDate}</div>
                </div> */}
                <div className="flex justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MovieCard