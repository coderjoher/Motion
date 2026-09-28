import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../brand";

/**
 * Persistent stage under every scene: a slow-drifting dot grid (the pattern
 * behind the portfolio's project covers), a wandering green glow, a vignette
 * and animated film grain.
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame / 30;

  const gx = width * (0.5 + 0.28 * Math.sin(t * 0.35));
  const gy = height * (0.45 + 0.22 * Math.cos(t * 0.27));
  const gx2 = width * (0.5 + 0.3 * Math.cos(t * 0.21 + 1.4));
  const gy2 = height * (0.55 + 0.25 * Math.sin(t * 0.31 + 0.6));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle at ${gx}px ${gy}px, rgba(18,179,63,0.16), transparent 42%),
            radial-gradient(circle at ${gx2}px ${gy2}px, rgba(255,255,255,0.05), transparent 38%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1.4px, transparent 1.6px)",
          backgroundSize: "44px 44px",
          backgroundPosition: `${(frame * 0.35) % 44}px ${(frame * 0.2) % 44}px`,
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Film grain on top of everything; reseeded every other frame. */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 12;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: 0.07, mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%">
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};
