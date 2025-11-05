'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  onTabChange: (tab: number) => void;
  currentTab: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTabChange, currentTab }) => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (index: number) => {
    onTabChange(index);
    setDrawerOpen(false);
  };

  const menuItems = [t('nav.home'), t('nav.tripDescription'), t('nav.contact')];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ px: { xs: 1, sm: 2 }, minHeight: { xs: 60, sm: 60, md: 70 } }}>
          {/* Logo Placeholder */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: 50, sm: 60, md: 70 },
              height: { xs: 50, sm: 60, md: 70 },
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
          </Box>

          {/* Desktop Navigation Tabs */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1 }}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: { sm: '0.875rem', md: '1rem' },
                    minWidth: { sm: 100, md: 120 },
                    '&.Mui-selected': {
                      color: '#fff',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#fff',
                  },
                }}
              >
                <Tab label="Home" />
                <Tab label="Trip Description" />
                <Tab label="Contact" />
              </Tabs>
            </Box>
          )}

          {/* Mobile Spacer */}
          {isMobile && <Box sx={{ flexGrow: 1 }} />}

          {/* Desktop Language Selector */}
          {!isMobile && <LanguageSelector />}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: 'background.paper',
            height: 'auto',
            maxHeight: '100%',
          },
        }}
      >
        <List sx={{ pt: 0, pb: 0 }}>
          {menuItems.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={currentTab === index}
                onClick={() => handleMenuItemClick(index)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          {/* Language Selector in Drawer */}
          <ListItem sx={{ pt: 2, pb: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ width: '100%', px: 2 }}>
              <LanguageSelector variant="drawer" />
            </Box>
          </ListItem>
        </List>
      </Drawer>

      {/* Hero Content */}
      {currentTab === 0 && (
        <Box
          sx={{
            background: 'linear-gradient(135deg, #D2691E 0%, #CD853F 100%)',
            color: 'white',
            py: { xs: 5.75, sm: 6.75, md: 7.75 },
            px: { xs: 2, sm: 3 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: { xs: 0, md: 0 },
              }}
            >
              {/* Logo */}
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 200, sm: 280, md: 400 },
                  height: { xs: 187, sm: 287, md: 287 },
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo2.png"
                  alt="Andean Ski Guides Logo 2"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>

              {/* Text Content */}
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, pt: { xs: 3, md: 0 } }}>
                <Typography
                  variant="h1"
                  component="h1"
                  textAlign="center"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.85rem', sm: '2.25rem', md: '2.75rem' },
                    fontWeight: { xs: 600, md: 700 },
                  }}
                >
                  {t('hero.title')}
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
                    fontStyle: 'italic',
                  }}
                >
                  {t('hero.subtitle')}
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      )}

      {/* Next Trip Banner */}
      {currentTab === 0 && (
        <Box
          sx={{
            backgroundColor: '#FF8C00',
            color: 'white',
            py: 2,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 600,
              }}
            >
              {t('hero.nextTrip')}
            </Typography>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default HeroSection;
