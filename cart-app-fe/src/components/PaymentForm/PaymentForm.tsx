import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setLoading, setPayment } from "../../pages/Dashboard/store/slice";

const PaymentForm = ({
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
  const dispatch = useDispatch();
  const { handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: {
      cardHolder: "",
      cardNumber: "",
      cvv: "",
      expDate: "",
    },
    validationSchema: Yup.object({
      cardHolder: Yup.string().required("Kart sahibi zorunludur"),
      cardNumber: Yup.string().required("Kart numarası zorunludur"),
      cvv: Yup.string().required("Cvv zorunludur"),
      expDate: Yup.string().required("Son kullanma tarihi zorunludur"),
    }),
    onSubmit: (values) => {
      dispatch(setPayment(values));
      stepperForward();
    },
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Ödeme Bilgileri
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cardNumber"
            name="cardNumber"
            label="Kart Numarası"
            fullWidth
            onChange={handleChange}
          />
          {errors.cardNumber && touched.cardNumber && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errors.cardNumber}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cardHolder"
            name="cardHolder"
            label="Kart Sahibi"
            fullWidth
            onChange={handleChange}
          />
          {errors.cardHolder && touched.cardHolder && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errors.cardHolder}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="expDate"
            name="expDate"
            label="SKT"
            fullWidth
            onChange={handleChange}
          />
          {errors.expDate && touched.expDate && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errors.expDate}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Kartın arkasındaki üç haneli sayı"
            fullWidth
            onChange={handleChange}
          />
          {errors.cvv && touched.cvv && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errors.cvv}
            </Typography>
          )}
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
    </>
  );
};

export default PaymentForm;
