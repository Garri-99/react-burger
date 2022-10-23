import { useContext, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BIStyle from "./burger-ingredients.module.css";
import Cart from "../cart/cart";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientsContext } from "../../context/ingredients-context";

function BurgerIngredients() {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [current, setCurrent] = useState("bun");
  const ingredients = useContext(IngredientsContext);
  const sauces = useRef(null);
  const buns = useRef(null);
  const main = useRef(null);
  const container = useRef(null)

  const onIngredientClick = (data) => {
    setDetails(data);
    setIsOpen(true);
  };

  const closeAllModals = () => {
    setIsOpen(false);
  };

  const onTabClick = (e) => {
    if (e === 'bun') {
      buns.current.scrollIntoView({behavior: 'smooth'});
      setCurrent(e)
    } else if (e === 'sauce') {
      sauces.current.scrollIntoView({behavior: 'smooth'});
      setCurrent(e)
    } else if (e === 'main') {
      main.current.scrollIntoView({behavior: 'smooth'});
      setCurrent(e)
    }
  }
  return (
    <section className={BIStyle.section}>
      <h1 className="text text_color_primary text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h1>
      <div className={BIStyle.flex}>
        <Tab value="bun" active={current === "bun"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={BIStyle.container} ref={container}>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6" ref={buns}>
          Булки
        </h2>
        <ul className={BIStyle.list}>
          {ingredients.buns.map((item) => (
            <li key={item._id} onClick={() => onIngredientClick(item)}>
              <Cart data={item} />
            </li>
          ))}
        </ul>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6" ref={sauces}>
          Соусы
        </h2>
        <ul className={BIStyle.list}>
          {ingredients.sauces.map((item) => (
            <li key={item._id} onClick={() => onIngredientClick(item)}>
              <Cart data={item} />
            </li>
          ))}
        </ul>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6" ref={main}>
          Начинки
        </h2>
        <ul className={BIStyle.list}>
          {ingredients.main.map((item) => (
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

export default BurgerIngredients;
