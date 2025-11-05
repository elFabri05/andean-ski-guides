'use client';

import React, { useEffect, useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  variant?: 'toolbar' | 'drawer';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'toolbar' }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const isToolbar = variant === 'toolbar';

  return (
    <FormControl size="small" fullWidth={!isToolbar}>
      <Select
        value={language}
        onChange={handleChange}
        sx={{
          color: isToolbar ? 'white' : 'text.primary',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: isToolbar ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: isToolbar ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: isToolbar ? 'white' : 'primary.main',
          },
          '& .MuiSvgIcon-root': {
            color: isToolbar ? 'white' : 'text.primary',
          },
        }}
        startAdornment={
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            <LanguageIcon sx={{ fontSize: 20 }} />
          </Box>
        }
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="de">Deutsch</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
