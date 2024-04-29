import {
  Box,
  FormControlLabel,
  Typography,
  Checkbox,
  Card,
  CardContent,
  Divider,
  Slider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useEffect, useState } from "react";
import { setBrand, setPriceRange } from "../app/searchProductsSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import axiosApp from "../customAxios";
import FilterListIcon from "@mui/icons-material/FilterListOutlined";
import {
  BrandProductsCountInterface,
  CategoryProductsCountInterface,
} from "../utils/types";

const minDistance = 0;

const ProductFilters = ({ category }: { category?: string }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const selectedBrands = useAppSelector(
    (state) => state.searchProducts.filters.brands
  );

  const [minMaxSlider, setMinMaxSlider] = useState<number[]>([0, 0]);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 0]);

  const [_categories, setCategories] = useState<
    CategoryProductsCountInterface[]
  >([]);

  const [brands, setBrands] = useState<BrandProductsCountInterface[]>([]);
  const lgScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleChangeCommited = (_e: any, value: number | number[]) => {
    if (Array.isArray(value)) {
      dispatch(setPriceRange(value));
    }
  };

  const handleChangeSlider = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setSliderValue([
        Math.min(newValue[0], sliderValue[1] - minDistance),
        sliderValue[1],
      ]);
    } else {
      setSliderValue([
        sliderValue[0],
        Math.max(newValue[1], sliderValue[0] + minDistance),
      ]);
    }
  };

  const addBrand = (brand: BrandProductsCountInterface) => {
    dispatch(
      setBrand({
        brand: brand,
        type: "ADD",
      })
    );
  };

  const removeBrand = (brand: BrandProductsCountInterface) => {
    dispatch(
      setBrand({
        brand: brand,
        type: "REMOVE",
      })
    );
  };

  const getFilters = async () => {
    const categoryParam = category ? `?categoryName=${category}` : "";
    try {
      const res = await axiosApp.get("/products/filters" + categoryParam);

      if (res.status === 200 && res.data) {
        setCategories(res.data?.categories || []);
        setBrands(res.data?.brands || []);
        if (res.data.price) {
          const prices = [
            res.data.price.minPrice || 0,
            res.data.price.maxPrice || 0,
          ];
          dispatch(setPriceRange(prices));
          setMinMaxSlider(prices);
          setSliderValue(prices);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFilters();
  }, []);

  return (
    <>
      {!lgScreen ? (
        <></>
      ) : (
        <Card
          sx={{
            borderRadius: 2,
            pt: 1,
            minWidth: 220,
          }}
        >
          <CardContent>
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" fontWeight={700}>
                Filtros
              </Typography>
              <FilterListIcon />
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Intervalo de Preço
              </Typography>
              <Box>
                <Slider
                  value={sliderValue}
                  onChange={handleChangeSlider}
                  onChangeCommitted={handleChangeCommited}
                  min={minMaxSlider[0]}
                  max={minMaxSlider[1]}
                  disableSwap
                />
                <Box display="flex" justifyContent={"space-between"}>
                  <Typography variant="body2">
                    R${" "}
                    {sliderValue && sliderValue.length === 2
                      ? sliderValue[0].toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0,00"}
                  </Typography>
                  <Typography variant="body2">
                    R${" "}
                    {sliderValue && sliderValue.length === 2
                      ? sliderValue[1].toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0,00"}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="subtitle1" fontWeight={700} mb={2}>
              Marcas
            </Typography>
            <Box>
              <PerfectScrollbar>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  p={2}
                  pt={1}
                  maxHeight={220}
                >
                  {brands.map((brand) => (
                    <FormControlLabel
                      key={brand.id}
                      control={
                        <Checkbox
                          checked={
                            !!selectedBrands[brand.id] &&
                            brand.id === selectedBrands[brand.id].id
                          }
                          sx={{
                            "&.Mui-checked": {
                              color: "#70e000",
                            },
                          }}
                          onChange={(event) => {
                            if (event.target.checked) addBrand(brand);
                            else removeBrand(brand);
                          }}
                        />
                      }
                      label={`${brand.name} (${brand.products_count})`}
                      sx={{ whiteSpace: "nowrap" }}
                    />
                  ))}
                </Box>
              </PerfectScrollbar>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProductFilters;
