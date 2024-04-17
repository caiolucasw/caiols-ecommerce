import { Box } from "@mui/material";

interface ImageProps {
  image: any;
}
const ImageNew = ({ image }: ImageProps) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        width: 120,
        height: 120,
        backgroundColor: "#ddd",
        backgroundRepeat: "no-repeat",
        backgroundImage: image ? `url(${URL.createObjectURL(image)})` : "",
        backgroundSize: "contain",
        backgroundPosition: "center",
        border: "2px solid #ccc",
      }}
    ></Box>
  );
};

export default ImageNew;
