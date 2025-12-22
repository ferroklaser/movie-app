import React from "react";
import MovieCard from "./MovieCard";

export interface Movie {
    id: number,
    title : string,
    posterUrl : string, 
    rating : number,
    releaseDate : string
}

export interface MovieListProps {
    children? : React.ReactNode
}

const MovieList = ({children } : MovieListProps) => {
    return (
        <div className="grid grid-cols-5 gap-5 m-5">
            {children}
        </div>
    )
}

export default MovieList;