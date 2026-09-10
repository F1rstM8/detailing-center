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

      if (String(id) === String(ADMIN_ID)) {
        userRole = "admin";
      }

      const userData = { id, email, ...rest, role: userRole };

      state.user = userData;
      state.role = userRole;
      state.isAuthenticated = true;

      localStorage.setItem("authUser", JSON.stringify(userData));
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
