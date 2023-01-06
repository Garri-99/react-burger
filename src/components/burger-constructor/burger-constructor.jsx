import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorList from "../constructor-list/constructor-list";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import currency from "../../images/icon.svg";
import BCStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNubmer } from "../../services/slices/order-slice";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  deleteIngredient,
  setBun,
  moveIngredient,
  resetConstuctor
} from "../../services/slices/constructor-ingredients-slice";
import {
  decreaseVolume,
  increaseVolume,
  resetCount,
} from "../../services/slices/ingredients-slice";
import { v4 as uuidv4 } from "uuid";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false);
  const { bun, constructorIngredients, cost } = useSelector(
    (state) => state.constructorIngredients
  );
  const { isLoading } = useSelector((state) => state.order);
  const { isAuthCheck } = useSelector((state) => state.user)

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (bun && item._id === bun._id) return;
      if (item.type === "bun") {
        dispatch(setBun(item));
        bun && dispatch(decreaseVolume(bun));
      } else dispatch(addIngredient({ ...item, constructorId: uuidv4() }));
      dispatch(increaseVolume(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const border = isHover ? "1px solid #4C4CFF" : "1px solid transparent";

  const onButtonClick = () => {
    if (!isAuthCheck) {
      return history.push('/login')
    }
    dispatch(getOrderNubmer({ bun, constructorIngredients }, setIsOpen));
  };

  const closeModal = () => {
    setIsOpen(false);
    dispatch(resetCount())
    dispatch(resetConstuctor())
  };

  const handleClose = (data) => {
    dispatch(decreaseVolume(data));
    dispatch(deleteIngredient(data));
  };

  const moveCard = (dragIndex, hoverIndex, item) => {
    dispatch(moveIngredient({dragIndex, hoverIndex, item}))
  }

  return (
    <section
      className={BCStyle.section + " mt-25"}
      style={{ border }}
      ref={dropTarget}
    >
      {!bun && !constructorIngredients.length ? (
        <h2 className={BCStyle.instruction + " text text_type_main-medium"}>
          Перетащите сюда нужные вам ингредиенты
        </h2>
      ) : (
        <>
          {bun ? (
            <div className="mb-4 ml-8">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bun.name + " (верх)"}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          ) : (
            <h2
              className={
                BCStyle.instruction + " text text_type_main-medium mb-4"
              }
            >
              Выберите булку
            </h2>
          )}
          {!constructorIngredients.length ? (
            <p className={BCStyle.instruction + " text text_type_main-default"}>
              Добавьте соусы и начинки
            </p>
          ) : (
            <ul className={BCStyle.list}>
              {constructorIngredients.map((data, i) => (
                <ConstructorList data={data} handleClose={handleClose} index={i} moveCard={moveCard} key={data.constructorId}/>
              ))}
            </ul>
          )}
          {bun && (
            <div className="mt-4 ml-8">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name + " (низ)"}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          )}
          {bun && !!constructorIngredients.length && (
            <div className={BCStyle.container + " mt-10"}>
              <p className="text text_type_digits-medium mr-2">{cost}</p>
              <img alt="валюта" src={currency} className="mr-10" />
              <Button
                disabled={isLoading? true : false}
                type="primary"
                size="large"
                htmlType="button"
                onClick={onButtonClick}
              >
                {isLoading ? "Оформляем..." : "Оформить заказ"}
              </Button>
            </div>
          )}
          {isOpen && (
            <Modal onClose={closeModal}>
              <OrderDetails />
            </Modal>
          )}
        </>
      )}
    </section>
  );
}

export default BurgerConstructor;
