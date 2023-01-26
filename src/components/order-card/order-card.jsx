import {
  CurrencyIcon,
  FormattedDate,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OCStyles from "./order-card.module.css";

function OrderCard({ ingredients, date, name, number }) {
  return (
    <div className={OCStyles.card}>
      <div className={OCStyles.flex}>
        <p className="text text_type_digits-default">#{number}</p>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(date)}
        />
      </div>
      <p className="text text_type_main-medium">{name}</p>
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

export default OrderCard;
