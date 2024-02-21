import { Box, Divider, Typography } from "@mui/material";
import { Address } from "../utils/types";
import PlaceIcon from "@mui/icons-material/Place";
import EditIcon from "@mui/icons-material/Edit";
import { SetStateAction } from "react";

type modalType = "add" | "update" | "";
interface AddressItemInterface {
  address: Address;
  setOpenModal: React.Dispatch<SetStateAction<modalType>>;
  setAddressSelected: React.Dispatch<SetStateAction<Address | null>>;
}

const AddressItem = ({
  address,
  setOpenModal,
  setAddressSelected,
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
          <Box>
            <Typography
              variant="caption"
              display="flex"
              gap={1}
              alignItems="center"
              mt={1}
            >
              <EditIcon sx={{ width: 18, height: 18 }} />
              <Typography
                variant="inherit"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  setAddressSelected(address);
                  setOpenModal("update");
                }}
              >
                Editar endereço
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            sx={(theme) => ({
              color: theme.palette.error.main,
              textDecoration: "underline",
            })}
          >
            Excluir
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default AddressItem;
