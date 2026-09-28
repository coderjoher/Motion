// "Poster" cut — an editorial / risograph look that deliberately ignores the
// website's styling. Only the content (src/brand.ts) is shared.

export const ink = "#121110";
export const paper = "#efe8dc";
export const orange = "#ff4a1c";
export const cobalt = "#2536ff";
export const butter = "#ffd23f";

export const type = {
  poster: "'Anton', 'Impact', sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// 120 bpm at 30 fps: a beat every 15 frames. Scene lengths snap to beats so
// cuts land on the rhythm if you lay a 120 bpm track under it.
export const BEAT = 15;
export const WIPE = 8; // frames either side of a cut covered by the colour wipe

export const P_SCENES = [
  { id: "open", beats: 8, label: "Intro", dark: false },
  { id: "portrait", beats: 9, label: "The designer", dark: true },
  { id: "manifesto", beats: 8, label: "Manifesto", dark: false },
  { id: "services", beats: 11, label: "Services", dark: true },
  { id: "process", beats: 11, label: "Process", dark: false },
  { id: "work", beats: 13, label: "Selected work", dark: false },
  { id: "numbers", beats: 9, label: "In numbers", dark: true },
  { id: "outro", beats: 12, label: "Contact", dark: false },
] as const;

export type PSceneId = (typeof P_SCENES)[number]["id"];

export const pTimeline = (() => {
  let t = 0;
  return P_SCENES.map((s, i) => {
    const entry = { ...s, index: i + 1, start: t, duration: s.beats * BEAT };
    t += entry.duration;
    return entry;
  });
})();

export const P_TOTAL = pTimeline.reduce((sum, s) => sum + s.duration, 0);
