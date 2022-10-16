import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import MStyle from "./modal.module.css";

const modalsContainer = document.querySelector("#modals");

function Modal({ title, onClose, children }) {
  React.useEffect(() => {
    const onEscKeydown=(e) => {
      e.preventDefault();
      e.key === "Escape" && onClose();
    }
    document.addEventListener("keydown", onEscKeydown);

    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={MStyle.modal}>
        <div className={MStyle.container + " mt-10 ml-10"}>
          {title && <h3 className="text text_type_main-large">{title}</h3>}
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
}

Modal.protoTypes = {
  title: PropTypes.string,
  onOverlayClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
