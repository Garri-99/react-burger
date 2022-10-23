import { useState, useEffect, useMemo } from "react";
import { IngredientsContext } from "../../context/ingredients-context";
import { request } from "../../utils/request";
import { baseUrl } from "../../utils/constants";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import AStyle from "./app.module.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    request(`${baseUrl}/api/ingredients`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const ingredients = useMemo(() => {
    return (
      data && {
        all: data,
        buns: data.filter((item) => item.type === "bun"),
        sauces: data.filter((item) => item.type === "sauce"),
        main: data.filter((item) => item.type === "main"),
      }
    );
  }, [data]);

  return (
    ingredients && (
      <>
        <AppHeader />
        <main className={AStyle.content}>
          <IngredientsContext.Provider value={ingredients}>
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientsContext.Provider>
        </main>
      </>
    )
  );
}

export default App;
