import { useState, useEffect } from "react";
import { IngredientsContext } from "../../context/ingredients-context";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import AStyle from "./app.module.css";

function App() {
  const baseUrl = "https://norma.nomoreparties.space";
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <AppHeader />
      {data && (
        <main className={AStyle.content}>
          <IngredientsContext.Provider
            value={{
              all: data,
              buns: data.filter((item) => item.type === "bun"),
              sauces: data.filter((item) => item.type === "sauce"),
              main: data.filter((item) => item.type === "main"),
            }}
          >
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientsContext.Provider>
        </main>
      )}
    </>
  );
}

export default App;
