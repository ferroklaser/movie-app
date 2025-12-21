'use client'
import { white } from "@/src/resources/colors";
import { useRouter } from "next/navigation";

export interface NavBarItemProps {
    label: string,
    to: string
}

const NavBarItem = ({ label, to } : NavBarItemProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`${to}`)
    }

    return (
        <div className="cursor-pointer text-xl p-6 font-normal"
            style={{ color: white }}
            onClick={handleClick}>
            {label}
        </div>
    )
}

export default NavBarItem;