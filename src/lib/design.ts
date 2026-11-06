export const STAGE = { w: 1600, h: 900 } as const;

export const EASE: readonly [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Colors used in SVG / inline styles. Mirrors the tokens in globals.css. */
export const C = {
  paper: "#fbfaf6",
  /** Background of the cover illustration, sampled from the image so the two meet without a seam. */
  cover: "#fdf6e5",
  surface: "#ffffff",
  surface2: "#f3f1ea",
  line: "#e3e0d6",
  ink: "#1a1a18",
  sub: "#4c4b46",
  mute: "#75736b",
  night: "#171715",
  a: "#c25a1c",
  aSoft: "#fdf1e8",
  d: "#1f63b8",
  dSoft: "#ebf3fd",
  o: "#13804f",
  oSoft: "#e8f6ee",
  t: "#6250d6",
  tSoft: "#f0eefc",
  ex: "#fff8dc",
  exLine: "#ecd889",
  exInk: "#6b5200",
  gray: "#c9c6bb",
  grayDark: "#6e6d66",
} as const;

export type Tone = "plain" | "a" | "d" | "o" | "t" | "ex" | "ink";
