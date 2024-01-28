import React from "react";
import ListProductsContainer from "./ListProductsContainer";
import ProductFilters from "./ProductFilters";

const TabletsContent = () => {
  return (
    <>
      <ProductFilters />
      <ListProductsContainer category="tablets" />;
    </>
  );
};

export default TabletsContent;
