'use client';

import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { FALLBACK_LNG, SUPPORTED_LNGS } from '../i18n';

interface LanguageSelectorProps {
  variant?: 'toolbar' | 'drawer';
}

/** Each language named in itself. Typed so a new SUPPORTED_LNGS entry won't compile without a label. */
const LANGUAGE_LABELS: Record<(typeof SUPPORTED_LNGS)[number], string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'toolbar' }) => {
  const { i18n } = useTranslation();

  // Read straight from i18next rather than mirrored into state: useTranslation
  // re-renders on languageChanged, and i18n starts pinned to English on server
  // and client alike, so there is no mismatch left to guard against. The
  // supported-language check keeps MUI from warning on an out-of-range value.
  const resolved = i18n.resolvedLanguage ?? FALLBACK_LNG;
  const language: (typeof SUPPORTED_LNGS)[number] =
    resolved in LANGUAGE_LABELS
      ? (resolved as (typeof SUPPORTED_LNGS)[number])
      : FALLBACK_LNG;

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
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
        {SUPPORTED_LNGS.map((lng) => (
          <MenuItem key={lng} value={lng}>
            {LANGUAGE_LABELS[lng]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
