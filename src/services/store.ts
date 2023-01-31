import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware";
import constructorIngredientsSlice from "./slices/constructor-ingredients-slice";
import ingredientsSlice from "./slices/ingredients-slice";
import orderSlice from "./slices/order-slice";
import socketSlice, { wsActions } from "./slices/socket-slice";
import userSlice from "./slices/user-slice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    constructorIngredients: constructorIngredientsSlice,
    order: orderSlice,
    user: userSlice,
    socket: socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
