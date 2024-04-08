import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Box, IconButton, Collapse, Typography, Chip } from "@mui/material";
import { useState } from "react";
import { OrderItem as OrderItemInterface } from "../../utils/types";
import OrderItemDetail from "./OrderItemDetail";
import { formatDate } from "../../utils/formatString";

interface OrderItemProps {
  order: OrderItemInterface;
}

const statusOrder: {
  [key: string]: { label: string; type: "success" | "info" | "error" };
} = {
  canceled: { label: "Cancelado", type: "error" },
  completed: { label: "Concluído", type: "success" },
  pending: { label: "Em andamento", type: "info" },
};

const OrderItem = ({ order }: OrderItemProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  const status = statusOrder[order.status];

  return (
    <Box
      className="order-item"
      sx={{
        cursor: "pointer",
        border: "1px solid #ccc",
        boxShadow: 1,
        borderRadius: 2,
      }}
      onClick={() => setOpenDetails((curr) => !curr)}
    >
      <Box
        sx={{
          pt: 1,
          px: 0.5,
          ...(openDetails && { backgroundColor: "rgba(0,0,0, 0.075)" }),
        }}
      >
        <Box display="flex" justifyContent="space-between" position="relative">
          <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight={700}>
              Número do Pedido
            </Typography>
          </Box>
          <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight={700}>
              Data
            </Typography>
          </Box>
          <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight={700}>
              Status
            </Typography>
          </Box>
          <IconButton
            sx={{
              position: "absolute",
              right: 5,
              top: "-18px",
              transform: "translateY(20%)",
            }}
          >
            {openDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Box
          display="flex"
          position="relative"
          justifyContent="space-between"
          py={2}
        >
          <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
            <Typography variant="body1">{order.id} </Typography>
          </Box>
          <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
            <Typography variant="body1">
              {order.created_at ? formatDate(order.created_at) : ""}
            </Typography>
          </Box>
          <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
            {status && (
              <Chip
                label={
                  <Typography variant="caption">{status.label}</Typography>
                }
                color={status.type}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Collapse in={openDetails} timeout="auto" unmountOnExit sx={{ px: 1.2 }}>
        <OrderItemDetail order={order} />
      </Collapse>
    </Box>
  );
};

export default OrderItem;
