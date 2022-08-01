import { useEffect, useState } from "react";
import AddingItemModal from "../../components/AddingItemModal";
import Button from "../../components/Button";
import Item from "../../components/Item";
import ItemsList, { NormalizedItem } from "../../components/ItemsList";
import Notification, { NotificationProps } from "../../components/Notification";
import { getData } from "../../library/api";
import { COLOR_TYPES } from "../../library/constants.enum";
import { ListItem, Product } from "../../library/interfaces";

import "./index.scss";

const MainPage = () => {
    const [itemIdCounter, setItemIdCounter] = useState<number>(4);
    const [listIdCounter, setListIdCounter] = useState<number>(4);

    const [items, setItems] = useState<Product[]>([]);
    const [listItems, setListItems] = useState<ListItem[]>([]);

    const [showAddingItemModal, setShowAddingItemModal] =
        useState<boolean>(false);
    const [notification, setNotification] = useState<NotificationProps | null>(
        null
    );

    useEffect(() => {
        getData().then((response) => {
            setItems(response.goods);
            setListItems(response.list);
        });
    }, []);

    const itemAction = (id: number) => {
        setListItems((prevState) => {
            if (prevState.some((listItem) => listItem.itemId === id)) {
                return prevState.map((item) => {
                    if (item.itemId === id) {
                        return {
                            id: item.id,
                            itemId: item.itemId,
                            amount: item.amount + 1,
                        };
                    }
                    return item;
                });
            } else {
                setListIdCounter((prevState) => prevState + 1);
                return [
                    ...prevState,
                    { id: listIdCounter, itemId: id, amount: 1 },
                ];
            }
        });
    };

    const buyItemHandler = (normalizedItem: NormalizedItem) => {
        const price = normalizedItem.item?.price;
        const amount = normalizedItem.amount;
        const name = normalizedItem.item?.name;

        if (price && amount && name) {
            setNotification({
                title: "Покупка товара",
                message: `Вы действительно хотите купить ${name}? Вы потратите ${
                    amount * +price
                } рублей.`,
                approveText: "Купить",
                cancel: () => {
                    setNotification(null);
                },
                approve: () => {
                    setNotification(null);
                    setListItems((prevState) =>
                        prevState.filter(
                            (item) => item.id !== normalizedItem.id
                        )
                    );
                },
            });
        }
    };

    const deleteItemHandler = (normalizedItem: NormalizedItem) => {
        const price = normalizedItem.item?.price;
        const amount = normalizedItem.amount;
        const name = normalizedItem.item?.name;

        if (price && amount && name) {
            setNotification({
                title: "Удаление товара",
                message: `Вы действительно хотите удалить ${name} из списка?`,
                approveText: "Удалить",
                cancel: () => {
                    setNotification(null);
                },
                approve: () => {
                    setNotification(null);
                    setListItems((prevState) =>
                        prevState.filter(
                            (item) => item.id !== normalizedItem.id
                        )
                    );
                },
            });
        }
    };

    return (
        <>
            <h1 className="main-page__title">
                Лучшее в мире приложение для списка покупок
            </h1>
            <div className="main-page__content">
                <div className="main-page__left-content">
                    <div className="main-page__content-title">Ваши список</div>
                    {listItems.length ? (
                        <ItemsList
                            list={listItems}
                            goods={items}
                            onBuy={buyItemHandler}
                            onDelete={deleteItemHandler}
                        />
                    ) : (
                        "Добавьте продукт"
                    )}
                </div>
                <div className="main-page__right-content">
                    <div className="main-page__content-title">
                        Список товаров
                        <Button
                            text="Добавить"
                            className="main-page__add-goods-button"
                            type={COLOR_TYPES.info}
                            onClick={() => setShowAddingItemModal(true)}
                        />
                    </div>
                    <div className="main-page__goods-container">
                        {items.length &&
                            items.map(
                                ({ id, name, price, image, description }) => (
                                    <Item
                                        key={id}
                                        name={name}
                                        price={price}
                                        image={image}
                                        description={description}
                                        plusAction={() => itemAction(id)}
                                    />
                                )
                            )}
                    </div>
                </div>
            </div>

            {showAddingItemModal && (
                <AddingItemModal
                    onClose={() => setShowAddingItemModal(false)}
                    onConfirm={(item) => {
                        setItemIdCounter((prevState) => prevState + 1);

                        setItems((prevState) => [
                            ...prevState,
                            { ...item, id: itemIdCounter },
                        ]);
                        setShowAddingItemModal(false);
                    }}
                />
            )}

            {notification && <Notification {...notification} />}
        </>
    );
};

export default MainPage;
