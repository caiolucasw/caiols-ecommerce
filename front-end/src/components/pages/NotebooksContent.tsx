import ListProductsContainer from "../ListProductsContainer";
import ProductFilters from "../ProductFilters";

const NotebooksContent = () => {
  return (
    <>
      <ProductFilters />
      <ListProductsContainer category="laptops" />;
    </>
  );
};

export default NotebooksContent;
