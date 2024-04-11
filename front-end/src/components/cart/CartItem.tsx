import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  CartItem as CartItemInterface,
  ProductInterface,
} from "../../utils/types";
import { useAppSelector } from "../../app/store";

interface CartItemProps {
  item: CartItemInterface | (ProductInterface & { quantity?: number });
  updateQuantityProductCart: (
    productId: string,
    quantity: number,
    cartItemId: number
  ) => Promise<void>;
  updateQuantityProductCartNotLogged: (
    productId: string,
    quantity: number
  ) => void;
}

// Type guard to theck if the obj is of type CartItemInterface
function isMyCartItemInterface(obj: any): obj is CartItemInterface {
  return "cart_id" in obj;
}
// -----------------------------------------------------------------

const CartItem = ({
  item,
  updateQuantityProductCart,
  updateQuantityProductCartNotLogged,
}: CartItemProps) => {
  const user = useAppSelector((state) => state.user);
  const isUserLoggedIn = !!user?.token;
  const product = isMyCartItemInterface(item) ? item.product : item;
  const quantity = isMyCartItemInterface(item)
    ? item.quantity
    : product?.quantity;
  const quantityNum =
    typeof quantity === "string" ? Number(item.quantity) : item.quantity || 0;
  return (
    <Box
      key={item.id}
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        px: 4,
        py: 2,
      }}
    >
      <Box display="flex" gap={2} flexDirection={{ xs: "column", md: "row" }}>
        <Box
          display="flex"
          gap={{ xs: 1, sm: 3 }}
          flex={1}
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "start" }}
        >
          <Box
            sx={{
              width: 180,
              height: 180,
              backgroundColor: "red",
            }}
          >
            <img
              src={product && product.image_url ? product.image_url : ""}
              alt="product_image"
              width="180"
              height="180"
            />
          </Box>
          <Box flex={1} pt={{ xs: 0, sm: 4 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {product && product.name ? product.name : ""}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          gap={8}
          justifyContent="space-between"
          pt={{ xs: 0, md: 4 }}
        >
          <Box display="flex" gap={1} flexDirection="column">
            <Box>
              <Box
                display="inline-flex"
                sx={{
                  backgroundColor: "#ccc",
                }}
              >
                <IconButton
                  sx={{
                    p: 0.5,
                    borderRadius: 0,
                    ...(quantityNum <= 1 && { cursor: "not-allowed" }),
                    "&:hover": {
                      backgroundColor: "inherit",
                    },
                  }}
                  onClick={() => {
                    if (quantityNum > 0) {
                      if (isUserLoggedIn) {
                        updateQuantityProductCart(
                          product.id,
                          quantityNum - 1 || 0,
                          item.id as number
                        );
                      } else {
                        updateQuantityProductCartNotLogged(
                          product.id,
                          quantityNum - 1 || 0
                        );
                      }
                    }
                  }}
                  disabled={quantityNum <= 1}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Box p={1}>
                  <Typography variant="body2">{item.quantity}</Typography>
                </Box>
                <IconButton
                  sx={{
                    p: 0.5,
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "inherit",
                    },
                  }}
                  onClick={() => {
                    if (isUserLoggedIn) {
                      updateQuantityProductCart(
                        product.id,
                        quantityNum + 1,
                        item.id as number
                      );
                    } else {
                      updateQuantityProductCartNotLogged(
                        product.id,
                        quantityNum + 1 || 0
                      );
                    }
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={(theme) => ({
                cursor: "pointer",
                color: theme.palette.error.main,
                textDecoration: "underline",
                ml: 1,
              })}
              onClick={() => {
                if (isUserLoggedIn) {
                  updateQuantityProductCart(product.id, 0, item.id as number);
                } else {
                  updateQuantityProductCartNotLogged(product.id, 0);
                }
              }}
            >
              Remover
            </Typography>
          </Box>

          <Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                Price
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                {"R$ "}
                {product && product.price
                  ? product.price.toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })
                  : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
