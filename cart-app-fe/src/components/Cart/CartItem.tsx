import {
  Box,
  Button,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { dashboardTypes } from "../../pages/Dashboard/store/type";
import { useAppSelector } from "../../redux/store";

const CartItem = ({
  index,
  item,
  quantity,
  isFree = false,
}: {
  index: number;
  item: {
    product: {
      id: number;
      name: string;
      price: number;
      stock: number;
    };
  };
  quantity: number;
  isFree?: boolean;
}) => {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.dashboardSlice.cart);
  return (
    <>
      <ListItem alignItems="center">
        <ListItemText
          primary={item.product.name + (isFree ? " (Free)" : "")}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.product.price + "$"}
              </Typography>
            </>
          }
        />
        {!isFree && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              size={"small"}
              onClick={() =>
                dispatch({
                  type: dashboardTypes.DELETE_FROM_CART,
                  payload: {
                    userId: "0",
                    productId: item.product.id.toString(),
                    quantity: 1,
                  },
                })
              }
            >
              -
            </Button>
            <Button
              size={"small"}
              onClick={() =>
                dispatch({
                  type: dashboardTypes.ADD_TO_CART,
                  payload: {
                    userId: "0",
                    productId: item.product.id.toString(),
                    quantity: 1,
                  },
                })
              }
            >
              +
            </Button>
            <Typography variant="body2">x{cart[index].quantity}</Typography>
          </Box>
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CartItem;
