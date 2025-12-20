const TextInput = ({name, placeholder} : { name : string, placeholder : string}) => {
    return (
        <input name={name} placeholder={placeholder} className="bg-white w-80 m-1 p-1"/>
    )
}

export default TextInput;