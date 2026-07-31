import { createSlice } from "@reduxjs/toolkit";

// Пытаемся достать юзера из памяти браузера при загрузке
const savedUser = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  user: savedUser || null, // null означает, что мы не залогинены
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Сохраняем в LocalStorage
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;