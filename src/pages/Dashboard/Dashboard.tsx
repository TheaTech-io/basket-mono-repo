import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import MiniCard from "../../components/MiniCard/MiniCard";
import { useDispatch } from "react-redux";
import { dashboardTypes } from "./store/type";
import { useAppSelector } from "../../redux/store";

const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const products = useAppSelector((state) => state.dashboardSlice.products);

  useEffect(() => {
    dispatch({ type: dashboardTypes.GET_PRODUCTS });
  }, []);

  return (
    <Grid
      container
      sx={{ mt: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
    >
      <Grid
        item
        sm={12}
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {products.map(
          (
            item: {
              id: number;
              name: string;
              price: number;
              stock: number;
            },
            index: number
          ) => {
            return <MiniCard key={item.id + index} item={item} />;
          }
        )}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
