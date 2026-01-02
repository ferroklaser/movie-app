import { CSSProperties } from "react";

interface Option {
    title: string,
    value: string
}

interface DropDownProps {
    options: Option[],
    style?: CSSProperties;
    value: string,
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}

const DropDown = ({ options, style, value, onChange } : DropDownProps) => {

    return (
        <div className="flex justify-center items-center" style={style}>
            <label>
                Sort By:
                <select value={value} onChange={onChange}>
                    {
                        options.map(
                            option => <option value={option.value} key={option.value}>{option.title}</option>)
                    }
                </select>
            </label>
        </div>
    );
}

export default DropDown;