import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("authUser"));

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
      const { email, ...rest } = action.payload;
      
      let userRole = "client";
      if (email === "admin@test.com") {
        userRole = "admin";
      } else if (email === "manager@test.com") {
        userRole = "manager";
      }

      state.user = { email, ...rest, role: userRole };
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