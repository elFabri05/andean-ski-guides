'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Skeleton } from '@mui/material';

export { DESTINATIONS } from './destinations';
export type { Destination } from './destinations';

/**
 * Leaflet reaches for `window` at import time, so the map itself is loaded
 * client-side only. Everything Leaflet-specific lives in DestinationMapLeaflet.
 */
const DestinationMapLeaflet = dynamic(() => import('./DestinationMapLeaflet'), {
  ssr: false,
  loading: () => <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%' }} />,
});

const DestinationMap: React.FC = () => (
  // The explicit height is load-bearing: Leaflet sizes itself to its container,
  // and a container with no height collapses to 0px and renders nothing.
  <Box sx={{ width: '100%', height: { xs: 300, sm: 400, md: 500 }, borderRadius: 2, overflow: 'hidden' }}>
    <DestinationMapLeaflet />
  </Box>
);

export default DestinationMap;
