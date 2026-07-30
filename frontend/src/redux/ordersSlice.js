import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersList: [], // Здесь будут храниться все заказы
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Добавление нового заказа
    addOrder: (state, action) => {
      state.ordersList.push(action.payload);
    },
    // Обновление статуса (пригодится для админки позже)
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