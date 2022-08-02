import { InputHTMLAttributes } from "react";
import "./index.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = (props: InputProps): JSX.Element => {
    return (
        <div>
            <input {...props} className="input" />
            {props.required && (
                <div className="input__title">
                    {props.label ?? "*Это обязательное поле"}
                </div>
            )}
        </div>
    );
};

export default Input;
