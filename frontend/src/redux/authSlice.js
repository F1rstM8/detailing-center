import { createSlice } from "@reduxjs/toolkit";

const ADMIN_ID = "1"; 

let savedUser = null;

try {
  const item = localStorage.getItem("authUser");
  if (item) {
    savedUser = JSON.parse(item);
  }
} catch (error) {
  console.error("Ошибка при чтении authUser из localStorage:", error);
  localStorage.removeItem("authUser");
}

const initialState = {
  user: savedUser || null,
  role: savedUser?.role || null,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, email, ...rest } = action.payload;

      let userRole = "client";
      
      // Если ID совпадает с админским, выдаем права
      if (String(id) === String(ADMIN_ID)) {
        userRole = "admin";
      }

      state.user = { id, email, ...rest, role: userRole };
      state.role = userRole;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;