import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      const priceNumber = parseInt(action.payload.price.replace(/\D/g, ''));
      state.totalPrice += priceNumber;
    },
    removeItem(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        const priceNumber = parseInt(state.items[index].price.replace(/\D/g, ''));
        state.totalPrice -= priceNumber;
        state.items.splice(index, 1);
      }
    },
    // Новое действие: полная очистка корзины
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  },
});

// Не забудь экспортировать clearCart!
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;