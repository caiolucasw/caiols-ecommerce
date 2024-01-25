import {
  Box,
  FormControlLabel,
  Typography,
  Checkbox,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchProducts } from "../app/searchProductsSlice";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import axios from "axios";

interface CategoryInterface {
  id: number;
  label: string;
  products_count: number;
}

interface CategorySelectedInterface {
  [key: number]: CategoryInterface;
}

const ProductFilters = () => {
  const dispatch = useAppDispatch();
  const productName = useAppSelector(
    (state: RootState) => state.searchProducts.name
  );
  const [selectedCategories, setSelectedCategories] =
    useState<CategorySelectedInterface>({});
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const addCategory = (category: CategoryInterface) => {
    if (!selectedCategories[category.id]) {
      const categoriesAux = [...Object.keys(selectedCategories), category.id];
      dispatch(fetchProducts({ name: productName, category: categoriesAux }));
      // make request with thunk
      setSelectedCategories((current) => ({
        ...current,
        [category.id]: category,
      }));
    }
  };

  const removeCategory = (category: CategoryInterface) => {
    if (!selectedCategories[category.id]) return;

    const auxCategories = { ...selectedCategories };
    delete auxCategories[category.id];
    const categoriesAux = Object.keys(auxCategories);
    dispatch(fetchProducts({ name: productName, category: categoriesAux }));
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

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Card
      sx={{
        borderRadius: 2,
        pt: 1,
        minWidth: 200,
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} p={1}>
          Categorias
        </Typography>
        <Box display="flex" flexDirection="column" gap={1} p={2}>
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={
                    selectedCategories[category.id] &&
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
        <Divider />
        <Typography variant="subtitle1" fontWeight={700} p={1}>
          Marcas
        </Typography>
        <Box display="flex" flexDirection="column" gap={1} p={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked
                sx={{
                  "&.Mui-checked": {
                    color: "#70e000",
                  },
                }}
                // onChange={(event) => setDense(event.target.checked)}
              />
            }
            label="Asus"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked
                sx={{
                  "&.Mui-checked": {
                    color: "#70e000",
                  },
                }}
                // onChange={(event) => setDense(event.target.checked)}
              />
            }
            label="Lenovo"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
