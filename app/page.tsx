'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import HeroSection from './components/HeroSection';
import ImageCarousel from './components/ImageCarousel';
import TripDescription from './components/TripDescription';
import Contact from './components/Contact';

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroSection onTabChange={setCurrentTab} currentTab={currentTab} />

      {currentTab === 0 && (
        <>
          <ImageCarousel />
          <TripDescription />
          <Contact />
        </>
      )}

      {currentTab === 1 && <TripDescription />}

      {currentTab === 2 && <Contact />}
    </Box>
  );
}
