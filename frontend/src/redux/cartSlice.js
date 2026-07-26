import { createSlice } from '@reduxjs/toolkit';

// Функция для загрузки корзины из памяти браузера
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cartState');
    if (savedCart === null) {
      return { items: [], totalPrice: 0 }; // Если пусто, возвращаем чистую корзину
    }
    return JSON.parse(savedCart); // Если есть данные, расшифровываем их
  } catch (err) {
    return { items: [], totalPrice: 0 };
  }
};

const initialState = loadCartFromStorage(); // Используем функцию вместо пустых массивов

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        state.items.push(action.payload);
        state.totalPrice += action.payload.price;
      }
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      
      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price;
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;