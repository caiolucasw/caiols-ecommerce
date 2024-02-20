import { CartItem as CartItemInterface } from "../../utils/types";
import CartList from "../cart/CartList";

interface CartCheckoutProps {
  cartItems: CartItemInterface[] | null;
  updateQuantityProductCart: (
    productId: string,
    quantity: number,
    cartItemId: number
  ) => Promise<void>;
}

const CartCheckout = ({
  cartItems,
  updateQuantityProductCart,
}: CartCheckoutProps) => {
  if (!cartItems) return <></>;
  return (
    <>
      <CartList
        cartItems={cartItems}
        updateQuantityProductCart={updateQuantityProductCart}
      />
    </>
  );
};

export default CartCheckout;
