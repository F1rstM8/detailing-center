import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchServices } from "../api/servicesApi";

export const getServices = createAsyncThunk(
  "services/getServices",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchServices();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Ошибка при загрузке услуг");
    }
  },
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
