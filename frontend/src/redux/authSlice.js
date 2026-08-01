import { createSlice } from "@reduxjs/toolkit";

// Пытаемся достать юзера из памяти браузера при загрузке
const savedUser = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  user: savedUser || null,
  role: savedUser?.role || null, // Достаем роль, если юзер уже был сохранен
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Ожидаем, что с формы логина прилетит объект с полем email
      const { email, ...rest } = action.payload;
      
      // Наша заглушка (Mock Auth) из README.md
      let userRole = "client"; // По умолчанию
      if (email === "admin@test.com") {
        userRole = "admin";
      } else if (email === "manager@test.com") {
        userRole = "manager";
      }

      // Собираем полного юзера с его новой ролью
      const loggedInUser = { email, ...rest, role: userRole };

      state.user = loggedInUser;
      state.role = userRole; // Кладем роль в стейт, чтобы шапка её увидела
      state.isAuthenticated = true;
      
      // Сохраняем в LocalStorage, чтобы сессия не слетала при F5
      localStorage.setItem("authUser", JSON.stringify(loggedInUser));
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;