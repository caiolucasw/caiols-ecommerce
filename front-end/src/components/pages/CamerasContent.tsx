import ListProductsContainer from "../ListProductsContainer";
import ProductFilters from "../ProductFilters";

const CamerasContent = () => {
  return (
    <>
      <ProductFilters />
      <ListProductsContainer category="cameras" />;
    </>
  );
};

export default CamerasContent;
