import { Box, Divider, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const cartItems = [1, 2, 3, 4, 5, 6];
const CartPage = () => {
  return (
    <Box width="100%">
      <Box p={2} py={0} display="flex" alignItems="center" gap={1} mb={1}>
        <ShoppingCartIcon />
        <Typography variant="h5" fontWeight={700}>
          Carrinho
        </Typography>
      </Box>

      <Box width="100%" display={{ xs: "flex" }}>
        <Box
          p={2}
          flex={1}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {cartItems &&
            cartItems.map((cart) => (
              <Box
                key={cart}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Box display="flex" gap={2}>
                  <Box
                    sx={{
                      width: 180,
                      height: 180,
                      backgroundColor: "red",
                    }}
                  ></Box>
                  <Box flex={1} display="flex" gap={3}>
                    <Box flex={1}>
                      <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Reiciendis ipsa sapiente expedita aspernatur.
                        Saepe non, totam necessitatibus architecto illum
                        doloremque.
                      </Typography>
                      <Box display="flex" gap={2} alignItems="center">
                        <Box>
                          <Box
                            display="inline-flex"
                            alignItems="center"
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
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                            <Box p={1}>
                              <Typography variant="body2">{1}</Typography>
                            </Box>
                            <IconButton
                              sx={{
                                p: 0.5,
                                borderRadius: 0,
                                "&:hover": {
                                  backgroundColor: "inherit",
                                },
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={(theme) => ({
                            cursor: "pointer",
                            color: theme.palette.error.main,
                            textDecoration: "underline",
                          })}
                        >
                          Remover
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Price
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>
                          R$ 150,00
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            p: 2,
            minWidth: 200,
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
              Resumo da Compra:
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
