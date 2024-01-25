import ProductFilters from "./ProductFilters";
import ListProductsContainer from "./ListProductsContainer";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const HomeContent = () => {
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {lgScreen && <ProductFilters />}
      <ListProductsContainer />
    </>
  );
};

export default HomeContent;
