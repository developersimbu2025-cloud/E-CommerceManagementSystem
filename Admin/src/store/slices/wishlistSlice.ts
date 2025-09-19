import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  dateAdded: string;
};

export type WishlistState = {
  items: WishlistItem[];
  itemCount: number;
};

const initialState: WishlistState = {
  items: [],
  itemCount: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // ✅ Add item to wishlist
    addToWhislist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        state.itemCount += 1;
        // state.itemCount = state.items.length;
      }
    },
    // ✅ Remove a single item from wishlist
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.itemCount -= 1;
    },

    // ✅ Clear the wishlist
    clearWishlist: (state) => {
      state.items = [];
      state.itemCount = 0;
    },
  },
});

export const { addToWhislist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
