import { Box, Grid } from "@mui/material";

import ProductItem from "./ProductItem";
import { fetchProducts } from "../app/searchProductsSlice";
import { ProductInterface } from "../utils/types";
import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";

interface InterfaceProps {
  products: ProductInterface[];
}

const ListProductsContainer = ({ category }: { category?: string }) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.searchProducts.products
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
          {products &&
            products.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <ProductItem product={product} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListProductsContainer;
