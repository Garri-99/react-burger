import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";
import { request } from "../../utils/request";

const initialState = {
  ingredients: null,
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
  },
});

export const { setIngredients, increaseVolume, decreaseVolume } =
  ingredientsSlice.actions;

export const getIngredients = () => {
  return (dispatch) => {
    request(`${baseUrl}/api/ingredients`)
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export default ingredientsSlice.reducer;
