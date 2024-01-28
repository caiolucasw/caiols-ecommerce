import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

import ProductItem from "./ProductItem";
import { fetchProducts } from "../app/searchProductsSlice";
import { ProductInterface } from "../utils/types";
import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

interface InterfaceProps {
  products: ProductInterface[];
}

const ListProductsContainer = ({ category }: { category?: string }) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.searchProducts.products
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.searchProducts.loading
  );

  useEffect(() => {
    const categoryName = category || "";
    dispatch(fetchProducts({ category_name: categoryName }));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Grid container spacing={2}>
          {isLoading ? (
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
          ) : (
            <>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                    <ProductItem product={product} />
                  </Grid>
                ))
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  gap={1}
                  mt={3}
                  fontWeight={700}
                >
                  <Typography variant="h5" fontWeight={700}>
                    Nenhum produto encontrado para esses filtros.
                  </Typography>
                  <SentimentVeryDissatisfiedIcon />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListProductsContainer;
