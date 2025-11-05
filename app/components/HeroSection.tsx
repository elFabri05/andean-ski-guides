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

interface HeroSectionProps {
  onTabChange: (tab: number) => void;
  currentTab: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTabChange, currentTab }) => {
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

  const menuItems = ['Home', 'Trip Description', 'Contact'];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ px: { xs: 1, sm: 2 }, minHeight: { xs: 70, sm: 80, md: 90 } }}>
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
            <Image
              src="/logo.png"
              alt="Andean Ski Guides Logo"
              width={70}
              height={70}
              style={{ objectFit: 'contain' }}
              priority
            />
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
          },
        }}
      >
        <List>
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
          <ListItem sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
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
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {/* Logo */}
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 200, sm: 280, md: 400 },
                  height: { xs: 133, sm: 187, md: 267 },
                  flexShrink: 0,
                  paddingLeft: 0,
                  marginLeft: 0,
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
              <Box sx={{ textAlign: 'left' }}>
                <Typography
                  variant="h1"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.85rem', sm: '2.25rem', md: '2.75rem' },
                    fontWeight: { xs: 600, md: 700 },
                  }}
                >
                  Andean Ski Guides
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    mt: 1.5,
                    opacity: 0.9,
                    fontSize: { xs: '1rem', sm: '1.15rem', md: '1.35rem' },
                  }}
                >
                  Experience the thrill of skiing in the majestic Andes Mountains
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default HeroSection;
