export const FPS = 30;
export const TRANSITION = 16;

// Order matters: this is the running order of the film.
export const SCENES = [
  { id: "intro", duration: 96, nav: null },
  { id: "hook", duration: 126, nav: null },
  { id: "identity", duration: 132, nav: null },
  { id: "services", duration: 156, nav: "Services" },
  { id: "process", duration: 210, nav: "Process" },
  { id: "work", duration: 204, nav: "Work" },
  { id: "stats", duration: 126, nav: null },
  { id: "outro", duration: 210, nav: "Contact" },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

// Absolute start frame of each scene once transitions overlap neighbours.
export const sceneStarts: Record<SceneId, number> = (() => {
  const out = {} as Record<SceneId, number>;
  let t = 0;
  for (const s of SCENES) {
    out[s.id] = t;
    t += s.duration - TRANSITION;
  }
  return out;
})();

export const TOTAL_FRAMES =
  SCENES.reduce((sum, s) => sum + s.duration, 0) - TRANSITION * (SCENES.length - 1);
