import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartItem as CartItemInterface } from "../../utils/types";

interface CartItemProps {
  item: CartItemInterface;
  updateQuantityProductCart: (
    productId: string,
    quantity: string | number,
    cartItemId: number
  ) => undefined;
}
const CartItem = ({ item, updateQuantityProductCart }: CartItemProps) => {
  const quantityNum =
    typeof item.quantity === "string" ? Number(item.quantity) : item.quantity;
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
              src={
                item.product && item.product.image_url
                  ? item.product.image_url
                  : ""
              }
              alt="product_image"
              width="180"
              height="180"
            />
          </Box>
          <Box flex={1} pt={{ xs: 0, sm: 4 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {item.product && item.product.name ? item.product.name : ""}
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
                    "&:hover": {
                      backgroundColor: "inherit",
                    },
                  }}
                  onClick={() =>
                    updateQuantityProductCart(
                      item.product_id,
                      quantityNum - 1,
                      item.id
                    )
                  }
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
                  onClick={() =>
                    updateQuantityProductCart(
                      item.product_id,
                      quantityNum + 1,
                      item.id
                    )
                  }
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
                {item.product && item.product.price
                  ? item.product.price.toLocaleString("pt-BR", {
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
