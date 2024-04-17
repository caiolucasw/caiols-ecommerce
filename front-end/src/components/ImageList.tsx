import { useState } from "react";
import { Box } from "@mui/material";
import { ProductImage } from "../utils/types";

const ImageList = ({ productImages }: { productImages: ProductImage[] }) => {
  const [currentSelectedImage, setCurrentSelectedImage] =
    useState<ProductImage | null>(
      productImages && productImages.length > 0 ? productImages[0] : null
    );

  if (productImages)
    return (
      <Box width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            maxHeight: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              justifyContent: { xs: "center", sm: "start" },
              order: { xs: 2, sm: 1 },
              gap: 2,
            }}
          >
            {productImages &&
              productImages.map((image) => (
                <Box
                  onMouseOver={() => setCurrentSelectedImage(image)}
                  key={image.id}
                  sx={(theme) => ({
                    width: { xs: 60, sm: 110 },
                    height: { xs: 60, sm: 110 },
                    borderRadius: 2,
                    backgroundImage: `url(${image.image_url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    border: "2px solid",
                    borderColor:
                      image.id === currentSelectedImage?.id
                        ? theme.palette.primary.main
                        : "#ccc",
                    cursor: "pointer",
                  })}
                />
              ))}
          </Box>
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            sx={{
              order: { xs: 1, sm: 2 },
              maxHeight: 400,
            }}
          >
            <img
              src={currentSelectedImage?.image_url}
              alt="imagens"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>
        </Box>
      </Box>
    );
};

export default ImageList;
