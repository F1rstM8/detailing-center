import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Тут будут лежать выбранные услуги
  totalPrice: 0, // Общая сумма заказа
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // Добавляем услугу в список
      state.items.push(action.payload);
      
      // Высчитываем сумму (убираем знак € и пробелы, чтобы сложить числа)
      const priceNumber = parseInt(action.payload.price.replace(/\D/g, ''));
      state.totalPrice += priceNumber;
    },
    removeItem(state, action) {
      // Удаление услуги из корзины по ID
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        const priceNumber = parseInt(state.items[index].price.replace(/\D/g, ''));
        state.totalPrice -= priceNumber;
        state.items.splice(index, 1);
      }
    }
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;