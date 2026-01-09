'use client'
import { white, grey } from "@/src/resources/colors";
import { useRouter, usePathname } from "next/navigation";
import { CSSProperties } from "react";

export interface NavBarItemProps {
    label: string,
    to: string,
    style?: CSSProperties;
    basePath?: string
}

const NavBarItem = ({ label, to, style, basePath } : NavBarItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const isSelected = basePath ? pathname.startsWith(basePath) : pathname === to;

    const handleClick = () => {
        router.push(`${to}`)
    }

    return (
        <div className="cursor-pointer text-xl px-6 py-5 font-semibold max-h-full"
            style={{ color: isSelected ? grey : white, backgroundColor: isSelected ? white : "transparent", ...style }}
            onClick={handleClick}>
            {label}
        </div>
    )
}

export default NavBarItem;