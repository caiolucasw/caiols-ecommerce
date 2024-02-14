import { Box, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import OrderItem from "./OrderItem";

const orders: OrderItemInterface[] = [
  {
    id: 1,
    status: "canceled",
    date: "27/02/2023",
  },
  {
    id: 2,
    status: "sent",
    date: "11/02/2023",
  },
  {
    id: 3,
    status: "done",
    date: "12/05/2020",
  },
  {
    id: 4,
    status: "sent",
    date: "10/09/2019",
  },
  {
    id: 5,
    status: "done",
    date: "23/11/2018",
  },
];

interface OrderItemInterface {
  id: number;
  status: string;
  date: string;
}

const MyOrders = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <InventoryIcon />
        <Typography variant="h5" fontWeight={700}>
          Meus Pedidos
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
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
      </Box>

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{
          "& > .order-item:last-child": {
            borderBottom: "1px solid #ccc !important",
          },
        }}
      >
        {orders && orders.length > 0 ? (
          orders.map((order: OrderItemInterface) => (
            <OrderItem key={order.id} order={order} />
          ))
        ) : (
          <Typography variant="h5">Não há nenhum pedido.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyOrders;
