import CartItem from "../cart/CartItem";
import { Cart, CartItem as CartItemInterface } from "../../utils/types";
import { Box, Typography } from "@mui/material";

interface CartCheckoutProps {
  cartItems: CartItemInterface[] | null;
  updateQuantityProductCart: (
    productId: string,
    quantity: number,
    cartItemId: number
  ) => Promise<void>;
}

const CartList = ({
  cartItems,
  updateQuantityProductCart,
}: CartCheckoutProps) => {
  return (
    <Box p={2} flex={1} display="flex" flexDirection="column" gap={2}>
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem
            item={item}
            updateQuantityProductCart={updateQuantityProductCart}
            key={item.id}
          />
        ))
      ) : (
        <Box mt={2}>
          <Typography variant="h6" fontWeight={700}>
            Não há itens em seu carrinho!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CartList;
