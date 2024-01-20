import { 
    Card, 
    CardContent, 
    Typography,
    Box 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductItem = () => {
    const navigate = useNavigate();
    return (
        <Card
            sx={{
                cursor: 'pointer',
                boxShadow: 2,
                borderRadius: 2,
                textDecoration: 'none',
                '&:hover': {
                    boxShadow: 4,
                    transition: 'box-shadow .2s ease-in-out',
                }
            }}
            onClick={() => navigate('/product/131')}
        >
            <CardContent>
                <Box>
                    <img 
                        src="https://http2.mlstatic.com/D_NQ_NP_903017-MLU72748491739_112023-W.webp" 
                        width="284px" 
                        height="284px" 
                        alt="notebook" 
                        style={{
                            maxWidth: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                        }}
                    />
                </Box>
                <Box>
                    <Typography 
                        variant="subtitle1"
                        fontWeight={700}
                    >
                        Notebook Lenovo intel i7 16GB
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        fontWeight={700}
                        sx={{
                            fontSize: '1.4rem',
                            color: '#70e000'
                        }}
                    >
                    R$ 129,00
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductItem