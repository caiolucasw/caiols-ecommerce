import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { Button, Typography, Box } from "@mui/material";
import { transformNumberToCurrency } from "../../utils/usefulMethods";
import axiosApp from "../../customAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/store";
import { updateCartCount } from "../../app/userSlice";

function CheckoutForm({ cartId, total }: { cartId: number; total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    try {
      const res = await axiosApp.post(`/cart/buy/${cartId}`);
      if (res && res.status === 200) {
        toast.success("Sua compra foi realizada com sucesso!");
        dispatch(updateCartCount(0));

        navigate("/");
      }
    } catch (err) {
      navigate("/pedido-concluido");
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
      redirect: "if_required",
    });

    if (error) {
      console.log("error");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      handleBuy();
    } else {
      console.log("some error");
    }
  };
  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      {/* Show any error or success messages */}

      <Box my={1} display="flex" justifyContent="end">
        <Typography
          variant="subtitle1"
          fontWeight={700}
        >{`Total: R$ ${transformNumberToCurrency(total)}`}</Typography>
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
      >
        Finalizar
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
