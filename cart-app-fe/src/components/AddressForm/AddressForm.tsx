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
import { setShipment } from "../../pages/Dashboard/store/slice";

const AddressForm = ({
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
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      district: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("İsim zorunludur"),
      lastName: Yup.string().required("Soyisim zorunludur"),
      address: Yup.string().required("Adres zorunludur"),
      city: Yup.string().required("Şehir zorunludur"),
      district: Yup.string().required("Semt/Mahalle zorunludur"),
    }),
    onSubmit: (values) => {
      stepperForward();
      dispatch(setShipment(values));
    },
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Teslimat Adresi
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="İsim"
            fullWidth
            autoComplete="given-name"
            onChange={handleChange}
          />
          {errors.firstName && touched.firstName && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errors.firstName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Soyisim"
            fullWidth
            autoComplete="family-name"
            onChange={handleChange}
          />
          {errors.lastName && touched.lastName && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errors.lastName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Adres"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={handleChange}
          />
          {errors.address && touched.address && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errors.address}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            name="city"
            label="Şehir"
            fullWidth
            autoComplete="city"
            onChange={handleChange}
          />
          {errors.city && touched.city && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errors.city}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="district"
            name="district"
            label="Semt/Mahalle"
            fullWidth
            onChange={handleChange}
          />
          {errors.district && touched.district && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errors.district}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Fatura için bu adresi kullan"
          />
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

export default AddressForm;
