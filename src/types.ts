export const CUBING_EVENTS = [
  "2x2",
  "3x3",
  "4x4",
  "5x5",
  "6x6",
  "7x7",
  "Square-1",
  "Pyraminx",
  "Clock",
  "Skewb",
  "Megaminx",
] as const;

export type CubingEvents = (typeof CUBING_EVENTS)[number];
