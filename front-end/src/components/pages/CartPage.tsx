import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Cart, CartItem as CartItemInterface } from "../../utils/types";
import CartItem from "../cart/CartItem";
import { updateCartCount } from "../../app/userSlice";

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const cartItems = cart?.cart_items || null;
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const getCartItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

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
    if (!cartItems || cartItems.length <= 0) return 0;

    setTotal(
      cartItems.reduce((acc, curr) => {
        acc += curr.quantity * curr.product.price;
        return acc;
      }, 0)
    );
  };

  const updateItemQuantityState = (itemId: number, quantity: number) => {
    if (!cart || !cartItems) return;

    const cartItemsAux = [...cartItems];

    const itemIndex = cartItemsAux.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    cartItemsAux[itemIndex].quantity = quantity;

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

    dispatch(updateCartCount(quantity));
  };

  const updateQuantityProductCart = async (
    productId: string,
    quantity: number,
    cartItemId: number
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/cart/products`,
        {
          product: productId,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(quantity);
      if (response.status === 200 && response.data) {
        updateItemQuantityState(cartItemId, quantity);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.token) getCartItems();
  }, [user]);

  // recalculate total
  useEffect(() => {
    if (cart && cart.cart_items) {
      getTotalPrice(cart.cart_items);
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
          <Box p={2} flex={1} display="flex" flexDirection="column" gap={2}>
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  item={item}
                  updateQuantityProductCart={updateQuantityProductCart}
                />
              ))}
          </Box>
        )}
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
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
