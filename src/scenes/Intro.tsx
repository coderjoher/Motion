import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { brand, colors, fonts } from "../brand";
import { EASE_IN_OUT, EASE_OUT, progress, useLayout, useSpring } from "../components/anim";
import { Rise } from "../components/Rise";

// The portfolio's preloader, scaled up: name rises word by word over a
// filling hairline, then a green "live" dot lands as the full stop.
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait } = useLayout();

  const line = progress(frame, 6, 62, EASE_IN_OUT);
  const dot = spr(frame, 44, { damping: 9, stiffness: 180 });
  const ring = progress(frame, 50, 30, EASE_OUT);
  const zoom = 1 + progress(frame, 0, 96, (t) => t) * 0.06;
  const size = portrait ? 170 : 220;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `scale(${zoom})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: size,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: colors.white,
            display: "flex",
            flexDirection: portrait ? "column" : "row",
            alignItems: portrait ? "flex-start" : "baseline",
            gap: portrait ? 0 : "0.22em",
          }}
        >
          <Rise delay={4} duration={26}>
            {brand.firstName}
          </Rise>
          <span style={{ display: "inline-flex", alignItems: "baseline" }}>
            <Rise delay={12} duration={26}>
              {brand.lastName}
            </Rise>
            <span style={{ position: "relative", width: size * 0.2, height: size * 0.2, marginLeft: size * 0.06 }}>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  background: colors.green,
                  transform: `scale(${dot})`,
                  boxShadow: `0 0 ${60 * dot}px ${colors.green}`,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  border: `3px solid ${colors.green}`,
                  transform: `scale(${1 + ring * 1.8})`,
                  opacity: (1 - ring) * (ring > 0 ? 1 : 0),
                }}
              />
            </span>
          </span>
        </div>

        <div
          style={{
            marginTop: 56,
            width: portrait ? 560 : 720,
            height: 2,
            background: colors.line,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div style={{ width: `${line * 100}%`, height: "100%", background: colors.white }} />
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: fonts.body,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: colors.grey400,
            opacity: progress(frame, 34, 20),
          }}
        >
          {brand.role}
        </div>
      </div>
    </AbsoluteFill>
  );
};
