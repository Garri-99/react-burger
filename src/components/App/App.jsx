import { buns, data, main, sauces } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import AStyle from "./app.module.css";

function App() {
  return (
    <>
      <AppHeader />
      <main className={AStyle.content}>
        <BurgerIngredients main={main} sauces={sauces} buns={buns} />
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
