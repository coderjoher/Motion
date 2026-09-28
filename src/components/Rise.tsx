import React from "react";
import { useCurrentFrame } from "remotion";
import { EASE_OUT, progress } from "./anim";

/**
 * Masked rise — the portfolio's preloader move. Text slides up out of an
 * overflow-hidden line box, with a touch of blur while it travels.
 */
export const Rise: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, duration = 22, style }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, duration, EASE_OUT);
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "top",
        paddingBottom: "0.12em",
        marginBottom: "-0.12em",
        ...style,
      }}
    >
      <span
        style={{
          display: "inline-block",
          transform: `translateY(${(1 - p) * 115}%) rotate(${(1 - p) * 4}deg)`,
          transformOrigin: "left bottom",
          filter: `blur(${(1 - p) * 6}px)`,
        }}
      >
        {children}
      </span>
    </span>
  );
};

/** Splits a string into words that rise one after another. */
export const RiseWords: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 4, style }) => (
  <>
    {text.split(" ").map((w, i, arr) => (
      <React.Fragment key={i}>
        <Rise delay={delay + i * stagger} style={style}>
          {w}
        </Rise>
        {i < arr.length - 1 ? " " : null}
      </React.Fragment>
    ))}
  </>
);

/** Soft fade + lift for supporting copy. */
export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, duration = 24, distance = 24, style }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, duration, EASE_OUT);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * distance}px)`,
        filter: `blur(${(1 - p) * 4}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
