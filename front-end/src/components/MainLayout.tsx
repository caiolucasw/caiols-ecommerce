import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import { fetchProducts } from "../app/searchProductsSlice";
import ProductFilters from "./ProductFilters";
import ListProductsContainer from "./ListProductsContainer";

const MainLayout = () => {
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, []);

  return (
    <>
      {lgScreen && <ProductFilters />}
      <Outlet />
    </>
  );
};

export default MainLayout;
