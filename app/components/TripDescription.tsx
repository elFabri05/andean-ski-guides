'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import TerrainIcon from '@mui/icons-material/Terrain';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DestinationMap from './DestinationMap';

const TripDescription: React.FC = () => {
  

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, backgroundColor: 'background.default', px: { xs: 2, sm: 3 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            color: '#D2691E',
          }}
        >
          Andean Ski Guides: Experience the Magic of the Andes
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            color: '#CD853F',
            maxWidth: 800,
            mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1rem' },
            px: { xs: 2, sm: 0 },
            fontStyle: 'italic',
          }}
        >
          Discover your essence in the magic of the Andes, where untamed nature reigns beneath a sea of stars and the ancestral guardians fly dressed as condors.
        </Typography>

        <Box sx={{ mt: { xs: 4, sm: 5, md: 6 }, px: { xs: 1, sm: 0 } }}>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
          >
            Whether on skis or snowboards, we invite you to explore our snow-covered mountains, always prioritizing safety in avalanche terrain and the enjoyment of every participant on our adventures.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
          >
            Through constant training, we aim to provide you with confidence and joy so you can experience an unforgettable "Andean Ski Trip."
          </Typography>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              mt: 3,
              color: '#D2691E',
            }}
          >
            Explore the Cuyo Region
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
          >
            We'll journey through the Cuyo Region, a ski area surrounded by colossal mountains like Aconcagua.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
          >
            The varied snowpacks, orientations, and an average altitude of 3500 meters above sea level offer powder snow conditions that last for days.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
          >
            Enjoy the culture of the Andes through a ski trip.
          </Typography>

          {/* Destinations Map */}
          <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                mb: 3,
                color: '#D2691E',
                textAlign: 'center',
              }}
            >
              Our Destinations
            </Typography>
            <DestinationMap />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TripDescription;
