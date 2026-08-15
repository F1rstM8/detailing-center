import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersList: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.ordersList.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.ordersList.find((o) => o.id === id);
      if (order) {
        order.status = status;
      }
    },
    removeOrder: (state, action) => {
      state.ordersList = state.ordersList.filter((order) => order.id !== action.payload);
    },
  },
});

export const { addOrder, updateOrderStatus, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;