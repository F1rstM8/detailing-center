import { createSlice } from "@reduxjs/toolkit";

let savedCart = [];
try {
  const item = localStorage.getItem("cartItems");
  if (item) {
    savedCart = JSON.parse(item);
  }
} catch (error) {
  console.error("Ошибка при чтении cartItems из localStorage:", error);
  localStorage.removeItem("cartItems");
}

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + Number(item.price || 0), 0);
};

const initialState = {
  items: savedCart,
  totalPrice: calculateTotal(savedCart),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (!existingItem) {
        state.items.push(item);
        state.totalPrice = calculateTotal(state.items);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      state.totalPrice = calculateTotal(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
