'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: { xs: 35, md: 40 } }} />,
      title: 'Email',
      content: 'info@andeanskiguides.com',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: { xs: 35, md: 40 } }} />,
      title: 'Phone',
      content: '+56 9 XXXX XXXX',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: { xs: 35, md: 40 } }} />,
      title: 'Location',
      content: 'Santiago, Chile',
    },
  ];

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, backgroundColor: 'background.paper', px: { xs: 2, sm: 3 } }}>
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
          Get In Touch
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
          Ready to plan your Andean ski adventure? Contact us today and we'll help you create
          the perfect trip.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 2fr',
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Contact Information */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
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
                <Box>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Box>
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={{ xs: 4, sm: 6 }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      py: { xs: 1.2, md: 1.5 },
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
