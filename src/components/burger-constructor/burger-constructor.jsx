import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { data } from "../../utils/data";
import currency from "../../images/icon.svg";
import BCStyle from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const onButtonClick = () => {
    setIsOpen(true);
  };

  const closeAllModals = () => {
    setIsOpen(false);
  };

  return (
    <section className={BCStyle.section + " mt-25"}>
      <div className="mb-4 ml-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data[0].name + " (верх)"}
          price={20}
          thumbnail={data[0].image}
        />
      </div>
      <ul className={BCStyle.list}>
        {props.data.map((data, index) => (
          <li className={BCStyle.item} key={index}>
            <DragIcon />
            <ConstructorElement
              text={data.name}
              price={data.price}
              thumbnail={data.image}
            />
          </li>
        ))}
      </ul>
      <div className="mt-4 ml-8">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data[0].name + " (низ)"}
          price={20}
          thumbnail={data[0].image}
        />
      </div>
      <div className={BCStyle.container + " mt-10"}>
        <p className="text text_type_digits-medium mr-2">610</p>
        <img alt="валюта" src={currency} className="mr-10" />
        <Button type="primary" size="large" htmlType="button" onClick={onButtonClick}>
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal
          onEscKeydown={(e) => {
            e.preventDefault();
            e.key === "Escape" && closeAllModals();
          }}
          onOverlayClick={closeAllModals}
        >
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.protoTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;
