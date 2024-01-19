import { Box } from '@mui/material';
import React from 'react';
import ProductFilters from './ProductFilters';
import ListProductsContainer from './ListProductsContainer';

const Content = () => {
  return (
    <Box 
      sx={{
        width: '100%'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          my: 1,
          gap: 3,
          py: 3,
          px: 1,
          maxWidth: '1400px',
          backgroundColor: 'rgba(177, 179, 181, 0.05)',
          mx: 'auto',
        }}
      >
        <ProductFilters />
        <ListProductsContainer />

      </Box>
    </Box>
  )
}

export default Content;