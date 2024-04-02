import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchProducts, setInputNameValue } from "../app/searchProductsSlice";
import { useAppDispatch, useAppSelector } from "../app/store";

const SearchInput = () => {
  const state = useAppSelector((state) => state.searchProducts);
  const dispatch = useAppDispatch();
  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Procure produtos"
      sx={{
        backgroundColor: "white",
        borderRadius: 4,
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#70e000",
            borderRadius: 4,
          },
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          dispatch(
            fetchProducts({
              ...state.filters,
              name: state.name,
            })
          );
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(e) => dispatch(setInputNameValue(e.target.value))}
      fullWidth
    />
  );
};

export default SearchInput;
