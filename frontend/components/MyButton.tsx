import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

const MyButton = ({ label, style, ...props } : ButtonProps) => {
    return (
        <button className="rounded-full border-2 px-8 py-1 text-black m-2 min-w-30" style={style} {...props}>{label}</button>
    )
}

export default MyButton;