import {
  Box,
  Button,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ImageList from "./ImageList";
import { useLocation, useNavigate } from "react-router-dom";
import axiosApp from "../customAxios";
import { ProductInterface } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../app/store";
import { updateCartCount } from "../app/userSlice";

interface ItemInfoInterface {
  quantity: string;
}

const ProductDetails = () => {
  const [currentTab, setCurrentTab] = useState("description");
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const productId = location.pathname.replace("/product/", "");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [itemInfo, setItemInfo] = useState<ItemInfoInterface>({
    quantity: "1",
  });

  const getProductById = async (id: string) => {
    try {
      const response = await axiosApp.get(`/products/${id}`);
      if (response.status === 200 && response.data) {
        setProduct(response.data);
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  const addProductCart = async (id: string, quantity: string) => {
    try {
      const response = await axiosApp.post("/cart/products", {
        product: id,
        quantity,
      });
      if (response.status === 200 && response.data) {
        let cartItemCount = response.data.cart_items_count;
        cartItemCount = cartItemCount
          ? typeof cartItemCount === "string"
            ? Number(cartItemCount)
            : 0
          : 0;
        dispatch(updateCartCount(cartItemCount));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (productId) {
      getProductById(productId);
    }
  }, [location]);

  if (!productId) {
    return <></>;
  }

  return (
    <Box width="100%">
      <Box mb={3}>
        <Typography color="text." variant="h5" fontWeight={700}>
          {product?.name || ""}
        </Typography>
      </Box>
      <Box
        display="flex"
        gap={{ xs: 4, md: 2 }}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box flex={1} display="flex">
          {product?.product_images && (
            <ImageList productImages={product.product_images} />
          )}
        </Box>
        <Box
          sx={{
            border: "1px solid #ccc",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            maxHeight: 350,
          }}
        >
          <Typography
            variant="h5"
            color="text.primary"
            fontWeight={700}
            mt={3}
            mb={3}
          >
            R${" "}
            {product?.price
              ? product.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : ""}
          </Typography>
          <TextField
            select
            value={itemInfo.quantity}
            label="Quantidade"
            onChange={(e) =>
              setItemInfo((curr) => ({ ...curr, quantity: e.target.value }))
            }
            fullWidth
            size="small"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </TextField>
          <Box>
            <Box my={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate("/pagamento")}
              >
                Comprar
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="inherit"
                fullWidth
                onClick={() => addProductCart(productId, itemInfo.quantity)}
              >
                Adicionar ao carrinho
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={5}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            indicatorColor="primary"
            value={currentTab}
            onChange={(e, value) => setCurrentTab(value)}
          >
            <Tab value="description" label="Descrição" />
            <Tab value="details" label="Detalhes do Produto" />
          </Tabs>

          <Box p={2}>
            {currentTab === "description" && <Box>{product?.description}</Box>}
            {currentTab === "details" && <Box>{product?.description}</Box>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
