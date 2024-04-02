import React, { useEffect, useState } from "react";
import axiosApp from "../../customAxios";
import { CategoryInterface } from "../../utils/types";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";

interface CategoryListProps {
  categories: CategoryInterface[];
  loading: boolean;
}

const CategoryList = ({ categories, loading }: CategoryListProps) => {
  return (
    <Box>
      <Box display="flex" gap={2}>
        {loading ? (
          <Box>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.label}
                  color="primary"
                />
              ))
            ) : (
              <Box>
                <Typography variant="h6">
                  Nenhuma categoria cadastrada.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default CategoryList;
