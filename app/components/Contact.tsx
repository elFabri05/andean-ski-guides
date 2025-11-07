'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: t('contact.form.success'),
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: t('contact.form.error'),
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: t('contact.form.errorGeneric'),
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: { xs: 35, md: 40 } }} />,
      title: t('contact.email'),
      content: 'andeanskiguides@gmail.com',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: { xs: 35, md: 40 } }} />,
      title: t('contact.phone'),
      content: '+43670550353',
    },
  ];

  return (
    <Box sx={{ py: { xs: 5.75, sm: 6.75, md: 7.75 }, backgroundColor: 'background.paper', px: { xs: 2, sm: 3 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            fontWeight: { xs: 600, md: 700 },
            color: '#D2691E',
            mb: 3,
          }}
        >
          {t('contact.title')}
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            maxWidth: 800,
            mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1rem' },
            px: { xs: 2, sm: 0 },
          }}
        >
          {t('contact.subtitle')}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'auto 1fr',
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Contact Information */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: '1fr',
              },
              gap: { xs: 2, md: 3 },
              width: { md: 'fit-content' },
            }}
          >
            {contactInfo.map((info, index) => (
              <Paper
                key={index}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  textAlign: 'center',
                  backgroundColor: 'background.default',
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 1 }}>
                  {info.icon}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                >
                  {info.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                >
                  {info.content}
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Contact Form */}
          <Paper sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                  },
                  gap: { xs: 2, sm: 2.5, md: 3 },
                }}
              >
                {status.type && (
                  <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                    <Alert severity={status.type} sx={{ mb: 2 }}>
                      {status.message}
                    </Alert>
                  </Box>
                )}
                <Box>
                  <TextField
                    fullWidth
                    label={t('contact.form.name')}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label={t('contact.form.email')}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </Box>
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <TextField
                    fullWidth
                    label={t('contact.form.phone')}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Box>
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <TextField
                    fullWidth
                    label={t('contact.form.message')}
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </Box>
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{
                      py: { xs: 1.2, md: 1.5 },
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      t('contact.form.submit')
                    )}
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Box>

        {/* Instagram Section */}
        <Box
          sx={{
            mt: { xs: 4, sm: 5, md: 6 },
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 500,
            }}
          >
            {t('contact.followUs')}
          </Typography>
          <a
            href="https://www.instagram.com/andeanskiguides/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              gap: '8px',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '36px', height: '36px' }}
            >
              <defs>
                <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#f09433', stopOpacity: 1 }} />
                  <stop offset="25%" style={{ stopColor: '#e6683c', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#dc2743', stopOpacity: 1 }} />
                  <stop offset="75%" style={{ stopColor: '#cc2366', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#bc1888', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                fill="url(#instagram-gradient)"
              />
            </svg>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              @andeanskiguides
            </Typography>
          </a>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
