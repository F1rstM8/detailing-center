import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Здесь будут данные пользователя (имя, email)
  role: null, // Роль: 'admin', 'manager' или 'client'
  isAuthenticated: false, // Флаг: авторизован или нет
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Действие при успешном входе (называем login, чтобы совпадало с вызовами в компонентах)
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    // Действие при выходе из аккаунта
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;