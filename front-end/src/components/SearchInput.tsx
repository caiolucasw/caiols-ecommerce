import { 
    TextField,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setInputNameValue } from '../app/searchProductsSlice';

const SearchInput = () => {
    const dispatch = useDispatch();
  return (
    <TextField 
        variant="outlined"
        size="small"
        placeholder="Procure produtos"             
        sx={{ 
        backgroundColor: 'white', 
        borderRadius: 4,
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#70e000',
            borderRadius: 4,
        }
        }}
        InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                <SearchIcon />
            </InputAdornment>
        )
        }}
        onChange={(e) => dispatch(setInputNameValue(e.target.value))}
        fullWidth
    />
  )
}

export default SearchInput