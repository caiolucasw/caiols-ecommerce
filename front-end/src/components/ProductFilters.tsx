import { Box, FormControlLabel, Typography, Checkbox, Card, CardContent, Divider } from '@mui/material'
import React from 'react'

const ProductFilters = () => {
  return (
    <Card 
        sx={{
            borderRadius: 2,
            pt: 1,
            minWidth: 200
        }}
    >
        <CardContent>
            <Typography 
                variant="subtitle1"
                fontWeight={700}
                p={1}
            >
                Categorias
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={1}
                p={2}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked
                            sx={{
                                '&.Mui-checked': {
                                    color: '#70e000'
                                }
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
                                '&.Mui-checked': {
                                    color: '#70e000'
                                }
                            }}
                    // onChange={(event) => setDense(event.target.checked)}
                        />
                    }
                    label="Lenovo"
                />
            </Box>
            <Divider />
            <Typography 
                variant="subtitle1"
                fontWeight={700}
                p={1}
            >
                Marcas
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                gap={1}
                p={2}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked
                            sx={{
                                '&.Mui-checked': {
                                    color: '#70e000'
                                }
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
                                '&.Mui-checked': {
                                    color: '#70e000'
                                }
                            }}
                    // onChange={(event) => setDense(event.target.checked)}
                        />
                    }
                    label="Lenovo"
                />
            </Box>
        </CardContent>
    </Card>
  )
}

export default ProductFilters