import { useContext } from "react"
import { useSearchContext } from "../context/project-context";

export default function SearchBox() {
    const Search = useSearchContext();

    function handleSearch( e ) {
        Search.searchDispatch({
            type: 'search',
            payload: e.target.value,
        })
    }
    return(
        <>
            <input
                type="text"
                placeholder="Search here"
                value={Search.searchKey}
                onChange={handleSearch}
                className="w-full max-w-xl rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none"
            />
        </>
    )
}