import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { brand, colors, fonts } from "../brand";
import { EASE_SITE, progress, useLayout, useSpring } from "../components/anim";
import { ServiceIcon } from "../components/Icons";
import { FadeUp, RiseWords } from "../components/Rise";

// "What I do." — three cards spring up, icons draw themselves, then a green
// spotlight walks across them one at a time.
export const Services: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait, pad } = useLayout();

  const spotStart = 64;
  const spotLen = 28;

  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: `0 ${pad}px`, gap: portrait ? 64 : 72 }}>
      <div>
        <FadeUp delay={0}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: colors.green,
              marginBottom: 20,
            }}
          >
            Services
          </div>
        </FadeUp>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: portrait ? 124 : 132,
            letterSpacing: "-0.045em",
            lineHeight: 1,
            color: colors.white,
          }}
        >
          <RiseWords text="What I do." delay={4} stagger={5} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: portrait ? "column" : "row", gap: 28 }}>
        {brand.services.map((s, i) => {
          const delay = 16 + i * 7;
          const inS = spr(frame, delay, { damping: 16, stiffness: 110 });
          const local = frame - (spotStart + i * spotLen);
          const lit = interpolate(local, [0, 8, spotLen, spotLen + 10], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_SITE,
          });
          const settled = progress(frame, spotStart + 3 * spotLen, 16, EASE_SITE);
          const glow = Math.max(lit, settled * 0.35);

          return (
            <div
              key={s.title}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: portrait ? "row" : "column",
                alignItems: portrait ? "center" : "flex-start",
                gap: portrait ? 36 : 40,
                padding: portrait ? "40px 44px" : "48px 44px",
                borderRadius: 32,
                background: `linear-gradient(160deg, ${colors.panelRaised}, ${colors.panel})`,
                border: `1px solid ${glow > 0.4 ? colors.green : colors.line}`,
                boxShadow: `0 0 ${80 * glow}px rgba(18,179,63,${0.35 * glow}), 0 30px 80px rgba(0,0,0,0.5)`,
                opacity: inS,
                transform: `translateY(${(1 - inS) * 160}px) rotate(${(1 - inS) * (i - 1) * 6}deg) scale(${1 + lit * 0.03})`,
              }}
            >
              <div
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: 28,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: colors.greenSoft,
                  border: `1px solid rgba(18,179,63,0.35)`,
                }}
              >
                <ServiceIcon kind={s.icon} delay={delay + 8} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 22,
                    fontWeight: 600,
                    color: colors.grey400,
                    marginBottom: 12,
                  }}
                >
                  0{i + 1}
                </div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: portrait ? 48 : 46,
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    color: colors.white,
                    marginBottom: 14,
                  }}
                >
                  {s.title}
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: portrait ? 28 : 26, lineHeight: 1.45, color: colors.grey300 }}>
                  {s.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
