import axios, { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { dashboardTypes } from "./type";
import { application } from "../../../redux/store";
import {
  setCart,
  setCoupon,
  setLoading,
  setProducts,
  setSuccess,
} from "./slice";
import toast from "react-hot-toast";
import { cartProcessType, couponCheckerType } from "../../../utils/types";
import { PayloadAction } from "@reduxjs/toolkit";

function* getProductsHandler() {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(`${application.api}product`)
    );
    yield put(setSuccess(true));
    yield put(setProducts(response.data));
  } catch (error) {
    yield put(setSuccess(false));
  } finally {
    yield put(setLoading(false));
  }
}

function* getCartHandler({ payload }: PayloadAction<string>) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse = yield axios.get(
      `${application.api}cart?userId=${payload}`
    );
    yield put(setSuccess(true));
    yield put(setCart(response.data));
  } catch (error) {
    yield put(setSuccess(false));
  } finally {
    yield put(setLoading(false));
  }
}

function* addToCartHandler({ payload }: PayloadAction<cartProcessType>) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse = yield axios.post(
      `${application.api}product`,
      payload
    );
    toast.success("Ürün sepetinize eklendi !");
    yield getProductsHandler();
    yield getCartHandler({
      payload: payload.userId,
      type: dashboardTypes.GET_CART,
    });
  } catch (error) {
    toast.error("Stok yetersiz");
    yield put(setSuccess(false));
  } finally {
    yield put(setLoading(false));
  }
}

function* removeFromCartHandler({ payload }: PayloadAction<cartProcessType>) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse = yield call(() =>
      axios.delete(`${application.api}product`, { data: payload })
    );
    yield getProductsHandler();
    yield getCartHandler({
      payload: payload.userId,
      type: dashboardTypes.GET_CART,
    });
  } catch (error) {
    yield put(setSuccess(false));
  } finally {
    yield put(setLoading(false));
  }
}

function* checkCouponHandler({ payload }: PayloadAction<couponCheckerType>) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(`${application.api}cart/coupon?coupon=${payload.coupon}`)
    );
    yield getProductsHandler();
    yield getCartHandler({
      payload: payload.userId,
      type: dashboardTypes.GET_CART,
    });
    yield put(setCoupon(response.data));
    toast.success("Kupon Geçerli");
  } catch (error) {
    yield put(setSuccess(false));
    yield put(setCoupon("failure"));
    toast.error("Kupon Geçersiz");
  } finally {
    yield put(setLoading(false));
  }
}

export function* dashboardSaga() {
  yield all([
    takeEvery(dashboardTypes.GET_PRODUCTS, getProductsHandler),
    takeEvery(dashboardTypes.ADD_TO_CART, addToCartHandler),
    takeEvery(dashboardTypes.GET_CART, getCartHandler),
    takeEvery(dashboardTypes.DELETE_FROM_CART, removeFromCartHandler),
    takeEvery(dashboardTypes.CHECK_COUPON, checkCouponHandler),
  ]);
}
