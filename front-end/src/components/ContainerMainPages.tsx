import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import { clearSearchProducts } from "../app/searchProductsSlice";

const ContainerMainPages = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearSearchProducts());
  }, [location]);

  return <Outlet />;
};

export default ContainerMainPages;
