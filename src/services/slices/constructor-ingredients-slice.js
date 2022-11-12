import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  constructorIngredients: [],
  cost: 0,
};

const constructorIngredientsSlice = createSlice({
  name: "constructorIngredients",
  initialState,
  reducers: {
    setBun(state, action) {
      state.bun
        ? (state.cost =
            state.cost - 2 * state.bun.price + 2 * action.payload.price)
        : (state.cost += 2 * action.payload.price);
      state.bun = action.payload;
    },
    addIngredient(state, action) {
      state.constructorIngredients.push(action.payload);
      state.cost += action.payload.price;
    },
    deleteIngredient(state, action) {
      state.constructorIngredients = state.constructorIngredients.filter(
        (item) => item.constructorId !== action.payload.constructorId
      );
      state.cost -= action.payload.price;
    },
    moveIngredient(state, action) {
      state.constructorIngredients.splice(action.payload.dragIndex, 1);
      state.constructorIngredients.splice(
        action.payload.hoverIndex,
        0,
        action.payload.item
      );
    },
  },
});

export default constructorIngredientsSlice.reducer;
export const { setBun, addIngredient, deleteIngredient, moveIngredient } =
  constructorIngredientsSlice.actions;
