import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../brand";
import { EASE_IN_OUT, progress } from "./anim";

type IconKind = "handoff" | "frontend" | "motion";

// Stroke-drawn versions of the portfolio's service icons. `pathLength={1}`
// lets every path draw in with the same dash maths regardless of its length.
export const ServiceIcon: React.FC<{ kind: IconKind; delay?: number; size?: number }> = ({
  kind,
  delay = 0,
  size = 72,
}) => {
  const frame = useCurrentFrame();
  const draw = progress(frame, delay, 34, EASE_IN_OUT);
  const dot = progress(frame, delay + 20, 14);
  const stroke = {
    stroke: colors.green,
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1 - draw,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {kind === "motion" && (
        <>
          <path d="M9 47C25 47 33 13 51 13" {...stroke} />
          <circle cx="9" cy="47" r={5 * dot} fill={colors.green} />
          <circle cx="51" cy="13" r={5 * dot} fill={colors.green} />
        </>
      )}
      {kind === "frontend" && (
        <>
          <path d="m21 19-15 11 15 11" {...stroke} />
          <path d="M39 19l15 11-15 11" {...stroke} />
          <path d="M34 11 26 49" {...stroke} />
        </>
      )}
      {kind === "handoff" && (
        <g transform="translate(-2 1) scale(1.05)">
          <path d="M23.5 4.25h8v16.5h-8a8.25 8.25 0 0 1 0-16.5Z" {...stroke} strokeWidth={3} />
          <path d="M31.5 4.25h8a8.25 8.25 0 0 1 0 16.5h-8Z" {...stroke} strokeWidth={3} />
          <path d="M23.5 21.5h8V38h-8a8.25 8.25 0 0 1 0-16.5Z" {...stroke} strokeWidth={3} />
          <circle cx="40.6" cy="30" r="8.1" {...stroke} strokeWidth={3} />
          <path d="M23.5 39.25h8v8.25a8 8.25 0 1 1-8-8.25Z" {...stroke} strokeWidth={3} />
        </g>
      )}
    </svg>
  );
};

export const Star: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = colors.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 1 14.65 8.36 22.46 8.6 16.28 13.39 18.47 20.9 12 16.5 5.53 20.9 7.72 13.39 1.54 8.6 9.35 8.36Z" fill={color} />
  </svg>
);

export const Arrow: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = colors.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M7 17 17 7M8 7h9v9" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
