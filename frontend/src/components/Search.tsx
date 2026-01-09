import { FaMagnifyingGlass } from "react-icons/fa6";


const Search = ({ placeholder }: { placeholder: string }) => {
    return (
        <div className="flex bg-white lg:w-md w-2xs h-[5vh] items-center p-4 rounded-full">
            <label htmlFor="search" className="sr-only">Search</label>
            <input placeholder={placeholder} id="search" className="w-18/20 text-xl outline-0"/>
            <FaMagnifyingGlass className="ml-2 text-xl"/>
        </div>
    )
}

export default Search;