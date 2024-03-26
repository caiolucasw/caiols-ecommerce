import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Box, IconButton, Collapse, Typography } from "@mui/material";
import { useState } from "react";
import OrderItemDetail from "./OrderItemDetail";
import { formatDate } from "../../utils/formatString";
import axiosApp from "../../customAxios";

interface OrderItem {
  id: number;
  user_id?: number;
  status?: string;
  updated_at?: string;
  created_at?: string;
  invoice_id?: string;
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
        boxShadow: 1,
        borderRadius: 2,
        pt: 1,
        px: 0.5,
      }}
      onClick={() => setOpenDetails((curr) => !curr)}
    >
      <Box display="flex" justifyContent="space-between" position="relative">
        <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight={700}>
            NÚMERO DO PEDIDO
          </Typography>
        </Box>
        <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight={700}>
            DATA
          </Typography>
        </Box>
        <Box width={{ xs: 1 / 3 }} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight={700}>
            STATUS
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
          <Typography variant="body1">
            {" "}
            {(order?.status && statusOrder[order?.status]) || ""}{" "}
          </Typography>
        </Box>
      </Box>
      <Collapse in={openDetails} timeout="auto" unmountOnExit sx={{ px: 1.2 }}>
        <OrderItemDetail order={order} />
      </Collapse>
    </Box>
  );
};

export default OrderItem;
