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
    // Добавляем экшен удаления заказа по его id
    removeOrder: (state, action) => {
      state.ordersList = state.ordersList.filter((order) => order.id !== action.payload);
    },
  },
});

// Не забываем добавить removeOrder в экспорт
export const { addOrder, updateOrderStatus, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;