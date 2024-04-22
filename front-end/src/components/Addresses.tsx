import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosApp from "../customAxios";
import AddressItem from "./AddressItem";
import { Address } from "../utils/types";
import ModalAddress from "./ModalAddress";
import ModalRemove from "./utils/ModalRemove";
import { toast } from "react-toastify";

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

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [openModal, setOpenModal] = useState<modalType>("");
  const [addressSelected, setAddressSelected] = useState<Address | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

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

  const removeAddress = async (addressId: number) => {
    setLoading("removeAddresses");
    try {
      const res = await axiosApp.delete(`/address/${addressId}`);
      if (res?.status === 200 && res?.data) {
        getAddress();
        setOpenModal("");
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
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Typography variant="h5" fontWeight={700}>
          Endereços de Entrega
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={3}>
        {loading === "getAddresses" ? (
          <Box ml={2}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            {addresses &&
              addresses.map((address: Address) => (
                <AddressItem
                  key={address.id}
                  address={address}
                  setOpenModal={setOpenModal}
                  setAddressSelected={setAddressSelected}
                  handleChangeDefaultAddress={handleChangeDefaultAddress}
                  loading={loading}
                />
              ))}
          </>
        )}
      </Box>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setAddressSelected(customAddress);
            setOpenModal("add");
          }}
        >
          Cadastrar novo endereço
        </Button>
      </Box>
      {(openModal === "add" || openModal === "update") && addressSelected && (
        <ModalAddress
          onClose={() => {
            setOpenModal("");
            getAddress();
          }}
          type={openModal}
          address={addressSelected}
        />
      )}
      {openModal === "remove" && addressSelected && (
        <ModalRemove
          title="Remover"
          message="Deseja remover este telefone?"
          onRemove={() => removeAddress(addressSelected.id)}
          onClose={() => {
            setOpenModal("");
            getAddress();
          }}
        />
      )}
    </Box>
  );
};

export default Addresses;
