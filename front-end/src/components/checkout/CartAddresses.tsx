import { useEffect, useState } from "react";
import { Address } from "../../utils/types";
import axiosApp from "../../customAxios";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import AddressItem from "../AddressItem";
import ModalAddress from "../ModalAddress";
import ModalRemove from "../utils/ModalRemove";
import { toast } from "react-toastify";
import FormAddressCheckout from "./FormAddressCheckout";
import CloseIcon from "@mui/icons-material/Close";

type modalType = "add" | "update" | "remove" | "";

const customAddress = {
  id: -1,
  person_name: "",
  last_name: "",
  zip_code: "",
  street: "",
  number: "",
  district: "",
  state: "",
  city: "",
};

const CartAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [formType, setFormType] = useState<modalType>("");
  const [addressSelected, setAddressSelected] = useState<Address | null>(null);

  const getAddress = async () => {
    setLoading("getAddresses");
    try {
      const res = await axiosApp.get("/address");
      if (res?.status === 200 && res?.data) {
        setAddresses(res.data);
      }
      setLoading(null);
    } catch (err) {
      console.log(err);
      setLoading(null);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {loading === "getAddresses" ? (
        <Box ml={2}>
          <CircularProgress size={50} />
        </Box>
      ) : (
        <>
          {(formType === "add" || formType === "update") && addressSelected && (
            <>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between	"
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  {formType === "add"
                    ? "Adicionar endereço de Entrega"
                    : "Editar endereço de Entrega"}
                </Typography>
                <IconButton
                  onClick={() => setFormType("")}
                  sx={{ color: "var(--primary-color)" }}
                  title="Voltar"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <FormAddressCheckout
                onClose={() => {
                  setFormType("");
                  getAddress();
                }}
                type={formType}
                address={addressSelected}
              />
            </>
          )}
          {!formType && (
            <>
              {addresses &&
                addresses.map((address: Address) => (
                  <AddressItem
                    key={address.id}
                    address={address}
                    setOpenModal={setFormType}
                    setAddressSelected={setAddressSelected}
                  />
                ))}
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setAddressSelected(customAddress);
                    setFormType("add");
                  }}
                >
                  Cadastrar novo endereço
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default CartAddresses;
