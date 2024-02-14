import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Box, IconButton, Collapse } from "@mui/material";
import { useState } from "react";
import OrderItemDetail from "./OrderItemDetail";

interface OrderItem {
  id: number;
  status: string;
  date: string;
}

interface OrderItemProps {
  order: OrderItem;
}

const statusOrder: { [key: string]: string } = {
  canceled: "Cancelado",
  done: "Concluído",
  sent: "Enviado",
};

const OrderItem = ({ order }: OrderItemProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <Box
      className="order-item"
      sx={{
        cursor: "pointer",
        border: "1px solid #ccc",
        borderBottom: "none",
      }}
      onClick={() => setOpenDetails((curr) => !curr)}
    >
      <Box
        display="flex"
        position="relative"
        justifyContent="space-between"
        py={2}
      >
        <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
          {order.id}
        </Box>
        <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
          {order.date}
        </Box>
        <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
          {statusOrder[order.status] || ""}{" "}
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            right: 5,
            top: 0,
            transform: "translateY(20%)",
          }}
        >
          {openDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={openDetails} timeout="auto" unmountOnExit>
        <OrderItemDetail />
      </Collapse>
    </Box>
  );
};

export default OrderItem;
