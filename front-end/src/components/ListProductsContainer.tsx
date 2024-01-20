import { Box, Grid } from '@mui/material';

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
                        key={item}
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