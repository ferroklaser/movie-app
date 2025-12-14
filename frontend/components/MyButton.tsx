import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

const MyButton = ({ label, ...props} : ButtonProps) => {
    return (
        <button className="bg-blue-500 rounded-full px-4 py-2 text-neutral-50 m-4" {...props}>{label}</button>
    )
}

export default MyButton;