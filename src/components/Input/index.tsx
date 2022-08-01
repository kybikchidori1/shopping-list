import { InputHTMLAttributes } from "react";
import "./index.scss";

const Input = (props: InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
    return (
        <div>
            <input {...props} className="input" />
            {props.required && (
                <div className="input__title">*Это обязательное поле</div>
            )}
        </div>
    );
};

export default Input;
