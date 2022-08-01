import { useState } from "react";
import { COLOR_TYPES, ICON_NAMES } from "../../library/constants.enum";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import Textarea from "../Textarea";
import "./index.scss";

export interface ModalItemProps {
    name: string;
    price: string;
    image: string;
    description: string;
}

interface AddingItemModalProps {
    onClose(): void;
    onConfirm(item: ModalItemProps): void;
}

const initialItem: ModalItemProps = {
    name: "",
    price: "",
    image: "",
    description: "",
};

const AddingItemModal = ({
    onClose,
    onConfirm,
}: AddingItemModalProps): JSX.Element => {
    const [modalData, setModalData] = useState<ModalItemProps>(initialItem);

    const modalHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const name = event.target.name;
        let value = event.target.value;

        // Remove first 0 if exist
        if (name === "price" && value[0] === "0") value = value.slice(1);

        setModalData((prevState) => ({ ...prevState, [name]: value }));
    };

    const shouldShowAddButton = (): boolean => {
        if (modalData.image && modalData.name && +modalData.price > 0) {
            return false;
        }

        return true;
    };

    return (
        <Modal.Wrapper>
            <Modal.Header
                title="Добавление товара"
                actions={
                    <Button
                        onlyIcon
                        className="close-button"
                        iconName={ICON_NAMES.close}
                        onClick={onClose}
                    />
                }
            />
            <Modal.Body className="addingItemModal">
                <div className="addingItemModal__inputs-box">
                    <div className="addingItemModal__left-content">
                        <div className="addingItemModal__preview">
                            <div className="addingItemModal__label">Имя:</div>
                            <Input
                                key="name"
                                name="name"
                                placeholder="Введите имя продукта"
                                value={modalData.name}
                                onChange={modalHandler}
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="addingItemModal__preview">
                            <div className="addingItemModal__label">
                                Изображение:
                            </div>
                            <Input
                                key="urlSrc"
                                name="image"
                                placeholder="Добавьте ссылку на фотографию"
                                value={modalData.image}
                                onChange={modalHandler}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="addingItemModal__preview">
                            <div className="addingItemModal__label">
                                Стоимость:
                            </div>
                            <Input
                                key="price"
                                name="price"
                                placeholder="Введите стоимость в рублях"
                                value={modalData.price || ""}
                                onChange={modalHandler}
                                required
                                type="number"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="addingItemModal__right-content">
                        <div className="addingItemModal__img flex-center">
                            {modalData.image ? (
                                <img src={modalData.image} alt="" />
                            ) : (
                                <span>
                                    После добавления ссылки, здесь должно
                                    появиться изображение.
                                    <br />
                                    Если изображения нет, значит ссылка не
                                    корректная.
                                    <br />
                                    Пример: https://server/example.jpg
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="addingItemModal__preview">
                    <div className="addingItemModal__label">Описание:</div>
                    <Textarea
                        key="description"
                        name="description"
                        placeholder="Введите описание"
                        value={modalData?.description}
                        onChange={modalHandler}
                        autoComplete="off"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    text="Отменить"
                    className="modal-button"
                    onClick={onClose}
                />
                <Button
                    text="Добавить"
                    className="modal-button"
                    type={COLOR_TYPES.info}
                    onClick={() => onConfirm(modalData)}
                    disabled={shouldShowAddButton()}
                />
            </Modal.Footer>
        </Modal.Wrapper>
    );
};

export default AddingItemModal;
