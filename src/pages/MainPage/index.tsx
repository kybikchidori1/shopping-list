import AddingItemModal from "../../components/AddingItemModal";
import Button from "../../components/Button";
import Item from "../../components/Item";
import ItemsList from "../../components/ItemsList";
import Notification from "../../components/Notification";
import { COLOR_TYPES } from "../../library/constants.enum";
import "./index.scss";
import useMainPage from "./useMainPage";

const MainPage = () => {
    const {
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
    } = useMainPage();

    return (
        <>
            <h1 className="main-page__title">
                Лучшее в мире приложение для списка покупок
            </h1>
            <div className="main-page__content">
                <div className="main-page__left-content">
                    <div className="main-page__content-title flex-center">
                        Ваши список
                    </div>
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
                    <div className="main-page__content-title flex-center">
                        Список товаров
                        <Button
                            text="Добавить"
                            className="main-page__add-goods-button"
                            type={COLOR_TYPES.info}
                            onClick={openAddingItemModal}
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
                    onClose={closeAddingItemModal}
                    onConfirm={onConfirmAddingItemModal}
                />
            )}

            {notification && <Notification {...notification} />}
        </>
    );
};

export default MainPage;
