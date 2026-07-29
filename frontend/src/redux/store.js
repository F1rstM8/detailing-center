import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

// Подписываемся на изменения: этот код срабатывает каждый раз, когда меняется корзина
store.subscribe(() => {
  try {
    // Получаем текущее состояние корзины
    const currentCartState = store.getState().cart;
    // Превращаем объект в строку, чтобы браузер мог его сохранить
    const serializedState = JSON.stringify(currentCartState);
    // Записываем в LocalStorage под именем 'cartState'
    localStorage.setItem("cartState", serializedState);
  } catch (err) {
    console.error("Ошибка при сохранении корзины", err);
  }
});

export default store;
