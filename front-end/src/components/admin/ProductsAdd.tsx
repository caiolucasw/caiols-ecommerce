import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosApp from "../../customAxios";
import { BrandInterface, CategoryInterface } from "../../utils/types";
import { toast } from "react-toastify";

interface ProductInfo {
  categories: CategoryInterface[];
  brands: BrandInterface[];
}

const productDefault = {
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  images_url: ["", "", "", "", ""],
};

const ProductsAdd = () => {
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    categories: [],
    brands: [],
  });
  const [product, setProduct] = useState(productDefault);

  const handleChange = (fieldName: string, fieldValue: string) => {
    setProduct((curr) => ({
      ...curr,
      [fieldName]: fieldValue,
    }));
  };

  const handleChangeImageUrl = (index: number, value: string) => {
    const imagesUrlAux = [...product.images_url];
    if (index < 0 || index >= imagesUrlAux.length) return;

    imagesUrlAux[index] = value;

    setProduct((curr) => ({
      ...curr,
      images_url: imagesUrlAux,
    }));
  };

  const getProductInfo = async () => {
    try {
      const res = await axiosApp.get("/products/add/info");
      if (res.status === 200) {
        setProductInfo(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async () => {
    setLoading(true);
    try {
      const res = await axiosApp.post("/products", JSON.stringify(product));
      if (res.status === 201) {
        toast.success("Produto adicionado com sucesso!");
        setProduct(productDefault);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h5" my={2} mb={3} fontWeight={700}>
          Adicionar Produto
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Nome"
              fullWidth
              value={product.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Descrição"
              fullWidth
              multiline
              rows={3}
              value={product.description}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="price"
              label="Preço"
              fullWidth
              type="number"
              value={product.price}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="categoria-label">Categoria</InputLabel>
              <Select
                labelId="categoria-label"
                id="category"
                name="category"
                value={product.category}
                label="Categoria"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {productInfo?.categories?.map((category) => (
                  <MenuItem key={category.value} value={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="brand-label">Marca</InputLabel>
              <Select
                labelId="brand-label"
                id="brand"
                name="brand"
                value={product.brand}
                label="Marca"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {productInfo?.brands?.map((brand) => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box my={2}>
              <Typography variant="h6">Imagens</Typography>
            </Box>
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map((value) => (
                <Grid item xs={12} key={value}>
                  <TextField
                    name={`image_url${value}`}
                    label={`Imagem Url ${value}`}
                    fullWidth
                    value={product.images_url[value - 1]}
                    onChange={(e) =>
                      handleChangeImageUrl(value - 1, e.target.value)
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end" mt={2}>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              onClick={() => addProduct()}
            >
              Adicionar Produto
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsAdd;
