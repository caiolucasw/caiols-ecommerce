import { Box, FormControlLabel, Typography, Checkbox, Card, CardContent, Divider } from '@mui/material'
import {useState } from 'react'
import { useDispatch } from 'react-redux'


interface CategoryInterface {
    [key: number]: number;
}

const ProductFilters = () => {
    const dispatch = useDispatch();
    const categories = [{ id: 1, label: "Computadores" }, { id: 2, label: "Tablets" }];
    const [selectedCategories, setSelectedCategories] = useState<CategoryInterface>({});

    const addCategory = (categoryId: number) => {
        if (!selectedCategories[categoryId]) {

            const categoriesAux = [...Object.keys(selectedCategories), categoryId];
            // make request with thunk
            setSelectedCategories((current) => ({...current, [categoryId]: categoryId }));
        }
    };

    const removeCategory = (categoryId: number) =>  {
        if (!selectedCategories[categoryId]) return;
      
        const auxCategories = {...selectedCategories};
        delete auxCategories[categoryId];
        const categoriesAux = Object.keys(auxCategories);
        // make request with thunk
        setSelectedCategories(auxCategories);
    };


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
                    {categories.map((category) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#70e000'
                                        }
                                    }}
                                    onChange={(event) => {
                                        if (event.target.checked) addCategory(category.id);
                                        else removeCategory(category.id);
                                    }}
                                    />
                                }
                            label={category.label}
                        />
                    ))}
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