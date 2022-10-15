import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import CStyle from "./cart.module.css";

function Cart(props) {
  return (
    <div className={CStyle.cart}>
      <div className={CStyle["img-container"] + " pl-4 pr-4"}>
        <img src={props.data.image} alt={props.data.name} />
        {!!props.data.count && (
          <Counter count={props.data.count} size="default" />
        )}
      </div>
      <div className={CStyle.flex + " mt-2 mb-2"}>
        <p className="text text_type_digits-default mr-2">{props.data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={CStyle.name + " text text_type_main-default"}>
        {props.data.name}
      </p>
    </div>
  );
}

Cart.protoTypes = {
  data: ingredientPropType.isRequired
};

export default Cart;
