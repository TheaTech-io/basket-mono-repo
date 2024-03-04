import { createSlice } from "@reduxjs/toolkit";
import { couponType } from "../../../utils/types";
type IState = {
  loading: boolean;
  success: boolean;
  products: { id: number; name: string; stock: number; price: number }[];
  shipment: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    district: string;
  };
  payment: {
    cardHolder: string;
    cardNumber: string;
    expDate: string;
    cvv: string;
  };
  cart: {
    product: {
      id: number;
      name: string;
      price: number;
      stock: number;
    };
    quantity: number;
  }[];
  coupon: couponType;
};
const initialState: IState = {
  loading: false,
  success: false,
  products: [],
  shipment: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    district: "",
  },
  payment: { cardHolder: "", cardNumber: "", expDate: "", cvv: "" },
  cart: [],
  coupon: {
    id: 0,
    coupon: "",
    discountValue: 0,
    discountType: "",
  },
};
const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setShipment: (state, action) => {
      state.shipment = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
  },
});
export const {
  setSuccess,
  setLoading,
  setProducts,
  setShipment,
  setPayment,
  setCart,
  setCoupon,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
