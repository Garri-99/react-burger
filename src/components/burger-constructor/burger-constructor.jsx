import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useContext, useReducer } from "react";
import currency from "../../images/icon.svg";
import BCStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IngredientsContext } from "../../context/ingredients-context";
import { baseUrl } from "../../utils/constants";
import { request } from "../../utils/request";

const intialState = {
  bun: null,
  ingredients: null,
  cost() {
    return this.bun
      ? 2 * this.bun.price +
          (this.ingredients
            ? this.ingredients.reduce((acc, item) => acc + item.price, 0)
            : 0)
      : 0;
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        /*добавить ингр*/
      };
    case "delete":
      return {
        /*удалить ингр*/
      };
    case "reset":
      return intialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const ingredients = useContext(IngredientsContext);
  const [state, dispatch] = useReducer(reducer, {
    bun: ingredients.buns[0],
    ingredients: [...ingredients.sauces, ...ingredients.main],
    cost() {
      return this.bun
        ? 2 * this.bun.price +
            (this.ingredients
              ? this.ingredients.reduce((acc, item) => acc + item.price, 0)
              : 0)
        : 0;
    },
  });

  const onButtonClick = () => {
    setIsLoading(true)
    request(`${baseUrl}/api/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ingredients: [
          state.bun._id,
          ...state.ingredients.map((item) => item._id),
        ],
      }),
    })
      .then((res) => {
        setOrderNumber(res.order.number);
        setIsOpen(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  };

  const closeAllModals = () => {
    setIsOpen(false);
    setOrderNumber(null);
  };

  return (
    <section className={BCStyle.section + " mt-25"}>
      <div className="mb-4 ml-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={state.bun.name + " (верх)"}
          price={state.bun.price}
          thumbnail={state.bun.image}
        />
      </div>
      <ul className={BCStyle.list}>
        {state.ingredients.map((data, index) => (
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
          text={state.bun.name + " (низ)"}
          price={state.bun.price}
          thumbnail={state.bun.image}
        />
      </div>
      <div className={BCStyle.container + " mt-10"}>
        <p className="text text_type_digits-medium mr-2">{state.cost()}</p>
        <img alt="валюта" src={currency} className="mr-10" />
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={onButtonClick}
        >
          {isLoading? 'Оформляем...': 'Оформить заказ'}
        </Button>
      </div>
      {isOpen && (
        <Modal onClose={closeAllModals}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
