
export const CUBING_EVENTS = [
  "3x3x3",
  "2x2x2",
  "4x4x4",
  "5x5x5",
  "6x6x6",
  "7x7x7",
  "Pyraminx",
  "Megaminx",
  "Square-1",
  "Skewb",
  "Clock",
  "3x3x3 BF",
] as const;

export type CubingEvents = (typeof CUBING_EVENTS)[number];
