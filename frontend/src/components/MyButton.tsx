import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

const MyButton = ({ label, style, ...props } : ButtonProps) => {
    return (
        <button className="rounded-full border-2 px-8 py-1 text-black m-2 w-[1rem] flex justify-center font-semibold text-xl cursor-pointer" style={style} {...props}>{label}</button>
    )
}

export default MyButton;