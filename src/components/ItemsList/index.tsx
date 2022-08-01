import { COLOR_TYPES } from "../../library/constants.enum";
import { ListItem, Product } from "../../library/interfaces";
import Button from "../Button";
import "./index.scss";

export interface NormalizedItem {
    id: number;
    amount: number;
    item: Product | undefined;
}

interface ItemListProps {
    list: ListItem[];
    goods: Product[];
    onBuy(normalizedItem: NormalizedItem): void;
    onDelete(normalizedItem: NormalizedItem): void;
}

const getItems = (list: ListItem[], goods: Product[]): NormalizedItem[] => {
    const normalizedItems: NormalizedItem[] = list.reduce(
        (acc: NormalizedItem[], item: ListItem) => {
            acc.push({
                id: item.id,
                amount: item.amount,
                item: goods.find((good: Product) => good.id === item.itemId),
            });
            return acc;
        },
        []
    );

    return normalizedItems;
};

const ItemsList = ({
    list,
    goods,
    onBuy,
    onDelete,
}: ItemListProps): JSX.Element => (
    <div className="items-list">
        {getItems(list, goods).map((normalizedItem: NormalizedItem) => (
            <div key={normalizedItem.id} className="items-list__item">
                <div>{normalizedItem.item?.name}</div>
                <div className="items-list__amount-box flex-center">
                    <div>
                        {normalizedItem.item?.price}руб x{" "}
                        {normalizedItem.amount}
                    </div>
                    <Button
                        text="Купить"
                        type={COLOR_TYPES.info}
                        onClick={() => onBuy(normalizedItem)}
                    />
                    <Button
                        text="Удалить"
                        type={COLOR_TYPES.danger}
                        onClick={() => onDelete(normalizedItem)}
                    />
                </div>
            </div>
        ))}
    </div>
);

export default ItemsList;
