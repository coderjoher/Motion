import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { brand, colors, fonts } from "../brand";
import { SCENES, TOTAL_FRAMES, TRANSITION, sceneStarts } from "../timeline";
import { EASE_SITE, progress, useLayout } from "./anim";

const LINKS = ["Work", "Services", "Process", "Contact"] as const;

/**
 * Overlay that rides above the scenes: the portfolio's floating pill nav
 * (active link follows the section on screen) and its green scroll-progress line.
 */
export const Hud: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();

  const showFrom = sceneStarts.hook + 10;
  const hideAt = sceneStarts.outro + 40;
  const inP = progress(frame, showFrom, 24, EASE_SITE);
  const outP = progress(frame, hideAt, 20, EASE_SITE);
  const visible = inP * (1 - outP);

  const current = [...SCENES].reverse().find((s) => frame >= sceneStarts[s.id] + TRANSITION / 2);
  const active = current?.nav ?? null;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: portrait ? 64 : 40,
          left: "50%",
          transform: `translate(-50%, ${(1 - inP) * -40 + outP * -40}px)`,
          opacity: visible,
          display: "flex",
          alignItems: "center",
          gap: portrait ? 0 : 56,
          padding: 10,
          paddingRight: portrait ? 22 : 10,
          borderRadius: 40,
          background: "rgba(20,20,20,0.6)",
          border: `1px solid ${colors.line}`,
          backdropFilter: "blur(12px)",
          fontFamily: fonts.body,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Img
            src={staticFile(brand.headshot)}
            style={{ width: 40, height: 40, borderRadius: 99, objectFit: "cover" }}
          />
          <span style={{ color: colors.white, fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>
            {brand.firstName} {brand.lastName}
          </span>
        </div>
        {!portrait && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {LINKS.map((l) => {
              const on = l === active;
              return (
                <span
                  key={l}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 30,
                    fontSize: 17,
                    fontWeight: 600,
                    color: on ? colors.bg : colors.grey400,
                    background: on ? colors.white : "transparent",
                  }}
                >
                  {l}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 5,
          width: `${interpolate(frame, [0, TOTAL_FRAMES - 1], [0, 100])}%`,
          background: colors.green,
          boxShadow: `0 0 24px ${colors.green}`,
        }}
      />
    </AbsoluteFill>
  );
};
