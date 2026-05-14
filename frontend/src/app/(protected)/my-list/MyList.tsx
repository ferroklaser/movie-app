'use client'
import MovieList, { Movie } from "@/src/components/MovieList";
import MovieCard from "@/src/components/MovieCard";
import MyButton from "@/src/components/MyButton";
import Pagination from "@/src/components/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DropDown from "@/src/components/DropDown";
import { white } from "@/src/resources/colors";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const MyList = ({ initialMovies, totalPages } : { initialMovies : Movie[], totalPages : number }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const selectedSort = searchParams.get('sort') || 'created_at';
    const selectedOrder = searchParams.get('order') || 'ASC';

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

    const handleSortOrder = () => {
        const params = new URLSearchParams(searchParams);
        const newOrder = selectedOrder === 'DESC' ? 'ASC' : 'DESC'
        params.set('order', newOrder);
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleSortField = (selectedSort : string) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', selectedSort);
        router.push(`${pathname}?${params.toString()}`);
    }

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
                <div className="flex mr-3 gap-2" style={{ backgroundColor: white, borderRadius: '2rem', padding: '0.5rem'}}>
                    <DropDown
                        value={selectedSort}
                        onChange={e => handleSortField(e.currentTarget.value)}
                        options={options}
                        style={{
                            fontSize: '1rem',
                        }}
                    />
                    <button className="text-4xl flex items-center" onClick={handleSortOrder}>
                        {selectedOrder == 'ASC' ? <IoMdArrowDropup/> :  <IoMdArrowDropdown/>}
                    </button>
                </div>
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