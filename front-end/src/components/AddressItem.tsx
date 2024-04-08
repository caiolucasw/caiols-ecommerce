import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Address } from "../utils/types";
import PlaceIcon from "@mui/icons-material/Place";
import EditIcon from "@mui/icons-material/Edit";
import { SetStateAction } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type modalType = "add" | "update" | "remove" | "";
interface AddressItemInterface {
  loading: string | null;
  address: Address;
  setOpenModal: React.Dispatch<SetStateAction<modalType>>;
  setAddressSelected: React.Dispatch<SetStateAction<Address | null>>;
  handleChangeDefaultAddress: (id: number, checked: boolean) => void;
}

const AddressItem = ({
  address,
  setOpenModal,
  setAddressSelected,
  handleChangeDefaultAddress,
  loading,
}: AddressItemInterface) => {
  return (
    <Box>
      <Box display="flex" gap={4} alignItems="center">
        <Box>
          <PlaceIcon />
        </Box>
        <Box>
          <Typography variant="subtitle1">
            {`${address.person_name} ${address?.last_name || ""}`}{" "}
          </Typography>
          <Box>
            <Typography variant="subtitle2">
              {`R. ${address.street}, ${address.number}`}
            </Typography>
            <Typography variant="subtitle2">
              {`${address.district} - ${address.city} - ${
                address.state
              } - ${address.zip_code.substring(
                0,
                6
              )}-${address.zip_code.substring(6)}`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={address.default === 1}
                onChange={(e) =>
                  handleChangeDefaultAddress(address.id, e.target.checked)
                }
              />
            }
            label={<Typography variant="caption">Endereço Padrão</Typography>}
            labelPlacement="bottom"
            disabled={loading === "default-address"}
            sx={{ textAlign: "center" }}
          />
        </Box>
        <Box flex={1} display="flex" justifyContent="end">
          <Box
            display="flex"
            justifyContent="end"
            flexDirection="column"
            gap={1}
          >
            <Typography
              variant="caption"
              display="flex"
              gap={1}
              alignItems="center"
              mt={1}
              textAlign="center"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <EditIcon sx={{ width: 18, height: 18 }} />
              <Typography
                variant="inherit"
                onClick={() => {
                  setAddressSelected(address);
                  setOpenModal("update");
                }}
              >
                Editar
              </Typography>
            </Typography>
            <Box
              display="flex"
              justifyContent="end"
              flexDirection="column"
              gap={1}
            >
              <Typography
                variant="caption"
                display="flex"
                gap={1}
                alignItems="center"
                mt={1}
                textAlign="center"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <DeleteIcon
                  sx={{
                    width: 18,
                    height: 18,
                  }}
                />
                <Typography
                  variant="inherit"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => {
                    setAddressSelected(address);
                    setOpenModal("remove");
                  }}
                  textAlign="center"
                >
                  Excluir
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default AddressItem;
