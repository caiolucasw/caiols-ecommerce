import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axiosApp from "../../customAxios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51IXRdQECw79QhUt21oqnl2beME6z0mqOozFdRwv5GAx91HnkzYenH4z0bViBjivj6PvLJEllWcuqoRCYXdqMIHVO00Gk0UzPUs"
);

const PaymentPage = ({ cartId, total }: { cartId: number; total: number }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const createPaymentIntent = async () => {
    setLoading("payment-intent");
    try {
      const res = await axiosApp.post(`/payment-intent/${cartId}`);
      if (res?.data && res?.data?.clientSecret) {
        setClientSecret(res?.data.clientSecret);
      }
      setLoading(null);
    } catch (err) {
      console.log(err);
      setLoading(null);
    }
  };

  const appearance: { theme: "stripe" | "night" | "flat" } = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  return (
    <Box id="payment-page" display="flex" justifyContent="center">
      {loading === "payment-intent" ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Box p={1}>
          <Alert
            variant="filled"
            color="warning"
            sx={{
              p: 2,
              mb: 2,
            }}
          >
            Este método de pagamento é apenas para testes. Portanto,
            <Typography
              variant="inherit"
              fontWeight={700}
              display="inline-block"
            >
              &nbsp;nada será cobrado.
            </Typography>
            <Box>
              Use o número de cartão:{" "}
              <Typography
                variant="inherit"
                fontWeight={700}
                display="inline-block"
              >
                4242 4242 4242 4242
              </Typography>
            </Box>
          </Alert>
          {clientSecret && cartId && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm cartId={cartId} total={total} />
            </Elements>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;
