import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchProducts, setInputNameValue } from "../app/searchProductsSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useLocation } from "react-router-dom";

const categoryNameMap: { [key: string]: string } = {
  notebooks: "laptops",
  tablets: "tablets",
  celulares: "phones",
  tvs: "tvs",
};

const SearchInput = () => {
  const state = useAppSelector((state) => state.searchProducts);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathName = location.pathname ? location.pathname.substring(1) : "";
  const categoryName = pathName ? categoryNameMap[pathName] : "";
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
              ...(categoryName && { categoryName }),
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
      value={state?.name || ""}
      fullWidth
    />
  );
};

export default SearchInput;
