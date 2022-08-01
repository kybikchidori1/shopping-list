import { InputHTMLAttributes } from "react";
import "./index.scss";

const Input = (
    props: InputHTMLAttributes<HTMLTextAreaElement>
): JSX.Element => {
    return <textarea {...props} className="textarea" />;
};

export default Input;
