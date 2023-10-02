import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    quantity: 0,
  },
  reducers: {
    addItems: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.quantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          defaultPrice: newItem.defaultPrice,
          quantity: 1,
          totalPrice: newItem.price || newItem.defaultPrice,
          name: newItem.name,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItems: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item?.id === id);
      state.quantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item?.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.quantity = 0;
    },
  },
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
