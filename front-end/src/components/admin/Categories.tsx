import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import CategoryList from "./CategoryList";
import { useEffect, useState } from "react";
import axiosApp from "../../customAxios";
import { toast } from "react-toastify";
import { CategoryInterface } from "../../utils/types";

const newCategoryDefault = {
  value: "",
  label: "",
};

const Categories = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState(newCategoryDefault);

  const getCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await axiosApp.get("/categories");
      if (res.status === 200) {
        setCategories(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleChange = (value: string) => {
    setNewCategory((curr) => ({
      ...curr,
      label: value,
    }));
  };

  const addCategory = async () => {
    setLoading(true);
    const categoryNew = newCategory;
    categoryNew.value = newCategory.label.toLowerCase().split(" ").join("-");

    try {
      const res = await axiosApp.post("/categories", categoryNew);
      if (res.status === 201 && res.data) {
        toast.success("Marca adicionada");
        setCategories((curr) => [...curr, res.data]);
        setNewCategory(newCategoryDefault);
      }
    } catch (err) {
      toast.error("Erro ao adicionar marca");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Box>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" my={2} mb={3} fontWeight={700}>
            Categorias
          </Typography>
        </Box>
        <Box mt={2}>
          <CategoryList categories={categories} loading={loadingCategories} />
        </Box>
        <Divider sx={{ mt: 4, mb: 5 }} />
        <Box>
          <Typography variant="h6" fontWeight={700} mb={4}>
            Adicionar Categoria
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              name="label"
              label="Categoria"
              value={newCategory.label}
              onChange={(e) => handleChange(e.target.value)}
            />
            <Box>
              <Button
                variant="contained"
                color="primary"
                disabled={loading || newCategory.label.trim().length <= 0}
                onClick={() => addCategory()}
              >
                Adicionar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Categories;
