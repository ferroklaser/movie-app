import React from "react";
import { ButtonProps } from "../model/components";

const MyButton = ({ label, style, className, ...props } : ButtonProps) => {
    return (
        <button className={`${className} rounded-full border-2 px-8 py-1 text-black m-2 w-[1rem] flex justify-center font-semibold text-xl cursor-pointer`} style={style} {...props}>{label}</button>
    )
}

export default MyButton;