import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormAddressCheckout from "./checkout/FormAddressCheckout";
import { Address } from "../utils/types";

type modalType = "add" | "update" | "remove" | "";
interface ModalAddressInterface {
  type: modalType;
  onClose: () => undefined;
  address: Address;
}

const ModalAddress = ({ type, onClose, address }: ModalAddressInterface) => {
  return (
    <Dialog open onClose={() => onClose()}>
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
          onClick={() => onClose()}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <FormAddressCheckout address={address} type={type} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddress;
