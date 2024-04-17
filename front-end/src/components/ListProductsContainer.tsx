import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import ProductItem from "./ProductItem";
import { clearSearchProducts, fetchProducts } from "../app/searchProductsSlice";
import { useEffect, useRef } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useLocation } from "react-router-dom";

const ListProductsContainer = ({ category }: { category?: string }) => {
  const { state } = useLocation();
  const productName = state?.productName || null; // if the request was made through the input with product name
  const hasProductName = !productName;
  const dispatch = useAppDispatch();
  const firstRender = useRef(true);
  const filters = useAppSelector((state) => state.searchProducts.filters);
  // const productName = useAppSelector((state) => state.searchProducts.name);
  const products = useAppSelector(
    (state: RootState) => state.searchProducts.products
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.searchProducts.loading
  );

  const moreFields = {
    name: productName,
    categoryName: category,
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearchProducts(hasProductName));
    };
  }, []);

  useEffect(() => {
    // prettier-ignore
    const values = firstRender.current ? (hasProductName ? moreFields: { categoryName: category || "" }) : { ...filters, ...moreFields };

    // @ts-ignore
    dispatch(fetchProducts(values));
    firstRender.current = false;
  }, [filters]);

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
