import { FormEvent } from "react";
import MyButton from "./MyButton";
import TextInput from "./TextInput";

const Form = ({}) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form as HTMLFormElement);
        const dataObject = Object.fromEntries(formData);

        const response = await fetch("http://localhost:3000/movies", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dataObject)
        });
        console.log(await response.json());
    }

    return (
        <div className="bg-gray-300 w-[350px] h-[300px] p-5 rounded-lg">
            <form className="flex flex-col items-center" onSubmit={e => {handleSubmit(e);}}>
                <TextInput name="api_id" placeholder="api_id" />
                <TextInput name="title" placeholder="title" />
                <TextInput name="poster url" placeholder="url" />
                <TextInput name="rating" placeholder="rating" />
                <TextInput name="release_date" placeholder="release date" />
                <MyButton type="submit" label="Add" />
            </form>
        </div>
    );
}

export default Form;