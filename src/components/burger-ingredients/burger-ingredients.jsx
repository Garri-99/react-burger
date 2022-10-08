import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BIStyle from "./burger-ingredients.module.css";
import Cart from "../cart/cart";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

const Tabs = () => {
  const [current, setCurrent] = React.useState("bun");
  return (
    <div className={BIStyle.flex}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

function BurgerIngredients(props) {
  return (
    <section className={BIStyle.section}>
      <h1 className="text text_color_primary text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h1>
      <Tabs />
      <div className={BIStyle.container}>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6">
          Булки
        </h2>
        <ul className={BIStyle.list}>
          {props.buns.map((item, index) => (
            <li key={index}>
              <Cart
                image={item.image}
                price={item.price}
                count={item.__v}
                name={item.name}
              />
            </li>
          ))}
        </ul>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6">
          Соусы
        </h2>
        <ul className={BIStyle.list}>
          {props.sauces.map((item, index) => (
            <li key={index}>
              <Cart
                image={item.image}
                price={item.price}
                count={item.__v}
                name={item.name}
              />
            </li>
          ))}
        </ul>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6">
          Начинки
        </h2>
        <ul className={BIStyle.list}>
          {props.main.map((item, index) => (
            <li key={index}>
              <Cart
                image={item.image}
                price={item.price}
                count={item.__v}
                name={item.name}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.protoTypes = {
  main: PropTypes.arrayOf(ingredientPropType).isRequired,
  sauces: PropTypes.arrayOf(ingredientPropType).isRequired,
  buns: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
