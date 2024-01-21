import { Box } from '@mui/material'
import React, { useState } from 'react'


const images = [
  {
    id: 1,
    alt: 'image',
    imageUrl: 'https://a-static.mlcdn.com.br/800x560/notebook-lenovo-intel-celeron-dual-core-4gb-128gb-ssd-156-windows-11-microsoft-365-82vx0001br/magazineluiza/237317400/494ca3253d777a9f6e9c8655c9fad654.jpg'
  },
  {
    id: 2,
    alt: 'image',
    imageUrl: 'https://a-static.mlcdn.com.br/800x560/notebook-lenovo-intel-celeron-dual-core-4gb-128gb-ssd-156-windows-11-microsoft-365-82vx0001br/magazineluiza/237317400/dc4bc1e475cc70f4cbaa676d7896645d.jpg'
  },
  {
    id: 3,
    alt: 'image',
    imageUrl: 'https://a-static.mlcdn.com.br/800x560/notebook-lenovo-intel-celeron-dual-core-4gb-128gb-ssd-156-windows-11-microsoft-365-82vx0001br/magazineluiza/237317400/94f84e863e96be00dfbaa393834fe1eb.jpg'
  },
  {
    id: 4,
    alt: 'image',
    imageUrl: 'https://a-static.mlcdn.com.br/800x560/notebook-lenovo-intel-celeron-dual-core-4gb-128gb-ssd-156-windows-11-microsoft-365-82vx0001br/magazineluiza/237317400/4733343ee6580dead8e4b0e182453d90.jpg',
  }

];

const ImageList = () => {
  const [currentSelectedImage, setCurrentSelectedImage] = useState(images[0]);
  
    return (
    <Box width="100%">
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {images.map((image) => (
            <Box
              onMouseOver={() => setCurrentSelectedImage(image)}
              key={image.id}
              sx={(theme) => ({
                width: 110,
                height: 110,
                borderRadius: 2,
                backgroundImage: `url(${image.imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                border: '2px solid',
                borderColor: image.id === currentSelectedImage.id ? theme.palette.primary.main : '#ccc',
                cursor: 'pointer'
              })}
            />
          ))}
        </Box>
        <Box 
          flex={1}
          display="flex"
          justifyContent="center"
        >
          <img 
            src={currentSelectedImage?.imageUrl} 
            alt="imagens" 
            style={{ maxWidth: '100%' }}
          />
        </Box>
      </Box>
     
     
    </Box>
  )
}

export default ImageList