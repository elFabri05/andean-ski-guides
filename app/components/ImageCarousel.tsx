'use client';

import React, { useState, useEffect } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CarouselImage {
  url: string;
  alt: string;
}

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Static images from the public folder
  // Place your images in: public/images/carousel/
  const images: CarouselImage[] = [
    {
      url: '/images/carousel/image1.jpg',
      alt: 'Skiing in the Andes Mountains',
    },
    {
      url: '/images/carousel/image2.jpg',
      alt: 'Mountain peaks covered in snow',
    },
    {
      url: '/images/carousel/image3.jpg',
      alt: 'Ski resort in Chile',
    },
    {
      url: '/images/carousel/image4.jpg',
      alt: 'Backcountry skiing adventure',
    },
    {
      url: '/images/carousel/image5.jpg',
      alt: 'Andean ski adventure',
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 350, sm: 450, md: 600 },
        overflow: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      {/* Images Container */}
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
          height: '100%',
        }}
      >
        {images.map((image, index) => {
          // Determine background position based on image index
          let bgPosition = 'center';
          if (index === 0) bgPosition = 'center bottom'; // 0% from bottom
          if (index === 1) bgPosition = 'center'; // center
          if (index === 2) bgPosition = 'center 73%'; // 27% from bottom
          if (index === 3) bgPosition = 'center 77%'; // 23% from bottom
          if (index === 4) bgPosition = 'center'; // center

          return (
            <Box
              key={index}
              sx={{
                minWidth: '100%',
                height: '100%',
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: bgPosition,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.3))',
                },
              }}
            />
          );
        })}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={goToPrevious}
        sx={{
          position: 'absolute',
          left: { xs: 8, sm: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          },
          zIndex: 2,
          width: { xs: 40, sm: 48 },
          height: { xs: 40, sm: 48 },
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
      </IconButton>

      <IconButton
        onClick={goToNext}
        sx={{
          position: 'absolute',
          right: { xs: 8, sm: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          },
          zIndex: 2,
          width: { xs: 40, sm: 48 },
          height: { xs: 40, sm: 48 },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
      </IconButton>

      {/* Dots Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, sm: 24 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: { xs: 1, sm: 1.5 },
          zIndex: 2,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: { xs: 8, sm: 10 },
              height: { xs: 8, sm: 10 },
              borderRadius: '50%',
              backgroundColor:
                index === currentIndex
                  ? 'white'
                  : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'scale(1.2)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageCarousel;
