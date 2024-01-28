import ListProductsContainer from "./ListProductsContainer";
import ProductFilters from "./ProductFilters";

const TvsContent = () => {
  return (
    <>
      <ProductFilters />
      <ListProductsContainer category="tvs" />;
    </>
  );
};

export default TvsContent;
