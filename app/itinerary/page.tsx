'use client';

import React from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

const ItineraryPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#D2691E',
              '&:hover': {
                backgroundColor: 'rgba(210, 105, 30, 0.1)',
              },
            }}
          >
            Back to Home
          </Button>
        </Box>

        {/* Page Title */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            color: '#D2691E',
            mb: 5,
            textAlign: 'center',
          }}
        >
          {t('itinerary.title')}
        </Typography>

        {/* Ski Paso Pehuenche - 4 Days */}
        <Card sx={{ mb: 6, boxShadow: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                color: '#D2691E',
                mb: 3,
              }}
            >
              {t('itinerary.pasoPehuenche4Days.title')}
            </Typography>
            <Box sx={{ pl: { xs: 1, md: 2 } }}>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.pasoPehuenche4Days.day1.title')}:</strong>{' '}
                {t('itinerary.pasoPehuenche4Days.day1.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.pasoPehuenche4Days.day2.title')}:</strong>{' '}
                {t('itinerary.pasoPehuenche4Days.day2.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.pasoPehuenche4Days.day3.title')}:</strong>{' '}
                {t('itinerary.pasoPehuenche4Days.day3.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 0 }}>
                <strong>{t('itinerary.pasoPehuenche4Days.day4.title')}:</strong>{' '}
                {t('itinerary.pasoPehuenche4Days.day4.description')}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Las Leñas - Paso Pehuenche - 8 Days */}
        <Card sx={{ mb: 6, boxShadow: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                color: '#D2691E',
                mb: 2,
              }}
            >
              {t('itinerary.lasLenasPehuenche8Days.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontStyle: 'italic',
                mb: 3,
                color: 'text.secondary',
              }}
            >
              {t('itinerary.lasLenasPehuenche8Days.summary')}
            </Typography>
            <Box sx={{ pl: { xs: 1, md: 2 } }}>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.lasLenasPehuenche8Days.day1.title')}:</strong>{' '}
                {t('itinerary.lasLenasPehuenche8Days.day1.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.lasLenasPehuenche8Days.day2.title')}:</strong>{' '}
                {t('itinerary.lasLenasPehuenche8Days.day2.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.lasLenasPehuenche8Days.day3.title')}:</strong>{' '}
                {t('itinerary.lasLenasPehuenche8Days.day3.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.lasLenasPehuenche8Days.day4.title')}:</strong>{' '}
                {t('itinerary.lasLenasPehuenche8Days.day4.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.lasLenasPehuenche8Days.day5.title')}:</strong>{' '}
                {t('itinerary.lasLenasPehuenche8Days.day5.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.lasLenasPehuenche8Days.day6.title')}:</strong>{' '}
                {t('itinerary.lasLenasPehuenche8Days.day6.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.lasLenasPehuenche8Days.day7.title')}:</strong>{' '}
                {t('itinerary.lasLenasPehuenche8Days.day7.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 0 }}>
                <strong>{t('itinerary.lasLenasPehuenche8Days.day8.title')}:</strong>{' '}
                {t('itinerary.lasLenasPehuenche8Days.day8.description')}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Andean Corridor of Aconcagua - 3-4 Days */}
        <Card sx={{ mb: 6, boxShadow: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                color: '#D2691E',
                mb: 3,
              }}
            >
              {t('itinerary.aconcagua3to4Days.title')}
            </Typography>
            <Box sx={{ pl: { xs: 1, md: 2 } }}>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.aconcagua3to4Days.day1.title')}:</strong>{' '}
                {t('itinerary.aconcagua3to4Days.day1.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.aconcagua3to4Days.day2.title')}:</strong>{' '}
                {t('itinerary.aconcagua3to4Days.day2.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>{t('itinerary.aconcagua3to4Days.day3.title')}:</strong>{' '}
                {t('itinerary.aconcagua3to4Days.day3.description')}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 0 }}>
                <strong>{t('itinerary.aconcagua3to4Days.day4.title')}:</strong>{' '}
                {t('itinerary.aconcagua3to4Days.day4.description')}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Andean Ski Trip - 12 Days */}
        <Card sx={{ mb: 6, boxShadow: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                color: '#D2691E',
                mb: 2,
              }}
            >
              {t('itinerary.andeanSkiTrip12Days.title')}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{
                mb: 3,
                fontSize: { xs: '0.95rem', md: '1rem' },
              }}
            >
              {t('itinerary.andeanSkiTrip12Days.description')}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#D2691E',
              }}
            >
              {t('itinerary.andeanSkiTrip12Days.includes.title')}
            </Typography>
            <Box sx={{ pl: { xs: 2, md: 3 } }}>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {t('itinerary.andeanSkiTrip12Days.includes.item1')}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {t('itinerary.andeanSkiTrip12Days.includes.item2')}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {t('itinerary.andeanSkiTrip12Days.includes.item3')}
                  </Typography>
                </li>
              </ul>
            </Box>

            <Typography
              variant="body1"
              sx={{
                mt: 3,
                fontStyle: 'italic',
                fontWeight: 500,
                color: '#D2691E',
              }}
            >
              {t('itinerary.andeanSkiTrip12Days.conclusion')}
            </Typography>
          </CardContent>
        </Card>

        {/* Back Button at Bottom */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={Link}
            href="/"
            variant="contained"
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
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ItineraryPage;
