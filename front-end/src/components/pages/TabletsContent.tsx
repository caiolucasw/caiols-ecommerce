import ListProductsContainer from "../ListProductsContainer";
import ProductFilters from "../ProductFilters";

const TabletsContent = () => {
  const category = "tablets";
  return (
    <>
      <ProductFilters category={category} />
      <ListProductsContainer category={category} />;
    </>
  );
};

export default TabletsContent;
