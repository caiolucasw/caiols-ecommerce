import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Divider,
} from "@mui/material";
import BrandList from "./BrandList";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosApp from "../../customAxios";
import { BrandInterface } from "../../utils/types";

const newBrandDefault = {
  name: "",
  image_url: "",
};

const Brands = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [newBrand, setNewBrand] = useState(newBrandDefault);

  const getBrands = async () => {
    setLoading(true);
    try {
      const res = await axiosApp.get("/brands");
      if (res.status === 200) {
        setBrands(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);
  const addBrand = async () => {
    try {
      const res = await axiosApp.post("/brands", newBrand);
      if (res.status === 201 && res.data) {
        toast.success("Marca adicionada");
        setBrands((curr) => [...curr, res.data]);
        setNewBrand(newBrandDefault);
      }
    } catch (err) {
      toast.error("Erro ao adicionar marca");
    }
  };

  return (
    <Box>
      <Box>
        <Box>
          <Box>
            <Box>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Adicionar marca
              </Typography>
              <Box mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Marca"
                      fullWidth
                      onChange={(e) =>
                        setNewBrand((curr) => ({
                          ...curr,
                          name: e.target.value,
                        }))
                      }
                      value={newBrand.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Imagem Url"
                      onChange={(e) =>
                        setNewBrand((curr) => ({
                          ...curr,
                          image_url: e.target.value,
                        }))
                      }
                      value={newBrand.image_url}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addBrand()}
                    >
                      Adicionar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
            </Box>
          </Box>
        </Box>
        <Box mt={3}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Marcas
          </Typography>
          <BrandList brands={brands} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
};

export default Brands;
