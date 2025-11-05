'use client';

import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';

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
    name: 'Paso Pehuenche',
    lat: -35.9833,
    lng: -70.4000,
    description: 'Millenary Andean pass with endless ski touring opportunities'
  },
  {
    name: 'Andean Corridor',
    lat: -32.8258,
    lng: -69.9092,
    description: 'Ski at the feet of Aconcagua, the guardian of the Andes, at over 4,000 meters high'
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
              >
                <div style={{ position: 'relative', textAlign: 'center' }}>
                  <Pin />
                  <div
                    style={{
                      position: 'absolute',
                      top: '-30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      whiteSpace: 'nowrap',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#333',
                    }}
                  >
                    {destination.name}
                  </div>
                </div>
              </AdvancedMarker>
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
