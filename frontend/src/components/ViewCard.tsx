'use client'
import { useState, useEffect } from "react";
import { getPosterUrl } from "../utilities/getPosterUrl";
import { IoIosCloseCircle } from "react-icons/io";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

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
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

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

    const handleViewCardClose = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('view');
        router.push(`${pathname}?${params.toString()}`, {scroll : false});
    }

    return (
        <div className="bg-gray-300 min-w-[40vw] max-w-xs lg:w-[60vw] lg:max-w-3xl max-h-[65vh] p-1 rounded-lg fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col lg:flex-row w-full relative">
                <div className="flex h-full max-w-[37vw] xl:max-w-none xl:w-full">
                    <img src={getPosterUrl(movieData.posterPath, '/w500')} alt="new"/>
                </div>
                <div className=" w-[40vw] text-xs md:text-md lg:text-lg  xl:w-full xl:h-full overflow-hidden">
                    <IoIosCloseCircle onClick={handleViewCardClose} className="cursor-pointer absolute top-0.5 right-0.5 text-4xl"/>
                    <div className="p-5 overflow-hidden">
                        <div className="overflow-y-auto h-[30vh] lg:h-[50vh]">
                            <div>Title: {movieData.title}</div>
                            <div>Rating: {movieData.rating}</div>
                            <div>Release Date: {movieData.releaseDate}</div>
                            <div>Runtime: {movieData.runtime}</div>
                            <div>Overview: {movieData.overview}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCard