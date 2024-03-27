import { Box, CircularProgress, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { OrderItem as OrderItemInterface } from "../../utils/types";
import { useEffect, useState } from "react";
import axiosApp from "../../customAxios";
import OrderItem from "./OrderItem";

const MyOrders = () => {
  const [orders, setOrders] = useState<OrderItemInterface[] | null>(null);
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
          gap: 2.5,
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4} gap={2}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            {orders && orders.length > 0 ? (
              orders.map((order: OrderItemInterface) => (
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
