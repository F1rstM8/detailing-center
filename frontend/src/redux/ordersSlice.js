import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersList: [], // Оставляем пустым! Никакого хардкода.
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
  },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;