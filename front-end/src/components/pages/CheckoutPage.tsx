import {
  Box,
  Collapse,
  Container,
  IconButton,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentPage from "../stripe/PaymentPage";
import CartCheckout from "../checkout/CartCheckout";
import axiosApp from "../../customAxios";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Cart, CartItem as CartItemInterface } from "../../utils/types";
import { updateCartCount } from "../../app/userSlice";
import CartAddresses from "../checkout/CartAddresses";

const steps = [
  {
    id: 0,
    label: "Carrinho",
    value: "cart-checkout",
  },
  {
    id: 1,
    label: "Entrega",
    value: "address",
  },
  {
    id: 2,
    label: "Pagamento",
    value: "payment",
  },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const activeValue = steps[steps.findIndex((step) => step.id === activeStep)];
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useState<Cart | null>(null);
  const [total, setTotal] = useState(0);
  const cartItems = cart?.cart_items || null;
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const getCartItems = async () => {
    setLoading(true);
    try {
      const res = await axiosApp.get("/cart");

      if (res && res.status === 200) {
        setCart(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getTotalPrice = (
    cartItems: CartItemInterface[]
  ): number | undefined => {
    if (!cartItems || cartItems.length <= 0) {
      setTotal(0);
      return;
    }

    setTotal(
      cartItems.reduce((acc, curr) => {
        acc += curr.quantity * curr.product.price;
        return acc;
      }, 0)
    );
  };

  const updateItemQuantityState = (
    itemId: number,
    quantity: number,
    totalQuantity: number
  ) => {
    if (!cart || !cartItems) return;

    let cartItemsAux = [...cartItems];

    // Remove item from cart
    if (quantity <= 0) {
      cartItemsAux.filter((item) => item.id !== itemId);
    } else {
      // Update quantity
      const itemIndex = cartItemsAux.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) return;

      cartItemsAux[itemIndex].quantity = quantity;
    }

    setCart((curr) => {
      if (curr) {
        return {
          ...curr,
          cart_items: cartItemsAux,
        };
      } else {
        return null;
      }
    });

    dispatch(updateCartCount(totalQuantity));
  };

  const updateQuantityProductCart = async (
    productId: string,
    quantity: number,
    cartItemId: number
  ) => {
    try {
      const response = await axiosApp.post("/cart/products", {
        product: productId,
        quantity,
      });

      if (response.status === 200 && response.data) {
        let cartItemCount = response.data.cart_items_count;
        cartItemCount = cartItemCount
          ? typeof cartItemCount === "string"
            ? Number(cartItemCount)
            : 0
          : 0;
        updateItemQuantityState(cartItemId, quantity, cartItemCount);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.token) getCartItems();
  }, [user]);

  // recalculate total
  useEffect(() => {
    if (cart) {
      getTotalPrice(cart.cart_items || []);
    }
  }, [cart]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 2,
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        my={2}
        mb={6}
        sx={{
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <Typography fontWeight={600} variant="h4">
          Caio.
          <Typography
            variant="inherit"
            sx={{
              display: "inline-block",
              color: "var(--primary-color)",
            }}
          >
            ls
          </Typography>
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        gap={4}
      >
        <Stepper
          nonLinear
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepConnector-root": {
              flex: "1 1 auto",
              WebkitFlex: "1 1 auto",
            },
          }}
        >
          {steps.map((step) => (
            <Step
              key={step.id}
              completed={completed[step.id]}
              sx={{
                "& .MuiStepLabel-alternativeLabel": {
                  fontWeight: 700,
                },
              }}
            >
              <StepButton color="inherit">{step.label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Box display="flex">
          <Box mt={3} display="flex" flexDirection="column" flex={1}>
            {steps.map((step) => (
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #ccc",
                  ...(activeValue && activeValue.id >= step.id
                    ? {
                        cursor: "pointer",
                      }
                    : {
                        cursor: "not-allowed",
                        opacity: 0.5,
                      }),
                  position: "relative",
                }}
                onClick={() => {
                  if (activeValue && activeValue.id > step.id) {
                    handleBack();
                  }
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 5,
                    top: 0,
                    transform: "translateY(20%)",
                  }}
                >
                  {activeValue && activeValue.id === step.id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
                <Typography variant="subtitle1" fontWeight={700} mb={3}>
                  {step.label}
                </Typography>
                <Collapse
                  in={activeValue && activeValue.id === step.id}
                  timeout="auto"
                  unmountOnExit
                >
                  {activeValue.value === "cart-checkout" && (
                    <CartCheckout
                      cartItems={cartItems}
                      updateQuantityProductCart={updateQuantityProductCart}
                      handleNext={handleNext}
                      steps={steps}
                      activeStep={activeStep}
                      total={total}
                    />
                  )}
                  {activeValue.value === "address" && (
                    <CartAddresses handleNext={handleNext} />
                  )}
                  {activeValue.value === "payment" && cart && cart.id && (
                    <PaymentPage cartId={cart.id} total={total} />
                  )}
                </Collapse>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
