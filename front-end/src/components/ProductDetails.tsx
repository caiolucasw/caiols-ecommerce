import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ImageList from "./ImageList";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector, RootState } from "../app/store";
import axios from "axios";
import { ProductInterface } from "../utils/types";
// import { fetchProduct } from "../app/searchProductsSlice";

const ProductDetails = () => {
  const [currentTab, setCurrentTab] = useState("description");
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const productId = location.pathname.replace("/product/", "");
  // const product = useAppSelector(
  //   (state: RootState) => state.searchProducts.selectedProduct
  // );

  const getProductById = async (id: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/products/${id}`
      );
      if (response.status === 200 && response.data) {
        setProduct(response.data);
      }

      return response.data ? (response.data as ProductInterface) : null;
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
      <Box display="flex" gap={2} flexDirection={{ xs: "column", md: "row" }}>
        <Box flex={1} display="flex">
          <ImageList />
        </Box>
        <Box
          sx={{
            border: "1px solid #ccc",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
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
          <Select value={1} label="Quantidade" fullWidth size="small">
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
          <Box>
            <Box my={2}>
              <Button variant="contained" color="primary" fullWidth>
                Comprar
              </Button>
            </Box>
            <Box>
              <Button variant="contained" color="inherit" fullWidth>
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
