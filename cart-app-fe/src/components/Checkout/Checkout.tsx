import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import AddressForm from "../AddressForm/AddressForm";
import PaymentForm from "../PaymentForm/PaymentForm";
import CheckoutSummary from "../CheckoutSummary/CheckoutSummary";

const Checkout = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const steps = ["Teslimat", "Ödeme Bilgileri", "Önizleme"];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps: { completed?: boolean } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Siparişiniz için teşekkür ederiz.
              </Typography>
              <Typography variant="subtitle1">
                Sipariş numaranız: #2001539. Sipariş onayını e-postanıza
                gönderdik, yola çıktığında tekrar bir güncelleme göndereceğiz.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={() => setOpen(false)}>Alışverişe Dön</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
                {activeStep === 0 && (
                  <AddressForm
                    stepperForward={() => handleNext()}
                    activeStep={activeStep}
                    stepperBack={() => handleBack()}
                    steps={steps}
                  />
                )}
                {activeStep === 1 && (
                  <PaymentForm
                    stepperForward={() => handleNext()}
                    activeStep={activeStep}
                    stepperBack={() => handleBack()}
                    steps={steps}
                  />
                )}
                {activeStep === 2 && (
                  <CheckoutSummary
                    stepperForward={() => handleNext()}
                    activeStep={activeStep}
                    stepperBack={() => handleBack()}
                    steps={steps}
                  />
                )}
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;
