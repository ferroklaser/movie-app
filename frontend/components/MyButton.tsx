import React, {MouseEventHandler} from "react";

type ButtonProps = {
    label: string;
    onClick : MouseEventHandler<HTMLButtonElement>
}


const MyButton = ({ label, onClick } : ButtonProps) => {
    return (
        <button className="bg-blue-500 rounded-full px-4 text-neutral-50 w-30 h-20" onClick={onClick}>{label}</button>
    )
}

export default MyButton;