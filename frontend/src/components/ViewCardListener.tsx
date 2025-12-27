'use client'
import ViewCard from "./ViewCard";
import { useSearchParams } from "next/navigation";

const ViewCardListener = () => {
    const searchParams = useSearchParams();
    
    const tmdb_id = searchParams.get('view');

    if (!tmdb_id) {
        return null;
    }

    return (
        <ViewCard id={tmdb_id}/>
    );
};

export default ViewCardListener;