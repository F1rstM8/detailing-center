import { createSlice } from "@reduxjs/toolkit";

let savedOrders = [];
try {
  const item = localStorage.getItem("appOrders");
  if (item) {
    savedOrders = JSON.parse(item);
  }
} catch (error) {
  console.error("Ошибка при чтении appOrders из localStorage:", error);
  localStorage.removeItem("appOrders");
}

const initialState = {
  ordersList: savedOrders,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.ordersList.push(action.payload);
      localStorage.setItem("appOrders", JSON.stringify(state.ordersList));
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.ordersList.find((o) => o.id === id);
      if (order) {
        order.status = status;
        localStorage.setItem("appOrders", JSON.stringify(state.ordersList));
      }
    },
    removeOrder: (state, action) => {
      state.ordersList = state.ordersList.filter((order) => order.id !== action.payload);
      localStorage.setItem("appOrders", JSON.stringify(state.ordersList));
    },
  },
});

export const { addOrder, updateOrderStatus, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;