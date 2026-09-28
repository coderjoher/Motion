import { loadFont } from "@remotion/fonts";
import React from "react";
import { AbsoluteFill, Img, random, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE_IN_OUT, progress } from "../components/anim";
import { ink, paper, type } from "./theme";

export const posterFontsReady = Promise.all([
  loadFont({ family: "Anton", url: staticFile("fonts/Anton.woff2"), weight: "400" }),
  loadFont({
    family: "Instrument Serif",
    url: staticFile("fonts/InstrumentSerif-Italic.woff2"),
    style: "italic",
    weight: "400",
  }),
  loadFont({ family: "JetBrains Mono", url: staticFile("fonts/JetBrainsMono-500.woff2"), weight: "500" }),
]);

/**
 * Letters drop in one by one with a heavy, overshooting spring, as if each
 * were a wood type block being slammed onto the bed.
 */
export const Slam: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  seed?: string;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 2, seed = text, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let letterIndex = 0;
  return (
    <span style={{ display: "inline-block", ...style }}>
      {text.split(" ").map((word, w, words) => (
        <React.Fragment key={w}>
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((ch, i) => {
              const d = delay + letterIndex++ * stagger;
              const s = spring({ frame: frame - d, fps, config: { damping: 11, stiffness: 220, mass: 0.7 } });
              const r = (random(`${seed}-${w}-${i}`) - 0.5) * 30;
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    transform: `translateY(${(1 - s) * -120}%) rotate(${(1 - s) * r}deg) scale(${0.6 + s * 0.4})`,
                    opacity: frame >= d ? 1 : 0,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
};

/** Endless ticker band. */
export const Marquee: React.FC<{
  text: string;
  speed?: number;
  size?: number;
  color: string;
  bg: string;
  font?: string;
  height?: number;
  style?: React.CSSProperties;
}> = ({ text, speed = 6, size = 64, color, bg, font = type.poster, height, style }) => {
  const frame = useCurrentFrame();
  const unit = `${text} `;
  return (
    <div
      style={{
        background: bg,
        color,
        overflow: "hidden",
        whiteSpace: "nowrap",
        height: height ?? size * 1.5,
        display: "flex",
        alignItems: "center",
        fontFamily: font,
        fontSize: size,
        lineHeight: 1,
        textTransform: "uppercase",
        ...style,
      }}
    >
      <span style={{ display: "inline-block", transform: `translateX(${-((frame * speed) % 4000)}px)` }}>
        {unit.repeat(12)}
      </span>
    </div>
  );
};

/** Grey headshot multiplied onto a colour, then a paper halftone screen on top. */
export const HalftonePhoto: React.FC<{ src: string; tint: string; size: number; dot?: number }> = ({
  src,
  tint,
  size,
  dot = 9,
}) => (
  <div style={{ position: "relative", width: size, height: size, background: tint, overflow: "hidden", borderRadius: 999 }}>
    <Img
      src={staticFile(src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "grayscale(1) contrast(1.45) brightness(1.08)",
        mixBlendMode: "multiply",
      }}
    />
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(${paper} 28%, transparent 31%)`,
        backgroundSize: `${dot}px ${dot}px`,
        mixBlendMode: "soft-light",
        opacity: 0.9,
      }}
    />
  </div>
);

/** Circular text that spins around a centre. */
export const OrbitText: React.FC<{ text: string; radius: number; color: string; size?: number; speed?: number }> = ({
  text,
  radius,
  color,
  size = 30,
  speed = 0.6,
}) => {
  const frame = useCurrentFrame();
  const d = radius * 2 + size * 2;
  const c = d / 2;
  return (
    <svg
      width={d}
      height={d}
      style={{ position: "absolute", left: `calc(50% - ${c}px)`, top: `calc(50% - ${c}px)`, transform: `rotate(${frame * speed}deg)` }}
    >
      <defs>
        <path id={`orbit-${radius}`} d={`M ${c} ${c} m -${radius} 0 a ${radius} ${radius} 0 1 1 ${radius * 2} 0 a ${radius} ${radius} 0 1 1 -${radius * 2} 0`} />
      </defs>
      <text fill={color} style={{ fontFamily: type.mono, fontSize: size, letterSpacing: "0.18em" }}>
        <textPath href={`#orbit-${radius}`} textLength={Math.PI * 2 * radius - 8} lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
};

/** Small monospace label, the "caption" voice of the film. */
export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({
  children,
  color = ink,
  size = 22,
  style,
}) => (
  <div
    style={{
      fontFamily: type.mono,
      fontSize: size,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Typewriter reveal for mono captions. */
export const Typed: React.FC<{ text: string; delay?: number; cps?: number }> = ({ text, delay = 0, cps = 1.4 }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.floor((frame - delay) * cps));
  const caret = frame >= delay && Math.floor(frame / 8) % 2 === 0;
  return (
    <span>
      {text.slice(0, n)}
      <span style={{ opacity: caret ? 1 : 0 }}>▍</span>
    </span>
  );
};

/** Clip-path wipe from one edge, used to reveal blocks on a beat. */
export const useWipe = (delay: number, duration = 10) => {
  const frame = useCurrentFrame();
  return progress(frame, delay, duration, EASE_IN_OUT);
};
