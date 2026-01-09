import React from "react";
import { Movie } from "./MovieList";
import { getPosterUrl } from "../utilities/getPosterUrl";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface MovieCardProps extends Movie {
    children? : React.ReactNode,
    posterOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const MovieCard = ({title, posterPath, rating, releaseDate, children, posterOnClick}: MovieCardProps) => {
    return (
        <div className="flex flex-col border w-full h-fullitems-center my-4 bg-white">
            <button className="flex m-2 cursor-pointer hover:brightness-40 relative group" onClick={posterOnClick} >
                <img src={getPosterUrl(posterPath, '/w500')} alt="new"/>
                <MdOutlineRemoveRedEye className="absolute text-6xl text-slate-200 opacity-0 group-hover:opacity-100" style={{
                    top: '50%',
                    left: '50%', transform: 'translate(-50%, -50%)'
                }} />
            </button>
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