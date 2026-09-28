import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { brand, colors, fonts } from "../brand";
import { EASE_IN_OUT, progress, useLayout } from "../components/anim";
import { FadeUp, RiseWords } from "../components/Rise";

// Hero headline from the site: muted first line, bright payoff, then a
// hand-drawn green underline under the promise.
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, pad } = useLayout();
  const underline = progress(frame, 40, 26, EASE_IN_OUT);
  const drift = progress(frame, 0, 126, (t) => t);
  const size = portrait ? 132 : 168;

  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: `0 ${pad}px` }}>
      <div style={{ transform: `translateX(${-drift * 30}px)` }}>
        <h1
          style={{
            margin: 0,
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: size,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
          }}
        >
          <div style={{ color: colors.grey400 }}>
            <RiseWords text={brand.headlineMuted} delay={2} stagger={5} />
          </div>
          <div style={{ color: colors.white, position: "relative", display: "inline-block" }}>
            <RiseWords text={brand.headline} delay={14} stagger={6} />
            <svg
              viewBox="0 0 600 40"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                left: portrait ? "2%" : "44%",
                bottom: -size * 0.14,
                width: portrait ? "96%" : "54%",
                height: size * 0.22,
                overflow: "visible",
              }}
            >
              <path
                d="M4 26 C 120 8, 260 6, 340 16 S 520 30, 596 12"
                fill="none"
                stroke={colors.green}
                strokeWidth={10}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - underline}
              />
            </svg>
          </div>
        </h1>
        <FadeUp delay={56} style={{ marginTop: 64, maxWidth: portrait ? 900 : 760 }}>
          <p
            style={{
              margin: 0,
              fontFamily: fonts.body,
              fontSize: portrait ? 40 : 36,
              lineHeight: 1.4,
              fontWeight: 500,
              color: colors.grey300,
            }}
          >
            <strong style={{ color: colors.white, fontWeight: 600 }}>{brand.sub}</strong>
          </p>
        </FadeUp>
      </div>
    </AbsoluteFill>
  );
};
