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
  default: 0,
};

const CartAddresses = ({ handleNext }: { handleNext: () => void }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [formType, setFormType] = useState<modalType>("");
  const [addressSelected, setAddressSelected] = useState<Address | null>(null);
  const hasDefaultAddress =
    addresses.filter((a) => a.default === 1).length == 1;

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

  const handleChangeDefaultAddress = async (id: number, checked: boolean) => {
    setLoading("default-address");
    const value = checked ? 1 : 0;
    try {
      const res = await axiosApp.post(`/address/${id}/change-default`, {
        value,
      });
      if (res.status === 200) {
        toast.success("Endereço padrão atualizado");
        setAddresses((curr) => {
          const addressAux = curr.map((a) => ({
            ...a,
            default: a.id === id ? value : 0,
          }));
          return addressAux;
        });
      } else {
        toast.error("Houve um erro!");
      }
    } catch (err) {
      toast.error("Houve um erro!");
      console.log(err);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {loading === "getAddresses" ? (
        <Box ml={2} display="flex" justifyContent="center" alignItems="center">
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
                    handleChangeDefaultAddress={handleChangeDefaultAddress}
                    loading={loading}
                  />
                ))}
              <Box>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    setAddressSelected(customAddress);
                    setFormType("add");
                  }}
                >
                  Cadastrar novo endereço
                </Button>
              </Box>

              <Box mb={2} p={2} display="flex" justifyContent="end">
                <Button
                  variant="contained"
                  onClick={() => {
                    if (hasDefaultAddress) handleNext();
                    else {
                      toast.error("Selecione ou adicione um endereço padrão");
                    }
                  }}
                >
                  Próximo
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
