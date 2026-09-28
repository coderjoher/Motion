import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { brand, colors, fonts } from "../brand";
import { EASE_OUT, progress, useLayout, useSpring } from "../components/anim";
import { Star } from "../components/Icons";
import { FadeUp, RiseWords } from "../components/Rise";

const Extra: React.FC<{ kind: "stars" | "avatars"; delay: number }> = ({ kind, delay }) => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  if (kind === "stars") {
    return (
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const s = spr(frame, delay + i * 3, { damping: 10, stiffness: 200 });
          return (
            <div key={i} style={{ transform: `scale(${s}) rotate(${(1 - s) * -90}deg)` }}>
              <Star size={26} color={colors.green} />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div style={{ display: "flex" }}>
      {brand.avatars.map((a, i) => {
        const s = spr(frame, delay + i * 3, { damping: 12 });
        return (
          <Img
            key={a}
            src={staticFile(a)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 99,
              marginLeft: i === 0 ? 0 : -12,
              border: `3px solid ${colors.bg}`,
              opacity: s,
              transform: `translateX(${(1 - s) * -20}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

// Proof in numbers: counters roll up between hairline dividers.
export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, pad } = useLayout();

  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: `0 ${pad}px`, gap: portrait ? 96 : 110 }}>
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: portrait ? 92 : 96,
          lineHeight: 1.02,
          letterSpacing: "-0.045em",
          color: colors.grey400,
        }}
      >
        <RiseWords text="Designing experiences" delay={0} stagger={4} />
        <br />
        <span style={{ color: colors.white }}>
          <RiseWords text="that solve real problems." delay={10} stagger={4} />
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: portrait ? "1fr 1fr" : "repeat(4, 1fr)",
          rowGap: 72,
        }}
      >
        {brand.stats.map((s, i) => {
          const delay = 16 + i * 6;
          const p = progress(frame, delay, 46, EASE_OUT);
          const line = progress(frame, delay - 6, 26, EASE_OUT);
          const shown = (s.value * p).toFixed(s.decimals);
          const firstInRow = portrait ? i % 2 === 0 : i === 0;
          return (
            <div key={s.label} style={{ position: "relative", paddingLeft: firstInRow ? 0 : 48 }}>
              {!firstInRow && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 1,
                    height: `${line * 100}%`,
                    background: colors.line,
                  }}
                />
              )}
              <FadeUp delay={delay} distance={40}>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 500,
                    fontSize: portrait ? 170 : 150,
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    color: colors.white,
                  }}
                >
                  {shown}
                  <span style={{ color: colors.green }}>{s.suffix}</span>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    fontFamily: fonts.body,
                    fontSize: 26,
                    fontWeight: 500,
                    color: colors.grey300,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ marginTop: 18, height: 40 }}>
                  {i === 1 && <Extra kind="avatars" delay={delay + 18} />}
                  {i === 3 && <Extra kind="stars" delay={delay + 18} />}
                </div>
              </FadeUp>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
