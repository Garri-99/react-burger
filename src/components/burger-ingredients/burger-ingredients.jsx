import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BIStyle from "./burger-ingredients.module.css";
import Cart from "../cart/cart";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [details, setDetails] = React.useState(null);
  const [current, setCurrent] = React.useState("bun");

  const onIngredientClick = (data) => {
    setDetails(data);
    setIsOpen(true);
  };

  const closeAllModals = () => {
    setIsOpen(false);
  };

  return (
    <section className={BIStyle.section}>
      <h1 className="text text_color_primary text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h1>
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
      <div className={BIStyle.container}>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6">
          Булки
        </h2>
        <ul className={BIStyle.list}>
          {props.buns.map((item) => (
            <li key={item._id} onClick={() => onIngredientClick(item)}>
              <Cart data={item} />
            </li>
          ))}
        </ul>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6">
          Соусы
        </h2>
        <ul className={BIStyle.list}>
          {props.sauces.map((item) => (
            <li key={item._id} onClick={() => onIngredientClick(item)}>
              <Cart data={item} />
            </li>
          ))}
        </ul>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6">
          Начинки
        </h2>
        <ul className={BIStyle.list}>
          {props.main.map((item) => (
            <li key={item._id} onClick={() => onIngredientClick(item)}>
              <Cart data={item} />
            </li>
          ))}
        </ul>
      </div>
      {isOpen && (
        <Modal onClose={closeAllModals} title={"Детали ингредиента"}>
          <IngredientDetails data={details} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.protoTypes = {
  main: PropTypes.arrayOf(ingredientPropType).isRequired,
  sauces: PropTypes.arrayOf(ingredientPropType).isRequired,
  buns: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
