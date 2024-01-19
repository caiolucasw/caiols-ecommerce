import { Box, Typography, FormControlLabel, Checkbox, Grid } from '@mui/material';
import React from 'react'
import ProductFilters from './ProductFilters';
import ProductItem from './ProductItem';

const ListProductsContainer = () => {
  return (
    <Box
        sx={{
            width: '100%'
        }}
    >
        <Box
            sx={{ 
                width: '100%'
            }}
        
        >
            <Grid
                container
                spacing={2}
            >
                {[1,2,3,4,5,6,7].map(item => (
                    <Grid 
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                    >
                        <ProductItem key={item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    
    </Box>

  )
}

export default ListProductsContainer