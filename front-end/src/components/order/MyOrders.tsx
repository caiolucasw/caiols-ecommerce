import { Box, CircularProgress, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import axiosApp from "../../customAxios";

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

interface OrderItem {
  id: number;
  user_id?: number;
  status?: string;
  updated_at?: string;
  created_at?: string;
  invoice_id?: string;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<OrderItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await axiosApp.get("/orders");
      if (res.status === 200) {
        setOrders(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <InventoryIcon />
        <Typography variant="h5" fontWeight={700}>
          Meus Pedidos
        </Typography>
      </Box>

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{
          // // "& > .order-item:first-child": {
          // //   borderTopLeftRadius: "5px",
          // //   borderTopRightRadius: "5px",
          // // },
          // "& > .order-item:last-child": {
          //   borderBottom: "1px solid #ccc !important",
          //   borderBottomLeftRadius: "5px",
          //   borderBottomRightRadius: "5px",
          // },
          gap: 1,
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4} gap={2}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            {orders && orders.length > 0 ? (
              orders.map((order: OrderItem) => (
                <OrderItem key={order.id} order={order} />
              ))
            ) : (
              <Typography variant="h5">Não há nenhum pedido.</Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyOrders;
