import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, CardMedia, Chip, Grid } from "@mui/material";
import { dashboardTypes } from "../../pages/Dashboard/store/type";
import { useDispatch } from "react-redux";
import noImage from "../../assets/No-Cover-Image-01.png";

const MiniCard = ({
  item,
}: {
  item: { id: number; name: string; price: number; stock: number };
}) => {
  const dispatch = useDispatch();
  return (
    <Grid
      item
      sx={{
        width: 350,
        margin: 1,
        boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
        border: "none",
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          border: "none",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CardMedia
            component="img"
            image={noImage}
            sx={{ width: "140px !important", cursor: "pointer" }}
            height="200"
          />
          <Box
            sx={{
              p: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              component="div"
              variant="h5"
              sx={{ fontWeight: 500, fontSize: 18, cursor: "pointer" }}
            >
              {item.name}
            </Typography>
            <Chip
              sx={{ cursor: "pointer" }}
              label={"Stok Durumu: " + item.stock}
              variant="outlined"
              onClick={() => {
                dispatch({
                  type: dashboardTypes.ADD_TO_CART,
                  payload: {
                    userId: "0",
                    productId: item.id.toString(),
                    quantity: 1,
                  },
                });
              }}
            />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {item.price + "$"}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default MiniCard;
