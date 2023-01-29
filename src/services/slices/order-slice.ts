import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { IIngredient } from "../../types";
import { baseUrl } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { request } from "../../utils/request";

type TOrderState = {
  number: number | null;
  isLoading: boolean;
};

const initialState: TOrderState = {
  number: null,
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderNubmer(state, action) {
      state.number = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

const { setOrderNubmer, setIsLoading } = orderSlice.actions;

type TGetOrderArgs = {
  bun: IIngredient | null;
  constructorIngredients: Array<IIngredient>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const getOrderNubmer = createAsyncThunk<void, TGetOrderArgs>(
  "order/getOrder",
  ({ bun, constructorIngredients, setIsOpen }, { dispatch }) => {
    dispatch(setIsLoading(true));
    request(`${baseUrl}/api/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      method: "POST",
      body: JSON.stringify({
        ingredients: [
          bun?._id,
          ...constructorIngredients.map((item) => item._id),
          bun?._id,
        ],
      }),
    })
      .then((res) => {
        dispatch(setOrderNubmer(res.order.number));
        setIsOpen(true);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setIsLoading(false)));
  }
);

export default orderSlice.reducer;
