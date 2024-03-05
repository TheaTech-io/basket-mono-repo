import { Box, Button, List, Menu, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { dashboardTypes } from "../../pages/Dashboard/store/type";
import { useFormik } from "formik";
import * as Yup from "yup";
import CartItem from "./CartItem";
import { couponType } from "../../utils/types";
import Checkout from "../Checkout/Checkout";

const Cart = ({
  anchorEl,
  open,
  handleClose,
  cart,
}: {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  cart: {
    product: { id: number; name: string; price: number; stock: number };
    quantity: number;
  }[];
}) => {
  const cartSlice = useAppSelector((state) => state.dashboardSlice.cart);
  const couponSlice: couponType = useAppSelector(
    (state) => state.dashboardSlice.coupon
  );
  const dispatch = useDispatch();
  const [checkout, setCheckout] = useState<boolean>(false);
  const couponChecker = () => {
    return couponSlice?.discountType !== "" ? true : false;
  };

  const calculateTotalPrice = (discountType: string) => {
    let totalPrice = cartSlice.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    let promotedItem = cartSlice.find(
      (item) => item.product.name === couponSlice.discountValue
    );
    let promotedItemCount = cartSlice.filter(
      (item) => item.product.name === couponSlice.discountValue
    )[0]?.quantity;
    let discountedPrice: number =
      couponSlice.discountType !== "discount" && promotedItemCount >= 2
        ? totalPrice - promotedItem!.product.price
        : totalPrice;
    if (
      couponSlice?.discountType === "discount" &&
      discountedPrice &&
      typeof couponSlice?.discountValue === "string"
    ) {
      if (
        parseFloat(couponSlice?.discountValue) >= 10 &&
        parseFloat(couponSlice?.discountValue) <= 100
      ) {
        const discount =
          totalPrice * (parseFloat(couponSlice?.discountValue) / 100);
        discountedPrice -= discount;
      }
    }

    if (discountType === "total") {
      return totalPrice;
    } else if (
      couponSlice?.discountType === "buyoneandgetonefree" &&
      promotedItem?.quantity! > 1
    ) {
      return discountedPrice;
    } else if (discountType === "discount" && cartSlice.length > 0) {
      return discountedPrice;
    } else {
      return totalPrice;
    }
  };

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      coupon: "",
    },
    validationSchema: Yup.object({
      coupon: Yup.string().required("Kupon kodu zorunludur"),
    }),
    onSubmit: (values) => {
      dispatch({
        type: dashboardTypes.CHECK_COUPON,
        payload: { coupon: values.coupon, userId: "0" },
      });
    },
  });

  useEffect(() => {
    dispatch({ type: dashboardTypes.GET_CART, payload: "0" });
  }, []);

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={handleClose}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {cart.length === 0 ? (
          <Typography
            sx={{ margin: "0 1rem" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Sepetiniz Boş
          </Typography>
        ) : (
          cart.map((item, index) => {
            const isCouponProduct =
              couponSlice.discountType === "buyoneandgetonefree" &&
              item.product.name === couponSlice.discountValue;

            const freeQuantity = isCouponProduct
              ? Math.floor(item.quantity / 2)
              : 0;
            const paidQuantity = item.quantity - freeQuantity;

            return (
              <>
                {isCouponProduct && freeQuantity > 0 && (
                  <CartItem
                    index={index}
                    key={`${index}-free`}
                    item={item}
                    quantity={freeQuantity}
                    isFree
                  />
                )}
                <CartItem
                  index={index}
                  key={index}
                  item={item}
                  quantity={paidQuantity}
                />
              </>
            );
          })
        )}
      </List>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          {couponChecker() && (
            <Typography
              sx={{ display: "flex", m: 1, justifyContent: "center" }}
              component="span"
              variant="body1"
              color="text.primary"
            >
              {couponSlice.discountType === "discount" ? (
                `Tebrikler %${couponSlice?.discountValue} indirim kazandınız !`
              ) : (
                <p>
                  <b style={{ color: "green" }}>
                    {" " + couponSlice?.discountType + " "}
                  </b>
                  kampanyasına katıldınız !
                </p>
              )}
            </Typography>
          )}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{ display: "flex", m: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Kupon Kodu:
            </Typography>
            <TextField
              disabled={couponChecker()}
              sx={{ m: 1 }}
              name="coupon"
              onChange={handleChange}
            />
            {errors.coupon && (
              <Typography
                sx={{ display: "flex", m: 1, color: "red" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {errors.coupon}
              </Typography>
            )}
          </Box>
          <Box>
            <Button disabled={couponChecker()} type={"submit"}>
              {couponChecker() ? "Kupon Uygulandı" : "Kontrol Et"}
            </Button>
          </Box>
        </Box>
      </form>
      {couponChecker() ? (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            m: 1,
          }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {"İndirimli Toplam:" + calculateTotalPrice("discount") + "$"}
        </Typography>
      ) : null}
      <Typography
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          m: 1,
          textDecoration: couponChecker() ? "line-through" : "none",
        }}
        component="span"
        variant="body2"
        color="text.primary"
      >
        {"Toplam:" + calculateTotalPrice("total") + "$"}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
        {cart.length === 0 ? (
          <Typography
            sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Sepetinize ürün ekleyin.
          </Typography>
        ) : (
          <>
            <Button sx={{ m: 1 }} variant="outlined" disabled>
              Sepeti Boşalt
            </Button>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              onClick={() => setCheckout(true)}
            >
              Satın Al
            </Button>
          </>
        )}
      </Box>
      {checkout && <Checkout open={checkout} setOpen={setCheckout} />}
    </Menu>
  );
};

export default Cart;
