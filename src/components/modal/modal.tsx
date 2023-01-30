import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import MStyle from "./modal.module.css";

const modalsContainer = document.querySelector("#modals") as Element;

interface IModalProp {
  title?: string;
  number?: number;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: FC<IModalProp> = ({ title, onClose, children, number }) => {
  useEffect(() => {
    const onEscKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.key === "Escape" && onClose();
    };
    document.addEventListener("keydown", onEscKeydown);

    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={MStyle.modal}>
        <div className={MStyle.container}>
          {title && <h3 className="text text_type_main-large">{title}</h3>}
          {number && (
            <h3 className="text text_type_digits-default">#{number}</h3>
          )}
        </div>
        {children}
        <button className={MStyle.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};

export default Modal;
