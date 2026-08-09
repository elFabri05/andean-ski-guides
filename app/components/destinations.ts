export interface Destination {
  name: string;
  /** [latitude, longitude] -- the tuple shape Leaflet accepts directly. */
  coords: [number, number];
  description: string;
}

/**
 * The pins shown on the destinations map. Editing this array is all that is
 * needed to add, remove or move a marker -- the map derives its viewport from
 * these coordinates rather than from a hardcoded center and zoom.
 */
export const DESTINATIONS: Destination[] = [
  {
    name: 'Puente del Inca',
    coords: [-32.8244, -69.9111],
    description: '', // TODO: description
  },
  {
    name: 'Las Leñas',
    coords: [-35.1497, -70.0806],
    description: '', // TODO: description
  },
  {
    name: 'Paso Pehuenche',
    coords: [-35.9772, -70.3931],
    description: '', // TODO: description
  },
];
