import { Box, CircularProgress, Typography } from "@mui/material";
import BrandItem from "./BrandItem";
import { BrandInterface } from "../../utils/types";

interface BrandListProps {
  brands: BrandInterface[];
  loading: boolean;
}

const BrandList = ({ brands, loading }: BrandListProps) => {
  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Box display="flex" gap={2.5} flexWrap="wrap">
          {brands && brands.length > 0 ? (
            brands.map((brand) => <BrandItem brand={brand} />)
          ) : (
            <Typography variant="subtitle1">
              Nenhuma marca cadastrada;
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default BrandList;
