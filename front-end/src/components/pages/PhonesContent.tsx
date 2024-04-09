import ListProductsContainer from "../ListProductsContainer";
import ProductFilters from "../ProductFilters";

const PhonesContent = () => {
  const category = "phones";
  return (
    <>
      <ProductFilters category={category} />
      <ListProductsContainer category={category} />;
    </>
  );
};

export default PhonesContent;
