import { configureStore } from "@reduxjs/toolkit";
import constructorIngredientsSlice from "./slices/constructor-ingredients-slice";
import ingredientsSlice from "./slices/ingredients-slice";
import orderSlice from "./slices/order-slice";
import userSlice from "./slices/user-slice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    constructorIngredients: constructorIngredientsSlice,
    order: orderSlice,
    user: userSlice
  },
})
