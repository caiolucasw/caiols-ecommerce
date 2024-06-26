import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import axiosApp from "../../customAxios";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  CartItem as CartItemInterface,
  CartItemNotLogged,
  ProductInterface,
} from "../../utils/types";
import { updateCartCount } from "../../app/userSlice";
import { useNavigate } from "react-router-dom";
import CartList from "../cart/CartList";
import { updateQuantityProductsLocalStorage } from "../../utils/user";
import { getCartItemLS } from "../../utils/usefulMethods";

const CartPage = () => {
  const [cart, setCart] = useState<any>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const cartItems = cart?.cart_items || null;
  const user = useAppSelector((state) => state.user);
  const isUserLoggedIn = !!user.token;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // get cart items products from multiple products_ids passed to the request body
  const getCartItemsProducts = async (products: CartItemNotLogged[]) => {
    setLoading(true);
    const product_ids = products.map((item) => item.product).join(",");
    try {
      const res = await axiosApp.post("/products/ids", {
        products: product_ids,
      });

      if (res && res.status === 200) {
        const productsData = (res?.data?.data as ProductInterface[]) || [];
        const cartItemsAux = productsData.map((prod) => {
          const index = products.findIndex((p) => p.product === prod.id);
          return { ...prod, quantity: products[index].quantity };
        });
        setCart({ cart_items: cartItemsAux });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
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
    cartItems: (CartItemInterface & { price?: number })[]
  ): number | undefined => {
    if (!cartItems || cartItems.length <= 0) {
      setTotal(0);
      return;
    }
    setTotal(
      cartItems.reduce((acc, curr) => {
        acc += curr.quantity * (curr?.product?.price || curr?.price || 0);
        return acc;
      }, 0)
    );
  };

  const updateItemQuantityState = (
    itemId: number | string,
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

    setCart((curr: any) => {
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

  const updateCartItemsNotLogged = (itemId: string, quantity: number) => {
    const cartItemsAux = updateItemQuantityStateNotLogged(itemId, quantity);

    setCart((curr: any) => {
      if (curr) {
        return {
          ...curr,
          cart_items: [...(cartItemsAux as any[])],
        };
      } else {
        return null;
      }
    });

    const cartCount =
      cartItemsAux?.reduce((acc, value) => acc + value.quantity, 0) || 0;
    dispatch(updateCartCount(cartCount));
  };
  const updateItemQuantityStateNotLogged = (
    itemId: string,
    quantity: number
  ) => {
    if (!cartItems) return;

    let cartItemsAux = [...cartItems];

    // Remove item from cart
    if (quantity <= 0) {
      cartItemsAux = cartItemsAux.filter((item) => item.id !== itemId);
    } else {
      // Update quantity
      const itemIndex = cartItemsAux.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) return;

      cartItemsAux[itemIndex].quantity = quantity;
    }

    updateQuantityProductsLocalStorage(itemId, quantity);
    return cartItemsAux;
  };

  const updateQuantityProductCart = async (
    productId: string,
    quantity: number,
    cartItemId: number
  ) => {
    console.log(quantity);
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
    if (!user.token) {
      const cartItemsLS = getCartItemLS();
      getCartItemsProducts(cartItemsLS);
    }
  }, []);

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
    <Box width="100%">
      <Box p={2} py={0} display="flex" alignItems="center" gap={1} mb={1}>
        <ShoppingCartIcon />
        <Typography variant="h5" fontWeight={700}>
          Carrinho
        </Typography>
      </Box>

      <Box
        width="100%"
        display={{ xs: "flex" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        {loading ? (
          <Box
            p={2}
            flex={1}
            width="100%"
            display="flex"
            justifyContent="center"
            mt={4}
            gap={2}
          >
            <CircularProgress size={60} />
          </Box>
        ) : (
          <CartList
            cartItems={cartItems}
            updateQuantityProductCart={updateQuantityProductCart}
            updateQuantityProductCartNotLogged={updateCartItemsNotLogged}
          />
        )}

        {cartItems && cartItems.length > 0 && (
          <Box
            sx={{
              p: 2,
              minWidth: { md: 240, lg: 350 },
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                border: "1px solid #ccc",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                Resumo da Compra
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              {loading ? (
                <Box
                  p={2}
                  flex={1}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  gap={2}
                >
                  <CircularProgress size={50} />
                </Box>
              ) : (
                <Box display="flex" gap={3} flexDirection="column">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" fontWeight={500}>
                      Total:
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {"R$ "}
                      {total.toLocaleString("pt-BR", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (isUserLoggedIn) {
                        navigate("/checkout");
                      } else {
                        navigate("/login", { state: { cartBuy: 1 } });
                      }
                    }}
                  >
                    Comprar
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
