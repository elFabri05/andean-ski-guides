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

const TripDescription: React.FC = () => {
  const features = [
    {
      icon: <TerrainIcon sx={{ fontSize: { xs: 40, md: 50 } }} />,
      title: 'Mountain Adventures',
      description: 'Explore pristine powder in the heart of the Andes',
    },
    {
      icon: <AcUnitIcon sx={{ fontSize: { xs: 40, md: 50 } }} />,
      title: 'Perfect Conditions',
      description: 'Experience optimal snow quality from June to October',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: { xs: 40, md: 50 } }} />,
      title: 'Expert Guides',
      description: 'Led by certified professionals with local expertise',
    },
    {
      icon: <CalendarMonthIcon sx={{ fontSize: { xs: 40, md: 50 } }} />,
      title: 'Flexible Schedules',
      description: 'Custom trips tailored to your skill level and timeline',
    },
  ];

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
          }}
        >
          Our Ski Trips
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            color: 'text.secondary',
            maxWidth: 800,
            mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1rem' },
            px: { xs: 2, sm: 0 },
          }}
        >
          Discover world-class skiing in the Southern Hemisphere's most spectacular mountain
          ranges. Our guided trips offer unforgettable experiences for skiers of all levels.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: { xs: 2, sm: 2.5, md: 3 },
                backgroundColor: 'background.paper',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: { xs: 4, sm: 5, md: 6 }, px: { xs: 1, sm: 0 } }}>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
          >
            What to Expect
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
          >
            Our ski trips combine adventure with safety, offering access to some of South America's
            most pristine skiing terrain. Whether you're seeking backcountry powder, resort skiing,
            or ski touring experiences, we have the perfect trip for you.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
          >
            Each trip includes experienced local guides, safety equipment, and transportation to
            the best snow conditions. We operate in various locations throughout the Andes,
            including Chile and Argentina, ensuring year-round opportunities for incredible skiing.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TripDescription;
