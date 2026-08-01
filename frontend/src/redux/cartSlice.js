import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      
      // Если услуга уже в корзине, не добавляем второй раз
      if (!existingItem) {
        state.items.push(item);
        state.totalPrice += item.price;
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.id === id);
      
      if (existingItem) {
        state.totalPrice -= existingItem.price;
        state.items = state.items.filter((i) => i.id !== id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;