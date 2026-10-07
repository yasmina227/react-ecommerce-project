import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  shippingFee: 15,
  coupon: {
    code: "",
    discountPercentage: 0,
    isApplied: false,
  },
  isLoading: false,
  error: null,
  auth:false
};


const updateCartTotals = (state) => {
  let { total, quantity } = state.cartItems.reduce(
    (cartTotal, cartItem) => {
      const { price, quantity } = cartItem;
      cartTotal.total += price * quantity;
      cartTotal.quantity += quantity;
      return cartTotal;
    },
    { total: 0, quantity: 0 }
  );

  if (state.coupon.isApplied) {
    total = total - (total * state.coupon.discountPercentage) / 100;
  }

  state.totalQuantity = quantity;
  state.totalAmount = total;
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProduct);
      }
      updateCartTotals(state); 
    },

    removeFromCart: (state, action) => {
     
      const itemId = action.payload?.id || action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      updateCartTotals(state); 
    },

    increaseQuantity: (state, action) => {
      const itemId = action.payload?.id || action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      
      
      if (item && (item.stock === undefined || item.quantity < item.stock)) {
        item.quantity += 1;
      }
      updateCartTotals(state); 
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload?.id || action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== itemId
          );
        }
      }
      updateCartTotals(state); 
    },

    applyCoupon: (state, action) => {
      
      const { code, discount } = action.payload;
      state.coupon = {
        code: code,
        discountPercentage: discount,
        isApplied: true,
      };
      updateCartTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.coupon = { code: "", discountPercentage: 0, isApplied: false };
    },

    calculateTotals: (state) => {
      updateCartTotals(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  applyCoupon,
  clearCart,
  calculateTotals,
} = CartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export default CartSlice.reducer;