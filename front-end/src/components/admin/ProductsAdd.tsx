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
import { useEffect, useRef, useState } from "react";
import axiosApp from "../../customAxios";
import { BrandInterface, CategoryInterface } from "../../utils/types";
import { toast } from "react-toastify";
import ImageNew from "../ImageNew";
import axios from "axios";

interface ProductInfo {
  categories: CategoryInterface[];
  brands: BrandInterface[];
}

interface ProductNew {
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  images: File[];
}
const productDefault = {
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  images: [],
};

const ProductsAdd = () => {
  const [loading, setLoading] = useState(false);
  const inputImage = useRef<HTMLInputElement | null>(null);
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    categories: [],
    brands: [],
  });
  const [product, setProduct] = useState<ProductNew>(productDefault);

  const handleChange = (fieldName: string, fieldValue: string) => {
    setProduct((curr) => ({
      ...curr,
      [fieldName]: fieldValue,
    }));
  };

  // const handleChangeImageUrl = (index: number, value: string) => {
  //   const imagesUrlAux = [...product.images_url];
  //   if (index < 0 || index >= imagesUrlAux.length) return;

  //   imagesUrlAux[index] = value;

  //   setProduct((curr) => ({
  //     ...curr,
  //     images: imagesUrlAux,
  //   }));
  // };

  const handleImages = (e: any) => {
    const files = e?.target.files;
    if (!files || files.length === 0) return;
    if (files?.length > 4) {
      toast.error("Máximo de 4 imagens permitidas");
      return;
    }
    const orderKeys = Object.keys(files)
      .map((key) => Number(key))
      .toSorted((a, b) => a - b);
    const images = orderKeys.map((key) => files[key]);

    setProduct((curr) => ({
      ...curr,
      images,
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
    const form = new FormData();
    const { name, description, price, category, brand, images } = product;
    form.append("name", name);
    form.append("description", description), form.append("price", price);
    form.append("category", category);
    form.append("brand", brand);

    if (images) {
      for (const file of images) {
        form.append("images[]", file);
      }
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/products`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
              <Typography variant="h6" fontWeight={700} display="inline-block">
                Imagens
              </Typography>
              <Typography variant="subtitle2" display="inline-block">
                &nbsp; (Obs: Mínimo 2 imagens e no máximo 4 imagens)
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <input
                  ref={inputImage}
                  name="image_url"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleImages(e)}
                />
                <Button
                  variant="outlined"
                  onClick={() => inputImage?.current?.click()}
                >
                  Adicionar Imagens
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Box display="flex" gap={1} mb={1}>
                    {product &&
                      product.images.map((image) => {
                        return <ImageNew key={image.name} image={image} />;
                      })}
                  </Box>
                </Box>
              </Grid>
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
