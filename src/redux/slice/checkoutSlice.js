import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  shippingAdress: {},
  billingAdress: {},
};

const checkOutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS: (state, action) => {
        state.shippingAdress = action.payload
    },
    SAVE_BILLING_ADDRESS: (state, action) => {
        state.billingAdress = action.payload
    },
  },
});

export const { SAVE_SHIPPING_ADDRESS, SAVE_BILLING_ADDRESS } = checkOutSlice.actions;

export const selectShippingAddress = (state) => state.checkout.shippingAdress;
export const selectBillingAddress = (state) => state.checkout.billingAdress;


export default checkOutSlice.reducer;