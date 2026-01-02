'use client'
import MovieList, { Movie } from "@/src/components/MovieList";
import MovieCard from "@/src/components/MovieCard";
import MyButton from "@/src/components/MyButton";
import Pagination from "@/src/components/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DropDown from "@/src/components/DropDown";
import { white } from "@/src/resources/colors";
import { useEffect, useState } from "react";

const MyList = ({ initialMovies, totalPages } : { initialMovies : Movie[], totalPages : number }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedSort, setSelectedSort] = useState<string>(searchParams.get('sort') || 'created_at');

    console.log('hi');

    const handleDelete = async (id : number) => {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        if (response.ok) {
            router.refresh();
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', selectedSort);
        router.push(`${pathname}?${params.toString()}`);
    }, [selectedSort])

    const movieCards = initialMovies.map(movie =>
        <MovieCard key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
        >
            <MyButton label="View" onClick={() => { }} />
            <MyButton label="Remove" onClick={() => handleDelete(movie.id)} />
        </MovieCard>)

    const options = [{
            value: "release_date",
            title: "Release Date"
        }, {
            value: "rating",
            title: "Rating"
        }, {
            value: "created_at",
            title: "Date Added"
        }
        ];

    return (
        <>
            <div className="w-full flex justify-end h-[5vh] mt-3">
                <DropDown
                    value={selectedSort}
                    onChange={e => setSelectedSort(e.currentTarget.value)}
                    options={options}
                    style={{
                        backgroundColor: white,
                        fontSize: '1rem',
                        marginRight: '1rem',
                        borderRadius: '2rem',
                        padding: '0.5rem'
                    }}
                />
            </div>
            <MovieList>
                {movieCards}
            </MovieList>
            <div className="flex justify-end pr-5 pb-4">
                <div>
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </>
    )
}

export default MyList