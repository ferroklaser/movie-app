import React from "react";

interface MovieProps {
    title : string,
    posterUrl : string, 
    rating : number,
    releaseDate : string

}

const MovieCard = ({ title, posterUrl, rating, releaseDate } : MovieProps) => {
    return (
        <div className="flex flex-col border w-70 items-center m-10">
            <div className="flex m-2">
                <img src={posterUrl} width={250} height={250} alt="new"/>
            </div>
            <div className="flex flex-col w-full px-4">
                <div>Title: {title}</div>
                <div>Rating: {rating}</div>
                <div>Release Date: {releaseDate}</div>
            </div>
        </div>
    )
}

export default MovieCard