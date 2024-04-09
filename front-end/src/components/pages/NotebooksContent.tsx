import ListProductsContainer from "../ListProductsContainer";
import ProductFilters from "../ProductFilters";

const NotebooksContent = () => {
  const category = "laptops";
  return (
    <>
      <ProductFilters category={category} />
      <ListProductsContainer category={category} />;
    </>
  );
};

export default NotebooksContent;
