'use client'
import { useState, useEffect } from "react";
import { getPosterUrl } from "../utilities/getPosterUrl";

interface MovieData {
    id: number,
    title: string,
    posterPath: string,
    releaseDate: string,
    runtime: number,
    rating: number,
    overview: string
}

const ViewCard = ({ id } : { id : string  | null}) => {
    const [movieData, setMovieData] = useState<MovieData | null>(null);

    const getMovieDetails = async (id : string | null) => {
        if (id == null) {
            return
        }

        const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.status == 500) {
            alert(data.error)
        }
        const { 
            id : tmdb_id,
            original_title : title, 
            poster_path : posterPath, 
            release_date : releaseDate, 
            voting_average : rating, 
            runtime, 
            overview } = data;
        setMovieData({id : tmdb_id, title,  posterPath, releaseDate, rating, runtime, overview });
    }

    useEffect(() => {
        const fetchData = () => {
            getMovieDetails(id);
        }
        fetchData();
        
        return () => {}
    }, [])

    if (!movieData) {
        return <div className="bg-red-500"></div>
    }

    return (
        <div className="bg-gray-300 w-[60vw] min-w-xs max-w-3xl h-auto p-2 rounded-lg fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center w-full">
                <div className="flex w-full">
                    <img src={getPosterUrl(movieData.posterPath, '/w500')} alt="new"/>
                </div>
                <div className="text-xl w-full p-5">
                    <div>Title: {movieData.title}</div>
                    <div>Rating: {movieData.rating}</div>
                    <div>Release Date: {movieData.releaseDate}</div>
                    <div>Runtime: {movieData.runtime}</div>
                    <div>Overview: {movieData.overview}</div>
                </div>
            </div>
            <div className="flex items-center w-full md:hidden">
                <div className="flex w-full">
                    <img src={getPosterUrl(movieData.posterPath, '/w500')} alt="new"/>
                </div>
                <div className="text-xl w-full p-5">
                    <div>Title: {movieData.title}</div>
                    <div>Rating: {movieData.rating}</div>
                    <div>Release Date: {movieData.releaseDate}</div>
                    <div>Runtime: {movieData.runtime}</div>
                    <div>Overview: {movieData.overview}</div>
                </div>
            </div>
        </div>
    )
}

export default ViewCard