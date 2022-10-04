import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import BIStyle from './burger-ingredients.module.css'
import Cart from "../cart/cart";

const Tabs = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

class BurgerIngredients extends React.Component {
  render() {
   return (
    <section className={BIStyle.section}>
      <h1 className="text text_color_primary text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Tabs />
      <div className={BIStyle['menu-container']}>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6">Булки</h2>
        <div className={BIStyle['cart-container'] + ' pl-4 pr-4'}>
          <Cart image={data[0].image} price={20} count={1} name={data[0].name} />
          <Cart image={data[14].image} price={20} name={data[14].name} />
        </div>
        <h2 className="text text_color_primary text_type_main-medium mt-10 mb-6">Соусы</h2>
        <div className={BIStyle['cart-container'] + ' pl-4 pr-4'}>
          <Cart image={data[3].image} price={30} name={data[3].name} />
          <Cart image={data[6].image} price={30} name={data[6].name} />
          <Cart image={data[5].image} price={30} count={1} name={data[5].name} />
          <Cart image={data[9].image} price={30} name={data[9].name} />
        </div>
      </div>
    </section>
   )
  }
}

export default BurgerIngredients
