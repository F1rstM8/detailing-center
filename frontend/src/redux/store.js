import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import ordersReducer from "./ordersSlice";
import servicesReducer from "./servicesSlice"

const loadState = () => {
  try {
    const cartState = localStorage.getItem("cartState");
    const ordersState = localStorage.getItem("ordersState");
    
    return {
      cart: cartState ? JSON.parse(cartState) : undefined,
      orders: ordersState ? JSON.parse(ordersState) : undefined,
    };
  } catch (err) {
    console.error("Error loading state from localStorage", err);
    return undefined;
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    services: servicesReducer,
    orders: ordersReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  try {
    const state = store.getState();
    
    localStorage.setItem("cartState", JSON.stringify(state.cart));
    localStorage.setItem("ordersState", JSON.stringify(state.orders));
    
    if (state.auth.isAuthenticated) {
      localStorage.setItem("authUser", JSON.stringify(state.auth.user));
    } else {
      localStorage.removeItem("authUser");
    }
  } catch (err) {
    console.error("Error saving state to localStorage", err);
  }
});

export default store;