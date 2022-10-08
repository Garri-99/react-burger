import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import currency from "../../images/icon.svg";
import BCStyle from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

function BurgerConstructor(props) {
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
        <Button type="primary" size="large" htmlType="button">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.protoTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;
