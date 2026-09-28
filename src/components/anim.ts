import { Easing, interpolate, spring, useVideoConfig } from "remotion";

// The portfolio's shared tween curve: cubic-bezier(0.4, 0, 0.2, 1).
export const EASE_SITE = Easing.bezier(0.4, 0, 0.2, 1);
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 → 1 over [start, start + duration], eased. */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing: (t: number) => number = EASE_OUT,
) => interpolate(frame, [start, start + duration], [0, 1], { ...clamp, easing });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const useSpring = () => {
  const { fps } = useVideoConfig();
  return (frame: number, delay = 0, config: Parameters<typeof spring>[0]["config"] = {}) =>
    spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120, mass: 0.9, ...config } });
};

/** Layout helper: portrait renders stack content, landscape spreads it. */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return { portrait, width, height, pad: portrait ? 72 : 120 };
};
