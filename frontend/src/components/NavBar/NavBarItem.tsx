import { white } from "@/src/resources/colors";
import { useState } from "react";

const NavBarItem = ({ label }: { label: string }) => {

    return (
        <div className="cursor-pointer text-xl p-6 font-normal"
            style={{ color: white }}>
            {label}
        </div>
    )
}

export default NavBarItem;