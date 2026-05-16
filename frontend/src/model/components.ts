import { Movie } from "./movies";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export interface MovieButtonProps extends ButtonProps {
    movie: Movie
}