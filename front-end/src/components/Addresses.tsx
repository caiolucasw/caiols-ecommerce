import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosApp from "../customAxios";
import AddressItem from "./AddressItem";
import { Address } from "../utils/types";

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const getAddress = async () => {
    try {
      const res = await axiosApp.get("/address");
      if (res?.status === 200 && res?.data) {
        setAddresses(res.data);
      }
    } catch (err) {
      console.log(err);
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
        {addresses &&
          addresses.map((address: Address) => (
            <AddressItem key={address.id} address={address} />
          ))}
      </Box>
      <Box mt={4}>
        <Button variant="contained" color="primary">
          Cadastrar novo endereço
        </Button>
      </Box>
    </Box>
  );
};

export default Addresses;
