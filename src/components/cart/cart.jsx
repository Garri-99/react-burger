import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { ingredientPropType } from "../../utils/prop-types";
import CStyle from "./cart.module.css";

function Cart({data}) {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: data
  })

  return (
    <div className={CStyle.cart} ref={dragRef}>
      <div className={CStyle["img-container"] + " pl-4 pr-4"}>
        <img src={data.image} alt={data.name} />
        {!!data.__v && (
          <Counter count={data.__v} size="default" />
        )}
      </div>
      <div className={CStyle.flex + " mt-2 mb-2"}>
        <p className="text text_type_digits-default mr-2">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={CStyle.name + " text text_type_main-default"}>
        {data.name}
      </p>
    </div>
  );
}

Cart.propTypes = {
  data: ingredientPropType.isRequired
};

export default Cart;
