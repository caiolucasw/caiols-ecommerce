import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axiosApp from "../../customAxios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Box, CircularProgress } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51IXRdQECw79QhUt21oqnl2beME6z0mqOozFdRwv5GAx91HnkzYenH4z0bViBjivj6PvLJEllWcuqoRCYXdqMIHVO00Gk0UzPUs"
);

const PaymentPage = ({ cartId }: { cartId: number }) => {
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
          {clientSecret && cartId && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm cartId={cartId} />
            </Elements>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;
