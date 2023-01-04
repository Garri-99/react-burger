import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  orders: [],
  myOrders: [],
  total: null,
  totalToday: null,
  error: undefined,
};

const socketSlice = createSlice({
  name: "WS",
  initialState,
  reducers: {
    connectionSucces(state) {
      state.connected = true;
      state.error = undefined;
    },
    connectionError(state, action) {
      state.connected = false;
      state.error = action.payload;
    },
    connectionClosed(state) {
      state.error = undefined;
      state.connected = false;
    },
    getOrders(state, action) {
      state.error = undefined;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    getMyOrders(state, action) {
      state.error = undefined;
      state.myOrders = action.payload.orders.reverse();
    },
  },
});

export const {
  connectionSucces,
  connectionError,
  connectionClosed,
  getOrders,
  getMyOrders
} = socketSlice.actions;

const WS_CONNECTION_START = 'WS_CONNECTION_START'

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: connectionSucces,
  onClose: connectionClosed,
  onError: connectionError,
  onMessage: getOrders,
  onUserMessage: getMyOrders
};

export default socketSlice.reducer;
