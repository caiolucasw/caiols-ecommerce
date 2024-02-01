import { Box } from "@mui/material";
import React from "react";

const OrderItemDetail = () => {
  return (
    <Box display="flex" gap={2} p={2}>
      <Box>Product Image</Box>
      <Box flex={1}>Product Content</Box>
    </Box>
  );
};

export default OrderItemDetail;
