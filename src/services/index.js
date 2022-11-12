import { configureStore } from "@reduxjs/toolkit";
import constructorIngredientsSlice from "./slices/constructor-ingredients-slice";
import currentIngredientSlice from "./slices/current-ingredient-slice";
import ingredientsSlice from "./slices/ingredients-slice";
import orderSlice from "./slices/order-slice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    constructorIngredients: constructorIngredientsSlice,
    currentIngredient: currentIngredientSlice,
    order: orderSlice
  },
})
