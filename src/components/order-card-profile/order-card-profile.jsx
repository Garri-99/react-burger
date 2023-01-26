import {
  CurrencyIcon,
  FormattedDate,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import OCStyles from "./order-card-profile.module.css";

function OrderCardProfile({ ingredients, orderId }) {
  const order = useSelector((store) => store.socket.myOrders).find(
    (i) => i._id === orderId
  );
  const status = useMemo(() => {
    if (order.status) {
      return order.status === "done"
        ? "Выполнен"
        : order.status === "pending"
        ? "Готовится"
        : "Создан";
    }
    return null;
  }, [order.status]);
  const color = useMemo(() => {
    if (status) {
      return status === "Выполнен" ? "#00CCCC" : "#F2F2F3";
    }
    return null;
  }, [status]);
  return (
    <div className={OCStyles.card}>
      <div className={OCStyles.flex}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.updatedAt)}
        />
      </div>
      <div>
        <p className="text text_type_main-medium">{order.name}</p>
        <p
          className="text text_type_main-default mt-2"
          style={{ color: color }}
        >
          {status}
        </p>
      </div>
      <div className={OCStyles.flex}>
        <ul className={OCStyles.ingredients}>
          {ingredients?.slice(0, 6).map((item, index) => (
            <li className={OCStyles.circle} key={item._id}>
              <img className={OCStyles.img} src={item.image} alt={item.name} />
              {item.__v > 1 && index < 5 && (
                <Counter count={item.__v} size="small" extraClass="mr-1 mb-1" />
              )}
              {index === 5 && (
                <div className={OCStyles.overlay}>
                  <p className="text text_type_digits-default">
                    +{ingredients.length - 5}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
        <figure className={OCStyles.fig}>
          <p className="text text_type_digits-default mr-2">
            {ingredients.reduce((acc, i) => acc + i.price * i.__v, 0)}
          </p>
          <CurrencyIcon />
        </figure>
      </div>
    </div>
  );
}

export default OrderCardProfile;
