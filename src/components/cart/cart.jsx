import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import CStyle from "./cart.module.css";

function Cart(props) {
  return (
    <div className={CStyle.cart}>
      <div className={CStyle["img-container"] + " pl-4 pr-4"}>
        <img src={props.image} alt={props.name} />
        {!!props.count && <Counter count={props.count} size="default" />}
      </div>
      <div className={CStyle.flex + " mt-2 mb-2"}>
        <p className="text text_type_digits-default mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={CStyle.name + " text text_type_main-default"}>
        {props.name}
      </p>
    </div>
  );
}

Cart.protoTypes = {
  count: PropTypes.number,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Cart;
