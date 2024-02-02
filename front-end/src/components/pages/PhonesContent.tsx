import ListProductsContainer from "../ListProductsContainer";
import ProductFilters from "../ProductFilters";

const PhonesContent = () => {
  return (
    <>
      <ProductFilters />
      <ListProductsContainer category="phones" />;
    </>
  );
};

export default PhonesContent;
