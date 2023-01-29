import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../types";
import { baseUrl } from "../../utils/constants";
import { request } from "../../utils/request";

type TIngredientsState = {
  ingredients: Array<IIngredient>;
};

const initialState: TIngredientsState = {
  ingredients: [],
};

const ingredientsSlice = createSlice({
  name: "ingedients",
  initialState,
  reducers: {
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
    increaseVolume(state, action) {
      action.payload.type !== "bun"
        ? (state.ingredients[
            state.ingredients.findIndex(
              (item) => item._id === action.payload._id
            )
          ].__v += 1)
        : (state.ingredients[
            state.ingredients.findIndex(
              (item) => item._id === action.payload._id
            )
          ].__v += 2);
    },
    decreaseVolume(state, action) {
      action.payload.type !== "bun"
        ? (state.ingredients[
            state.ingredients.findIndex(
              (item) => item._id === action.payload._id
            )
          ].__v -= 1)
        : (state.ingredients[
            state.ingredients.findIndex(
              (item) => item._id === action.payload._id
            )
          ].__v -= 2);
    },
    resetCount(state) {
      state.ingredients.map((i) => (i.__v = 0));
    },
  },
});

export const { setIngredients, increaseVolume, decreaseVolume, resetCount } =
  ingredientsSlice.actions;

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  (_, { dispatch }) => {
    request(`${baseUrl}/api/ingredients`)
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => console.log(err));
  }
);

export default ingredientsSlice.reducer;
