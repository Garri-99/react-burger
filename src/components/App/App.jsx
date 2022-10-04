import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppStyle from './App.module.css';

function App() {
  return (
    <>
      <AppHeader />
      <main className={AppStyle.content}>
        <BurgerIngredients />
      </main>
    </>
  )
}

export default App;
