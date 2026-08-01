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

      const loggedInUser = { email, ...rest, role: userRole };

      state.user = loggedInUser;
      state.role = userRole;
      state.isAuthenticated = true;
      
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