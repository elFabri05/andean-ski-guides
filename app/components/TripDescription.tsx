'use client';

import React from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DestinationMap from './DestinationMap';
import { useTranslation } from 'react-i18next';

const TripDescription: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: { xs: 5.75, sm: 6.75, md: 7.75 }, backgroundColor: 'background.default', px: { xs: 2, sm: 3 } }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              fontWeight: { xs: 600, md: 700 },
              color: '#D2691E',
              mb: 3,
            }}
          >
            {t('tripDescription.experienceTitle')}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.95rem', md: '1rem' },
              maxWidth: 800,
              mx: 'auto',
              mb: 2,
            }}
          >
            {t('tripDescription.experiencePara1')}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.95rem', md: '1rem' },
              maxWidth: 800,
              mx: 'auto',
              mb: { xs: 4, sm: 5, md: 6 },
            }}
          >
            {t('tripDescription.experiencePara2')}
          </Typography>

          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              fontWeight: { xs: 600, md: 700 },
              color: '#D2691E',
              mb: 3,
            }}
          >
            {t('tripDescription.cuyoTitle')}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.95rem', md: '1rem' },
              maxWidth: 800,
              mx: 'auto',
              mb: 2,
            }}
          >
            {t('tripDescription.cuyoPara1')}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.95rem', md: '1rem' },
              maxWidth: 800,
              mx: 'auto',
              mb: 2,
            }}
          >
            {t('tripDescription.cuyoPara2')}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.95rem', md: '1rem' },
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            {t('tripDescription.cuyoPara3')}
          </Typography>

          {/* Destinations Map */}
          <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                fontWeight: { xs: 600, md: 700 },
                color: '#D2691E',
                mb: 3,
              }}
            >
              {t('tripDescription.destinationsTitle')}
            </Typography>
            <DestinationMap />
          </Box>

          {/* Destination Descriptions */}
          <Box sx={{ mt: { xs: 4, sm: 5, md: 6 }, textAlign: 'left' }}>
            {/* Las Leñas */}
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              <Typography
                variant="h5"
                component="h4"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.5rem' },
                  fontWeight: { xs: 600, md: 700 },
                  color: '#D2691E',
                  mb: 2,
                }}
              >
                {t('tripDescription.lasLenas.title')}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  mb: 2,
                }}
              >
                {t('tripDescription.lasLenas.para1')}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  mb: 2,
                }}
              >
                {t('tripDescription.lasLenas.para2')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                }}
              >
                {t('tripDescription.lasLenas.para3')}
              </Typography>
            </Box>

            {/* Paso Pehuenche */}
            <Box sx={{ mb: { xs: 4, md: 5 } }}>
              <Typography
                variant="h5"
                component="h4"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.5rem' },
                  fontWeight: { xs: 600, md: 700 },
                  color: '#D2691E',
                  mb: 2,
                }}
              >
                {t('tripDescription.pasoPehuenche.title')}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  mb: 2,
                }}
              >
                {t('tripDescription.pasoPehuenche.para1')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                }}
              >
                {t('tripDescription.pasoPehuenche.para2')}
              </Typography>
            </Box>

            {/* Andean Corridor */}
            <Box>
              <Typography
                variant="h5"
                component="h4"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.5rem' },
                  fontWeight: { xs: 600, md: 700 },
                  color: '#D2691E',
                  mb: 2,
                }}
              >
                {t('tripDescription.andeanCorridor.title')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                }}
              >
                {t('tripDescription.andeanCorridor.para1')}
              </Typography>
            </Box>
          </Box>

          {/* Itinerary Button */}
          <Box sx={{ textAlign: 'center', mt: { xs: 5, sm: 6, md: 7 } }}>
            <Button
              component={Link}
              href="/itinerary"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#D2691E',
                color: '#fff',
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                fontWeight: 600,
                px: { xs: 3, md: 4 },
                py: { xs: 1.5, md: 2 },
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#B8571A',
                },
              }}
            >
              {t('tripDescription.itineraryButton')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TripDescription;
