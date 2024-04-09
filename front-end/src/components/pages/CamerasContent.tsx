import ListProductsContainer from "../ListProductsContainer";
import ProductFilters from "../ProductFilters";

const CamerasContent = () => {
  const category = "cameras";
  return (
    <>
      <ProductFilters category={category} />
      <ListProductsContainer category={category} />
    </>
  );
};

export default CamerasContent;
