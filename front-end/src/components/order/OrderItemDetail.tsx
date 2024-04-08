import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosApp from "../../customAxios";
import { ProductInterface } from "../../utils/types";
import { transformNumberToCurrency } from "../../utils/usefulMethods";

interface OrderDetailsItem {
  order_id: number;
  product_id: string;
  quantity: number;
  product: ProductInterface;
}

interface OrderItem {
  id: number;
  user_id?: number;
  status?: string;
  updated_at?: string;
  created_at?: string;
  invoice_id?: string;
}

interface OrderItemDetailProps {
  order: OrderItem;
}

const OrderItemDetail = ({ order }: OrderItemDetailProps) => {
  const [loading, setLoading] = useState(true);
  const [orderDetailsItems, setOrderDetailsItems] = useState<
    OrderDetailsItem[] | null
  >(null);

  const getOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await axiosApp.get(`/orders/${order.id}/details`);
      if (res.status === 200) {
        setOrderDetailsItems(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const total = orderDetailsItems
    ? orderDetailsItems.reduce((acc, curr) => {
        acc += curr.quantity * curr.product.price;
        return acc;
      }, 0)
    : 0;

  useEffect(() => {
    getOrderDetail();
  }, []);

  return (
    <>
      <Box p={3} py={1} mb={1} mt={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" fontWeight={700} pl={1}>
            Produto(s)
          </Typography>
          <Typography variant="body2" px={1} fontWeight={700}>
            Subtotal
          </Typography>
        </Box>
        <Box mt={1}>
          <Divider />
        </Box>
      </Box>
      <Box>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            mt={4}
            sx={{ width: "100%" }}
          >
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            {orderDetailsItems &&
              orderDetailsItems.map((item) => (
                <Box key={item.product_id}>
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
                        {`R$ ${(
                          item.product.price * item.quantity
                        ).toLocaleString("pt-BR", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={2} p={3}>
                    <Divider />
                  </Box>
                </Box>
              ))}
          </>
        )}
      </Box>
      <Box p={3} pt={1}>
        <Box display="flex" justifyContent="space-between">
          {orderDetailsItems && orderDetailsItems.length > 0 && (
            <>
              <Typography variant="subtitle1" pl={1} fontWeight={700}>
                Total Produto(s)
              </Typography>
              <Typography variant="subtitle1" px={1} fontWeight={700}>
                {`R$ ${transformNumberToCurrency(total)}`}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrderItemDetail;
