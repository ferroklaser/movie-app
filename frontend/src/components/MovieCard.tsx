import React from "react";
import MyButton from "./MyButton";
import { Movie } from "./MovieList";

interface MovieCardProps extends Movie {
    onDelete: () => void
}

const MovieCard = ({ id, title, posterUrl, rating, releaseDate, onDelete } : MovieCardProps) => {
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
                <MyButton label="Like" />
                <MyButton label="Delete" onClick={onDelete}/>
            </div>
        </div>
    )
}

export default MovieCard