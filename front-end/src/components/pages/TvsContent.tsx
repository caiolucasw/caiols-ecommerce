import ListProductsContainer from "../ListProductsContainer";
import ProductFilters from "../ProductFilters";

const TvsContent = () => {
  const category = "tvs";
  return (
    <>
      <ProductFilters category={category} />
      <ListProductsContainer category={category} />;
    </>
  );
};

export default TvsContent;
