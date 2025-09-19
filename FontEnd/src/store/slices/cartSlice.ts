import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
};

export type CartState = {
  items: CartItem[];
  itemCount: number;
  total: number;
  shipping: number;
  tax: number;
  grandTotal: number;
};

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
  shipping: 0,
  tax: 0,
  grandTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        state.itemCount += 1;
      } else {
        exists.quantity += 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.itemCount -= 1;
    },

    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    calculateTotals: (state) => {
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.shipping = state.total > 0 ? 10 : 0;
      state.tax = state.total * 0.1;
      state.grandTotal = state.total + state.shipping + state.tax;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
