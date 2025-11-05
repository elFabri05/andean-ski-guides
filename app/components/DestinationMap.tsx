'use client';

import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';

interface Destination {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

const destinations: Destination[] = [
  {
    name: 'Las Leñas',
    lat: -35.1592,
    lng: -70.0711,
    description: 'Premier ski resort with excellent powder snow and varied terrain'
  },
  {
    name: 'Paso los Pehuenches',
    lat: -35.9833,
    lng: -70.4000,
    description: 'Scenic mountain pass connecting Argentina and Chile through the Andes'
  },
  {
    name: 'Puente del Inca',
    lat: -32.8258,
    lng: -69.9092,
    description: 'Natural bridge formation with stunning thermal springs and historical ruins'
  }
];

const DestinationMap: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = React.useState<string | null>(null);

  // Get API key from environment variable
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <Alert severity="warning">
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Google Maps API key not configured</strong>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
            To display the map, please add your Google Maps API key to a <code>.env.local</code> file:
          </Typography>
          <Box
            component="pre"
            sx={{
              mt: 1,
              p: 1,
              backgroundColor: 'grey.100',
              borderRadius: 1,
              fontSize: '0.75rem',
              overflow: 'auto'
            }}
          >
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
          </Box>
        </Alert>
      </Box>
    );
  }

  // Center point between all destinations
  const center = { lat: -34.5, lng: -70.0 };

  return (
    <Box sx={{ width: '100%', height: { xs: 300, sm: 400, md: 500 }, borderRadius: 2, overflow: 'hidden' }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={7}
          mapId="andean-ski-guides-map"
          gestureHandling="cooperative"
        >
          {destinations.map((destination) => (
            <React.Fragment key={destination.name}>
              <AdvancedMarker
                position={{ lat: destination.lat, lng: destination.lng }}
                onClick={() => setSelectedMarker(destination.name)}
              />
              {selectedMarker === destination.name && (
                <InfoWindow
                  position={{ lat: destination.lat, lng: destination.lng }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div style={{ padding: '8px', maxWidth: '200px' }}>
                    <strong>{destination.name}</strong>
                    <br />
                    <span style={{ fontSize: '0.9em' }}>{destination.description}</span>
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          ))}
        </Map>
      </APIProvider>
    </Box>
  );
};

export default DestinationMap;
