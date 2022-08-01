import { ICON_NAMES } from "../../library/constants.enum";
import Button from "../Button";
import "./index.scss";

interface ItemProps {
    name: string;
    image: string;
    price: string;
    description?: string;
    plusAction(): void;
}

const Item = ({
    name,
    image,
    price,
    description,
    plusAction,
}: ItemProps): JSX.Element => {
    return (
        <div className="item">
            <div className="item__image-box flex-center">
                <img className="item__image" src={image} alt="" />
            </div>
            <div className="item__name-box">
                <div className="item__name" title={name}>
                    {name}
                </div>
                <div className="item__price">Цена: {price}руб.</div>
            </div>

            <div className="item__description">{description}</div>
            <Button
                className="item__button plus-icon"
                onlyIcon
                iconName={ICON_NAMES.plus}
                onClick={plusAction}
            />
        </div>
    );
};

export default Item;
