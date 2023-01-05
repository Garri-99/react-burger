import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Loader } from "../../components/loader/loader";
import OrderCard from "../../components/order-card/order-card";
import { wsActions } from "../../services/slices/socket-slice";
import { wsUrl } from "../../utils/constants";
import { uniqIngredient } from "../../utils/uniq-ingredient";
import styles from "./feed.module.css";

function FeedPage() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((store) => store.socket);
  const { ingredients } = useSelector((store) => store.ingredients);
  const { wsInit } = wsActions;
  const history = useHistory();
  const onOrderClick = (id, number) => {
    history.push(`/feed/${id}`, { backgroundFeed: history.location, number });
  };
  useEffect(() => {
    dispatch({
      type: wsInit,
      payload: { wsUrl: `${wsUrl}/orders/all`, user: false },
    });
    return () => {
      dispatch({
        type: wsActions.onClose.type,
      });
    };
  }, []);

  return !orders.length ? (
    <Loader />
  ) : (
    <div className={styles.content}>
      <h2 className="text text_color_primary text_type_main-large mt-10 mb-5">
        Лента заказов
      </h2>
      <div className={styles.flex}>
        <ul className={styles.container}>
          {orders.map((order) => (
            <li
              key={order._id}
              onClick={() => onOrderClick(order._id, order.number)}
            >
              <OrderCard
                date={order.updatedAt}
                number={order.number}
                name={order.name}
                ingredients={uniqIngredient(
                  order.ingredients.map((id) => {
                    const ingredient = ingredients.find((i) => i._id === id);
                    return { ...ingredient, __v: 1 };
                  })
                )}
              />
            </li>
          ))}
        </ul>
        <div className={styles.board}>
          <div className={styles.flex}>
            <div className={styles.column}>
              <p className="text text_type_main-medium mb-6">Готовы:</p>
              <ul className={styles.numbers}>
                {orders
                  .filter((item) => item.status === "done")
                  .slice(0, 20)
                  .map((item) => (
                    <li
                      key={item._id}
                      className={
                        styles.green + " text text_type_digits-default"
                      }
                    >
                      {item.number}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.column}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <ul className={styles.numbers}>
                {orders
                  .filter((item) => item.status === "pending")
                  .slice(0, 20)
                  .map((item) => (
                    <li
                      key={item._id}
                      className="text text_type_digits-default"
                    >
                      {item.number}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <p className={styles.large + " text text_type_digits-large"}>
              {total}
            </p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={styles.large + " text text_type_digits-large"}>
              {totalToday}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
