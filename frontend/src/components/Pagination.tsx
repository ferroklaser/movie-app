import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { white } from "../resources/colors";

const Pagination = ({ totalPages } : { totalPages : number }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handleNext = () => {
        const nextPage = currentPage + 1;
        if (nextPage > totalPages) {
            alert(`Page ${nextPage} does not exists`);
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', nextPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    const handlePrev = () => {
        const prevPage = currentPage - 1;
        if (prevPage <= 0) {
            alert(`Page ${prevPage} does not exists`);
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', prevPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex gap-2 text-2xl items-center">
            <FaArrowCircleLeft onClick={handlePrev} style={{ color: white }}/>
            <span className="text-white text-lg">Page {currentPage} of {totalPages}</span>
            <FaArrowCircleRight onClick={handleNext} style={{ color: white}}/>
        </div>
    )
};

export default Pagination;