'use client'

import { CSSProperties } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSearchParams, useRouter } from "next/navigation";

interface SearchProps {
    placeholder : string,
    style? : CSSProperties,
    className? : string
}

const Search = ({ placeholder, style, className } : SearchProps) => {
    const router = useRouter();

    const handleSearch = () => {
        router.push(`/search?`)
    }

    return (
        <div className={`flex bg-white w-full h-[5vh] items-center p-4 rounded-full ${className}`}>
            <label htmlFor="search" className="sr-only">Search</label>
            <input placeholder={placeholder} id="search" className="w-18/20 text-xl outline-0"/>
            <FaMagnifyingGlass className="ml-2 text-xl"/>
        </div>
    )
}

export default Search;