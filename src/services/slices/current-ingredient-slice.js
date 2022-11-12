import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentIngredient: null,
}

const currentIngredientSlice = createSlice({
  name: 'currentIngedient',
  initialState,
  reducers: {
    setIngredient(state, action) {
      state.currentIngredient = action.payload
    },
    clearCurrentIngredient(state) {
      state.currentIngredient = null
    }
  }
});

export default currentIngredientSlice.reducer;
export const { setIngredient, clearCurrentIngredient } = currentIngredientSlice.actions
