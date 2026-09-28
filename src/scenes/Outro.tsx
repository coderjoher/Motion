import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { brand, colors, fonts } from "../brand";
import { EASE_IN_OUT, EASE_OUT, progress, useLayout, useSpring } from "../components/anim";
import { Arrow } from "../components/Icons";
import { FadeUp, Rise } from "../components/Rise";

const WORD_HOLD = 26;
const WORD_START = 16;

/** Slot-machine word from the site's footer: design → build → create. */
const RollingWord: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();
  const words = brand.outroWords;
  let pos = 0;
  for (let i = 1; i < words.length; i++) {
    pos += progress(frame, WORD_START + i * WORD_HOLD, 14, EASE_IN_OUT);
  }
  const lineH = size * 1.08;
  const current = words[Math.round(pos)];
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        height: lineH,
        overflow: "hidden",
        verticalAlign: "bottom",
        color: colors.green,
      }}
    >
      {/* reserves the width of the current word so the line reflows as it rolls */}
      <span style={{ visibility: "hidden" }}>{current ?? widest}</span>
      <span style={{ position: "absolute", left: 0, top: 0, transform: `translateY(${-pos * lineH}px)` }}>
        {words.map((w) => (
          <span key={w} style={{ display: "block", height: lineH, lineHeight: `${lineH}px` }}>
            {w}
          </span>
        ))}
      </span>
    </span>
  );
};

// Call to action and sign-off, ending on the giant footer wordmark.
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait, pad, width } = useLayout();

  const size = portrait ? 132 : 128;
  const cta = spr(frame, 86, { damping: 13 });
  const mark = progress(frame, 104, 40, EASE_OUT);
  const markSize = portrait ? width * 0.36 : width * 0.3;
  const shine = interpolate(frame, [140, 200], [-30, 130], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: pad,
          right: pad,
          top: portrait ? 540 : 190,
          display: "flex",
          flexDirection: "column",
          gap: portrait ? 64 : 56,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: size,
            lineHeight: 1.04,
            letterSpacing: "-0.045em",
            color: colors.white,
          }}
        >
          <Rise delay={2}>Let’s</Rise>{" "}
          <Rise delay={8}>
            <RollingWord size={size} />
          </Rise>
          <br />
          <span style={{ color: colors.grey400 }}>
            {brand.outroLine.split(" ").map((w, i) => (
              <React.Fragment key={i}>
                <Rise delay={16 + i * 5}>{w}</Rise>{" "}
              </React.Fragment>
            ))}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: portrait ? "column" : "row",
            alignItems: portrait ? "flex-start" : "center",
            gap: portrait ? 36 : 48,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              padding: "10px 30px 10px 10px",
              borderRadius: 60,
              background: colors.white,
              color: colors.bg,
              fontFamily: fonts.body,
              fontSize: 30,
              fontWeight: 600,
              transform: `scale(${cta})`,
              transformOrigin: "left center",
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 ${Math.max(0, cta - 0.9) * 60}px rgba(255,255,255,0.08)`,
            }}
          >
            <Img src={staticFile(brand.headshot)} style={{ width: 64, height: 64, borderRadius: 99, objectFit: "cover" }} />
            {brand.cta}
            <Arrow size={26} color={colors.bg} />
          </div>
          <FadeUp delay={98}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: fonts.body, fontSize: 32, fontWeight: 500, color: colors.grey300 }}>
              <span style={{ width: 12, height: 12, borderRadius: 99, background: colors.green, boxShadow: `0 0 16px ${colors.green}` }} />
              {brand.email}
            </div>
          </FadeUp>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -markSize * 0.2,
          textAlign: "center",
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: markSize,
          lineHeight: 1,
          letterSpacing: "-0.06em",
          transform: `translateY(${(1 - mark) * 60}%)`,
          opacity: mark,
          backgroundImage: `linear-gradient(100deg, #1c1c1c ${shine - 20}%, #3a3a3a ${shine}%, #1c1c1c ${shine + 20}%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {brand.wordmark}
      </div>
    </AbsoluteFill>
  );
};
