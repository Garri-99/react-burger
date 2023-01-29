import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BIStyle from "./burger-ingredients.module.css";
import Cart from "../cart/cart";
import { useInView } from "react-intersection-observer";
import { useSelector } from "../../services/hooks";
import { IIngredient, TBun } from "../../types";

function BurgerIngredients() {
  const history = useHistory();
  const [current, setCurrentTab] = useState("bun");
  const { ingredients } = useSelector((state) => state.ingredients);
  const sauces = useRef<HTMLHeadingElement>(null);
  const buns = useRef<HTMLHeadingElement>(null);
  const mains = useRef<HTMLHeadingElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [bunsRef, inViewBuns] = useInView({
    threshold: 0.3,
  });
  const [mainsRef, inViewFilling] = useInView({
    threshold: 0.3,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0.3,
  });

  const onIngredientClick = (data: IIngredient) => {
    history.push(`/ingredient/${data._id}`, { background: history.location });
  };

  const onTabClick = (e: TBun | string) => {
    if (e === "bun") {
      buns.current?.scrollIntoView({ behavior: "smooth" });
    } else if (e === "sauce") {
      sauces.current?.scrollIntoView({ behavior: "smooth" });
    } else if (e === "main") {
      mains.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("bun");
    } else if (inViewSauces) {
      setCurrentTab("sauce");
    } else if (inViewFilling) {
      setCurrentTab("main");
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

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
        <h2
          className="text text_color_primary text_type_main-medium mt-10 mb-6"
          ref={buns}
        >
          Булки
        </h2>
        <ul className={BIStyle.list} ref={bunsRef}>
          {ingredients
            .filter((item) => item.type === "bun")
            .map((item) => (
              <li key={item._id} onClick={() => onIngredientClick(item)}>
                <Cart data={item} />
              </li>
            ))}
        </ul>
        <h2
          className="text text_color_primary text_type_main-medium mt-10 mb-6"
          ref={sauces}
        >
          Соусы
        </h2>
        <ul className={BIStyle.list} ref={saucesRef}>
          {ingredients
            .filter((item) => item.type === "sauce")
            .map((item) => (
              <li key={item._id} onClick={() => onIngredientClick(item)}>
                <Cart data={item} />
              </li>
            ))}
        </ul>
        <h2
          className="text text_color_primary text_type_main-medium mt-10 mb-6"
          ref={mains}
        >
          Начинки
        </h2>
        <ul className={BIStyle.list} ref={mainsRef}>
          {ingredients
            .filter((item) => item.type === "main")
            .map((item) => (
              <li key={item._id} onClick={() => onIngredientClick(item)}>
                <Cart data={item} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;
