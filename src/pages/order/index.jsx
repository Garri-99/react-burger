import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { wsActions } from "../../services/slices/socket-slice";
import { uniqIngredient } from "../../utils/uniq-ingredient";
import PropTypes from "prop-types";
import { wsUrl } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

function OrderPage({ isModal, isUser }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { wsInit } = wsActions;
  useEffect(() => {
    if (isUser) {
      dispatch({
        type: wsInit,
        payload: { wsUrl: `${wsUrl}/orders?token=${getCookie("token")}`, user: true},
      });
    } else {
      dispatch({
        type: wsInit,
        payload: { wsUrl: `${wsUrl}/orders/all`, user: false},
      });
    }
  }, []);
  const { ingredients } = useSelector((store) => store.ingredients);
  const order = useSelector((store) => store.socket[isUser ? 'myOrders' : 'orders']).find(
    (i) => i._id === id
  );
  const status = useMemo(() => {
    if (order) {
      return order.status === "done"
        ? "Выполнен"
        : order.status === "pending"
        ? "Готовится"
        : "Создан";
    }
    return null;
  }, [order]);
  const color = useMemo(() => {
    if (status) {
      return status === "Выполнен" ? "#00CCCC" : "#F2F2F3";
    }
    return null;
  }, [status]);
  const staff = useMemo(() => {
    if (order) {
      return uniqIngredient(
        order &&
          order.ingredients.map((id) => {
            const ingredient = ingredients.find((i) => i._id === id);
            return { ...ingredient, __v: 1 };
          })
      );
    }
    return null;
  }, [order, ingredients]);
  return (
    order && (
      <div className={style.wrapper}>
        {!isModal && (
          <p className={style.number + " text text_type_digits-default mb-10"}>
            #{order.number}
          </p>
        )}
        <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
        <p
          className="text text_type_main-default mb-15"
          style={{ color: color }}
        >
          {status}
        </p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <ul className={style.list}>
          {staff.map((i) => (
            <li className={style.item} key={i._id}>
              <div className={style.circle}>
                <img className={style.img} src={i.image} alt={i.name} />
              </div>
              <p className={style.name + " text text_type_main-default ml-4"}>
                {i.name}
              </p>
              <div className={style.price}>
                <p className="text text_type_digits-default">
                  {i.__v} x {i.price}
                </p>
                <CurrencyIcon />
              </div>
            </li>
          ))}
        </ul>
        <div className={style.flex}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(order.updatedAt)}
            />
          </p>
          <div className={style.price}>
            <p className="text text_type_digits-default">
              {staff.reduce((acc, i) => acc + i.price * i.__v, 0)}
            </p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    )
  );
}

OrderPage.propTypes = {
  isModal: PropTypes.bool,
  isUser: PropTypes.bool
};

export default OrderPage;
