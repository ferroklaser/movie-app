interface TextInputProps extends React.PropsWithChildren {
    className? : string,
    name : string,
    placeholder?: string,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    type?: string
}

const TextInput = ({ name, placeholder, className, value, onChange, type, ...props }: TextInputProps) => {
    return (
        <input
            name={name} 
            placeholder={placeholder} 
            className={`bg-white w-80 m-1 p-1 ${className}`} 
            value={value}
            onChange={onChange}
            type={type}
            {...props} />
    )
}

export default TextInput;