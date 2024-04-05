import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import { clearSearchProducts } from "../app/searchProductsSlice";

const ContainerMainPages = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(clearSearchProducts());
    console.log("teste");
  }, [location]);

  return <Outlet />;
};

export default ContainerMainPages;
