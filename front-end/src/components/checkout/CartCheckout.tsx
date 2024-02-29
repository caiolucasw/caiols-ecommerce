import { Box, Button } from "@mui/material";
import { CartItem as CartItemInterface, Step } from "../../utils/types";
import CartList from "../cart/CartList";
import TotalCart from "../TotalCart";

interface CartCheckoutProps {
  cartItems: CartItemInterface[] | null;
  handleNext: () => void;
  activeStep: number;
  steps: Step[];
  total: number;
  updateQuantityProductCart: (
    productId: string,
    quantity: number,
    cartItemId: number
  ) => Promise<void>;
}

const CartCheckout = ({
  cartItems,
  updateQuantityProductCart,
  handleNext,
  steps,
  activeStep,
  total,
}: CartCheckoutProps) => {
  if (!cartItems) return <></>;
  return (
    <>
      <CartList
        cartItems={cartItems}
        updateQuantityProductCart={updateQuantityProductCart}
      />
      <Box mb={2} p={2}>
        <TotalCart total={total} />
      </Box>
      <Box mb={2} p={2} display="flex" justifyContent="end">
        <Button variant="contained" onClick={() => handleNext()}>
          {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
        </Button>
      </Box>
    </>
  );
};

export default CartCheckout;
