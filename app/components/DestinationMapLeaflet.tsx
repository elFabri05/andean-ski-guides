'use client';

import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { DESTINATIONS } from './destinations';

/**
 * Next's types declare a PNG import as StaticImageData, but the value that
 * actually arrives depends on the bundler: Turbopack hands back a plain URL
 * string, webpack an object with `.src`. Reading `.src` unconditionally
 * typechecks and then yields undefined at runtime under Turbopack, so accept
 * both shapes.
 */
const assetUrl = (asset: string | { src: string }): string =>
  typeof asset === 'string' ? asset : asset.src;

/**
 * Leaflet's default icon resolves its image URLs relative to leaflet.css, a
 * path no bundler preserves -- markers render as broken images unless the URLs
 * are pointed at the assets the bundler actually emitted.
 */
const destinationIcon = L.icon({
  iconUrl: assetUrl(markerIcon),
  iconRetinaUrl: assetUrl(markerIcon2x),
  shadowUrl: assetUrl(markerShadow),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// Also make it the default, so any marker added later is covered too.
L.Marker.prototype.options.icon = destinationIcon;

const BOUNDS_PADDING: L.FitBoundsOptions = { padding: [50, 50] };

/** Smallest box containing every destination. Recomputed if DESTINATIONS changes. */
const destinationBounds = L.latLngBounds(DESTINATIONS.map((d) => d.coords));

/**
 * Fits the viewport to the markers instead of a hardcoded center/zoom. Also
 * invalidates the size first: the map is mounted inside a responsive MUI box,
 * so Leaflet can measure a container that has not settled at its final height
 * yet and end up zoomed to a stale viewport.
 */
function FitToDestinations({ bounds }: { bounds: L.LatLngBounds }) {
  const map = useMap();

  React.useEffect(() => {
    map.invalidateSize();
    map.fitBounds(bounds, BOUNDS_PADDING);
  }, [map, bounds]);

  return null;
}

const DestinationMapLeaflet: React.FC = () => (
  // react-leaflet owns the map lifecycle and calls map.remove() on unmount, so
  // StrictMode's mount/unmount/remount cycle in dev cannot leave a second map
  // bound to the same container ("Map container is already initialized").
  // Nothing here touches the DOM directly, which is what would break that.
  <MapContainer
    bounds={destinationBounds}
    boundsOptions={BOUNDS_PADDING}
    scrollWheelZoom={false}
    // Leaflet sizes itself to its container, which therefore needs a real
    // height -- supplied by the wrapper in DestinationMap.tsx.
    style={{ width: '100%', height: '100%' }}
  >
    <TileLayer
      url="https://tile.osm.org/{z}/{x}/{y}.png"
      maxZoom={19}
      attribution="&copy; OpenStreetMap contributors"
    />
    <FitToDestinations bounds={destinationBounds} />
    {DESTINATIONS.map((destination) => (
      <Marker key={destination.name} position={destination.coords} icon={destinationIcon}>
        <Popup>
          <strong>{destination.name}</strong>
          {destination.description && (
            <>
              <br />
              <span style={{ fontSize: '0.9em' }}>{destination.description}</span>
            </>
          )}
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default DestinationMapLeaflet;
