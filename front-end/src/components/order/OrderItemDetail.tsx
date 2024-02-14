import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";

const orderDetailItems = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 2,
      name: "Mouse Logitech",
      image_url:
        "https://images.kabum.com.br/produtos/fotos/57527/57527_index_m.jpg",
      price: 85.0,
    },
  },
  {
    id: 2,
    quantity: 2,
    product: {
      id: 2,
      name: "Mouse Logitech",
      image_url:
        "https://images.kabum.com.br/produtos/fotos/57527/57527_index_m.jpg",
      price: 85.0,
    },
  },
];

const OrderItemDetail = () => {
  return (
    <>
      <Box p={3} mb={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" fontWeight={700} pl={1}>
            Produto(s)
          </Typography>
          <Typography variant="body2" px={1} fontWeight={700}>
            Total
          </Typography>
        </Box>
        <Box mt={1}>
          <Divider />
        </Box>
      </Box>
      <Grid container spacing={3}>
        {orderDetailItems &&
          orderDetailItems.map((item) => (
            <Grid item xs={12}>
              <Box display="flex" gap={5} p={3} pb={0}>
                <Box>
                  <Box
                    sx={{
                      width: 135,
                      height: 135,
                    }}
                  >
                    <img
                      src={item.product.image_url}
                      width="100%"
                      height="100%"
                    />
                  </Box>
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2">
                    Quantidade: {item.quantity}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {`R$ ${(item.product.price * item.quantity).toLocaleString(
                      "pt-BR",
                      { maximumFractionDigits: 2, minimumFractionDigits: 2 }
                    )}`}
                  </Typography>
                </Box>
              </Box>
              <Box mt={2} p={3}>
                <Divider />
              </Box>
            </Grid>
          ))}
      </Grid>
      <Box p={3} pt={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" pl={1} fontWeight={700}>
            Total Produto(s)
          </Typography>
          <Typography
            variant="subtitle1"
            px={1}
            fontWeight={700}
          >{`R$ 1800,00`}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default OrderItemDetail;
