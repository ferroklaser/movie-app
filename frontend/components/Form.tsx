import MyButton from "./MyButton";
import TextInput from "./TextInput";

const Form = ({}) => {
    return (
        <div className="bg-gray-300 w-[350px] h-[300px] p-5 rounded-lg">
            <form className="flex flex-col items-center">
                <TextInput name="api_id" placeholder="api_id" />
                <TextInput name="title" placeholder="title" />
                <TextInput name="poster url" placeholder="url" />
                <TextInput name="rating" placeholder="rating" />
                <TextInput name="release_date" placeholder="release date" />
                <MyButton type="submit" label="Add" onClick={() => { }} />
            </form>
        </div>
    );
}

export default Form;