import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppStyle from './App.module.css';

function App() {
  return (
    <>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  )
}

export default App;
