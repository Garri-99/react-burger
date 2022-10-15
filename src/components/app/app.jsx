import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import AStyle from "./app.module.css";

function App() {
  const baseUrl = "https://norma.nomoreparties.space";
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
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
      <main className={AStyle.content}>
        <BurgerIngredients
          main={data.filter((item) => item.type === "main")}
          sauces={data.filter((item) => item.type === "sauce")}
          buns={data.filter((item) => item.type === "bun")}
        />
        <BurgerConstructor
          data={data.filter(
            (item) => item.type === "main" || item.type === "sauce"
          )}
        />
      </main>
    </>
  );
}

export default App;
