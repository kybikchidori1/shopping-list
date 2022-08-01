import { COLOR_TYPES, ICON_NAMES } from "../../library/constants.enum";
import Close from "./icons/Close";
import Plus from "./icons/Plus";
import "./index.scss";

interface ButtonProps {
    className?: string;
    text?: string;
    type?: COLOR_TYPES;
    onlyIcon?: boolean;
    iconName?: ICON_NAMES;
    disabled?: boolean;
    onClick(): void;
}

const getIcon = (iconName: ICON_NAMES): JSX.Element => {
    switch (iconName) {
        case ICON_NAMES.close:
            return <Close />;

        case ICON_NAMES.plus:
            return <Plus />;

        default:
            return <></>;
    }
};

const getColor = (type: COLOR_TYPES | undefined): string => {
    switch (type) {
        case COLOR_TYPES.info:
            return "info";

        case COLOR_TYPES.danger:
            return "danger";

        default:
            return "default";
    }
};

const Button = ({
    text = "No text",
    type,
    onlyIcon,
    iconName = ICON_NAMES.close,
    className,
    disabled,
    onClick,
}: ButtonProps): JSX.Element => {
    return onlyIcon ? (
        <button
            className={`button only-icon ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {getIcon(iconName)}
        </button>
    ) : (
        <button
            className={`button text ${className} ${getColor(type)}`}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
