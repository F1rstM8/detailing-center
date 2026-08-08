import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import ordersReducer from "./ordersSlice";

const loadState = () => {
  try {
    const cartState = localStorage.getItem("cartState");
    const ordersState = localStorage.getItem("ordersState");
    
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
    orders: ordersReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  try {
    const state = store.getState();
    
    localStorage.setItem("cartState", JSON.stringify(state.cart));
    localStorage.setItem("ordersState", JSON.stringify(state.orders));
    
    // Новая логика для авторизации
    if (state.auth.isAuthenticated) {
      localStorage.setItem("authUser", JSON.stringify(state.auth.user));
    } else {
      localStorage.removeItem("authUser");
    }
  } catch (err) {
    console.error("Ошибка при сохранении данных", err);
  }
});

export default store;