import { COLOR_TYPES } from "../../library/constants.enum";
import Button from "../Button";
import Modal from "../Modal";
import "./index.scss";

export interface NotificationProps {
    title: string;
    message: string;
    approveText: string;
    cancel(): void;
    approve(): void;
}

const Notification = ({
    title,
    message,
    approveText = "Потвердить",
    cancel,
    approve,
}: NotificationProps) => {
    return (
        <Modal.Wrapper>
            <Modal.Header title={title} />
            <Modal.Body className="notification__message">{message}</Modal.Body>
            <Modal.Footer>
                <Button
                    text="Отменить"
                    className="modal-button"
                    onClick={cancel}
                />
                <Button
                    text={approveText}
                    className="modal-button"
                    type={COLOR_TYPES.info}
                    onClick={approve}
                />
            </Modal.Footer>
        </Modal.Wrapper>
    );
};

export default Notification;
