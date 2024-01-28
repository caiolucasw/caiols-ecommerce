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
import { useEffect, useState } from "react";
import { fetchProducts } from "../app/searchProductsSlice";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterListOutlined";
import {
  BrandProductsCountInterface,
  CategoryProductsCountInterface,
} from "../utils/types";
import { useLocation } from "react-router-dom";

interface CategorySelectedInterface {
  [key: number]: CategoryProductsCountInterface;
}

interface BrandSelectedInterface {
  [key: number]: BrandProductsCountInterface;
}

const minDistance = 0;

const ProductFilters = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const productName = useAppSelector(
    (state: RootState) => state.searchProducts.name
  );
  const [selectedCategories, setSelectedCategories] =
    useState<CategorySelectedInterface>({});
  const [categories, setCategories] = useState<
    CategoryProductsCountInterface[]
  >([]);
  const [selectedBrands, setSelectedBrands] = useState<BrandSelectedInterface>(
    {}
  );
  const [brands, setBrands] = useState<BrandProductsCountInterface[]>([]);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 10000]);
  const lgScreen = useMediaQuery(theme.breakpoints.up("md"));

  const location = useLocation();

  const handleChangeSlider = (
    event: Event,
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

  const addCategory = (category: CategoryProductsCountInterface) => {
    if (!selectedCategories[category.id]) {
      const categoriesAux = [
        ...Object.keys(selectedCategories),
        category.id.toString(),
      ];

      dispatch(
        fetchProducts({
          name: productName,
          category: categoriesAux,
          brand: Object.keys(selectedBrands),
        })
      );
      // make request with thunk
      setSelectedCategories((current) => ({
        ...current,
        [category.id]: category,
      }));
    }
  };

  const removeCategory = (category: CategoryProductsCountInterface) => {
    if (!selectedCategories[category.id]) return;

    const auxCategories = { ...selectedCategories };
    delete auxCategories[category.id];

    // @ts-ignore
    dispatch(
      fetchProducts({
        name: productName,
        category: Object.keys(auxCategories),
        brand: Object.keys(selectedBrands),
      })
    );
    setSelectedCategories(auxCategories);
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/categories/products_count`
      );

      if (res.status === 200 && res.data && res.data.data) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addBrand = (brand: BrandProductsCountInterface) => {
    if (!selectedBrands[brand.id]) {
      const brandsAux = [...Object.keys(selectedBrands), brand.id.toString()];
      const categoriesAux = Object.keys(selectedCategories);
      // @ts-ignore
      dispatch(
        fetchProducts({
          name: productName,
          category: categoriesAux,
          brand: brandsAux,
        })
      );
      // make request with thunk
      setSelectedBrands((current) => ({
        ...current,
        [brand.id]: brand,
      }));
    }
  };

  const removeBrand = (brand: BrandProductsCountInterface) => {
    if (!selectedBrands[brand.id]) return;

    const auxBrands = { ...selectedBrands };
    delete auxBrands[brand.id];

    const auxCategories = Object.keys(selectedCategories);
    // @ts-ignore
    dispatch(
      fetchProducts({
        name: productName,
        category: auxCategories,
        brand: Object.keys(auxBrands),
      })
    );
    setSelectedBrands(auxBrands);
  };

  const getBrands = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/brands/products_count`
      );

      if (res.status === 200 && res.data && res.data.data) {
        setBrands(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
    getBrands();
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
            <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
            {location && location.pathname === "/" && (
              <>
                <Typography variant="subtitle1" fontWeight={700}>
                  Categorias
                </Typography>
                <Box display="flex" flexDirection="column" gap={1} p={2} pt={1}>
                  {categories.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      control={
                        <Checkbox
                          checked={
                            !!selectedCategories[category.id] &&
                            category.id === selectedCategories[category.id].id
                          }
                          sx={{
                            "&.Mui-checked": {
                              color: "#70e000",
                            },
                          }}
                          onChange={(event) => {
                            if (event.target.checked) addCategory(category);
                            else removeCategory(category);
                          }}
                        />
                      }
                      label={`${category.label} (${category.products_count})`}
                      sx={{ whiteSpace: "nowrap" }}
                    />
                  ))}
                </Box>
              </>
            )}

            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="subtitle1" fontWeight={700}>
              Marcas
            </Typography>
            <Box display="flex" flexDirection="column" gap={1} p={2} pt={1}>
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
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProductFilters;
