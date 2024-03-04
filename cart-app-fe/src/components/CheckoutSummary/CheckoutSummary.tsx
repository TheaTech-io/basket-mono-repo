import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../redux/store";

const CheckoutSummary = ({
  stepperForward,
  stepperBack,
  activeStep,
  steps,
}: {
  stepperForward: () => void;
  stepperBack: () => void;
  activeStep: number;
  steps: Array<any>;
}) => {
  const cart = useAppSelector((state) => state.dashboardSlice.cart);

  const handleSubmit = () => {
    stepperForward();
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Sipariş Özeti
      </Typography>
      <List disablePadding>
        {cart?.map((item) => (
          <ListItem key={item.product?.name}>
            <ListItemText primary={item.product?.name} />
            <Typography variant="body2">
              {item.product.price + " TL"}
            </Typography>
            <Typography variant="body2">{"x" + item.quantity}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Toplam" />
          <Typography variant="subtitle1">{"test" + " TL"}</Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Shipping
          </Typography>
          <Typography gutterBottom>Baran Öden</Typography>
          <Typography gutterBottom>Maltepe</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            <>
              <Grid item xs={6}>
                <Typography gutterBottom>Baran Öden</Typography>
                <Typography gutterBottom>0000 0000 0000 0000</Typography>
                <Typography gutterBottom>123</Typography>
                <Typography gutterBottom>03/29</Typography>
              </Grid>
            </>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() => stepperBack()}
              sx={{ mr: 1 }}
            >
              Geri
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => handleSubmit()}>
              {activeStep === steps.length - 1 ? "Ödeme Yap" : "İleri"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CheckoutSummary;
