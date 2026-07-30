import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // Здесь будут храниться все оформленные заявки
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Добавление новой заявки
    addOrder: (state, action) => {
      state.list.push(action.payload);
    },
    // Изменение статуса заявки админом
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.list.find((o) => o.id === id);
      if (order) {
        order.status = status;
      }
    },
  },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;