import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormAddressCheckout from "./checkout/FormAddressCheckout";
import { SetStateAction } from "react";
import { Address } from "../utils/types";

type modalType = "add" | "update" | "";
interface ModalAddressInterface {
  type: modalType;
  onClose: React.Dispatch<SetStateAction<modalType>>;
  address: Address;
}

const ModalAddress = ({ type, onClose, address }: ModalAddressInterface) => {
  return (
    <Dialog open onClose={() => onClose("")}>
      <DialogTitle
        sx={{
          position: "relative",
        }}
      >
        {type === "add" ? "Adicionar Endereço" : "Editar Endereço"}
        <IconButton
          sx={{
            position: "absolute",
            right: 5,
            top: 10,
          }}
          onClick={() => onClose("")}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <FormAddressCheckout address={address} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddress;
