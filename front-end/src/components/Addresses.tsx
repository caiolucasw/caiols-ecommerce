import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosApp from "../customAxios";
import AddressItem from "./AddressItem";
import { Address } from "../utils/types";
import ModalAddress from "./ModalAddress";
import ModalRemove from "./utils/ModalRemove";

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

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [openModal, setOpenModal] = useState<"add" | "update" | "remove" | "">(
    ""
  );
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
