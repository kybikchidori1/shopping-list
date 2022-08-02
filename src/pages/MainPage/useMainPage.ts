import { useEffect, useState } from "react";
import { ModalItemProps } from "../../components/AddingItemModal";
import { NormalizedItem } from "../../components/ItemsList";
import { NotificationProps } from "../../components/Notification";
import { getData } from "../../library/api";
import { ListItem, Product } from "../../library/interfaces";

interface HookReturn {
    items: Product[];
    listItems: ListItem[];
    showAddingItemModal: boolean;
    notification: NotificationProps | null;
    itemAction(id: number): void;
    buyItemHandler(normalizedItem: NormalizedItem): void;
    deleteItemHandler(normalizedItem: NormalizedItem): void;
    openAddingItemModal(): void;
    closeAddingItemModal(): void;
    onConfirmAddingItemModal(item: ModalItemProps): void;
}

const useMainPage = (): HookReturn => {
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
                        normalizedItem.amount < 2
                            ? prevState.filter(
                                  (item) => item.id !== normalizedItem.id
                              )
                            : prevState.map((item) => {
                                  if (item.id === normalizedItem.id) {
                                      return {
                                          ...item,
                                          amount: item.amount - 1,
                                      };
                                  }

                                  return item;
                              })
                    );
                },
            });
        }
    };

    const onConfirmAddingItemModal = (item: ModalItemProps) => {
        setItemIdCounter((prevState) => prevState + 1);

        setItems((prevState) => [...prevState, { ...item, id: itemIdCounter }]);
        setShowAddingItemModal(false);
    };

    const openAddingItemModal = () => setShowAddingItemModal(true);

    const closeAddingItemModal = () => setShowAddingItemModal(false);

    return {
        items,
        listItems,
        showAddingItemModal,
        notification,
        itemAction,
        buyItemHandler,
        deleteItemHandler,
        openAddingItemModal,
        closeAddingItemModal,
        onConfirmAddingItemModal,
    };
};

export default useMainPage;
