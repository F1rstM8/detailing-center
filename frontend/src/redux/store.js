import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import ordersReducer from "./ordersSlice"; // 1. Импортируем новый редюсер

// Функция загрузки данных из LocalStorage
const loadState = () => {
  try {
    const cartState = localStorage.getItem("cartState");
    const ordersState = localStorage.getItem("ordersState"); // Читаем заявки
    
    return {
      cart: cartState ? JSON.parse(cartState) : undefined,
      orders: ordersState ? JSON.parse(ordersState) : undefined,
    };
  } catch (err) {
    console.error("Ошибка при загрузке данных", err);
    return undefined;
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer, // 2. Добавляем в общий стор
  },
  preloadedState,
});

// Сохраняем и корзину, и заявки при любых изменениях
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("cartState", JSON.stringify(state.cart));
    localStorage.setItem("ordersState", JSON.stringify(state.orders));
  } catch (err) {
    console.error("Ошибка при сохранении данных", err);
  }
});

export default store;