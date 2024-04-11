import { CartItemLS } from "./types";

export const transformNumberToCurrency = (
  num: number,
  countryFormat = "pt-BR"
) => {
  return num.toLocaleString(countryFormat, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

// get cart items from localStorage
export const getCartItemLS = (): CartItemLS[] => {
  const productsCountStr = localStorage.getItem("cart_items");
  const products: CartItemLS[] = productsCountStr
    ? JSON.parse(productsCountStr)
    : [];

  return products;
};
