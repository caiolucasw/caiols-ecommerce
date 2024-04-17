import { getCartItemLS } from "./usefulMethods";

// method to update the quantity of a cart_item in localStorage
export const updateQuantityProductsLocalStorage = (
  productId: string,
  quantity: number,
  increment?: boolean
) => {
  const newItem = { product: productId, quantity: quantity };
  let cartItems = getCartItemLS();

  const indexEl = cartItems.findIndex((item) => item.product === productId);

  // check if the element is already in the cart
  if (indexEl !== -1) {
    if (quantity > 1) {
      cartItems[indexEl] = {
        ...cartItems[indexEl],
        quantity: increment ? cartItems[indexEl].quantity + quantity : quantity,
      };
    } else {
      cartItems = cartItems.filter((item) => item.product !== productId);
    }
  } else {
    cartItems.push(newItem);
  }

  const cartCount = cartItems.reduce((acc, value) => acc + value.quantity, 0);

  // update or remove the cart_items value of localStorage depending on the cartCount
  if (cartCount > 0) {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  } else {
    localStorage.removeItem("cart_items");
  }
  return cartCount;
};
