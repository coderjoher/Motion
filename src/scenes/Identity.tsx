import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { brand, colors, fonts } from "../brand";
import { EASE_IN_OUT, EASE_OUT, progress, useLayout, useSpring } from "../components/anim";
import { FadeUp, Rise } from "../components/Rise";

const Badge: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const s = spr(frame, delay, { damping: 12 });
  const pulse = (frame % 40) / 40;
  return (
    <div
      style={{
        display: "inline-flex",
        alignSelf: "flex-start",
        alignItems: "center",
        gap: 14,
        padding: "12px 22px 12px 16px",
        borderRadius: 40,
        background: colors.white,
        transform: `scale(${s})`,
        transformOrigin: "left center",
        fontFamily: fonts.body,
        fontWeight: 600,
        fontSize: 22,
        color: colors.bg,
      }}
    >
      <span style={{ position: "relative", width: 20, height: 20 }}>
        <span style={{ position: "absolute", inset: 0, borderRadius: 99, background: colors.green, opacity: 0.25 }} />
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 99,
            background: colors.green,
            opacity: 0.4 * (1 - pulse),
            transform: `scale(${1 + pulse})`,
          }}
        />
        <span style={{ position: "absolute", inset: 5, borderRadius: 99, background: colors.green }} />
      </span>
      {brand.availability}
    </div>
  );
};

// Who's behind the work: portrait reveal, name, role, signature.
export const Identity: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, pad } = useLayout();

  const reveal = progress(frame, 0, 34, EASE_IN_OUT);
  const kenBurns = 1.25 - progress(frame, 0, 132, EASE_OUT) * 0.2;
  const sign = progress(frame, 52, 40, EASE_IN_OUT);
  const photo = portrait ? 620 : 640;

  return (
    <AbsoluteFill
      style={{
        flexDirection: portrait ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: portrait ? 72 : 110,
        padding: `0 ${pad}px`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: photo,
          height: photo,
          borderRadius: 40,
          overflow: "hidden",
          clipPath: `inset(${(1 - reveal) * 100}% 0 0 0 round 40px)`,
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          flexShrink: 0,
        }}
      >
        <Img
          src={staticFile(brand.headshot)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${kenBurns})`,
            filter: "grayscale(0.35) contrast(1.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 55%, rgba(5,5,5,0.55) 100%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, borderRadius: 40, border: "1px solid rgba(255,255,255,0.12)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: portrait ? 900 : 820 }}>
        <Badge delay={16} />
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: portrait ? 120 : 136,
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
            color: colors.white,
          }}
        >
          <Rise delay={20}>{brand.firstName}</Rise> <Rise delay={26}>{brand.lastName}</Rise>
        </div>
        <FadeUp delay={34}>
          <div style={{ fontFamily: fonts.body, fontSize: 40, fontWeight: 500, color: colors.green }}>
            {brand.role}
          </div>
        </FadeUp>
        <FadeUp delay={42}>
          <div style={{ fontFamily: fonts.body, fontSize: 32, lineHeight: 1.4, color: colors.grey300 }}>
            {brand.bio}
          </div>
        </FadeUp>
        <Img
          src={staticFile(brand.signature)}
          style={{
            width: portrait ? 380 : 420,
            marginTop: 8,
            clipPath: `inset(0 ${(1 - sign) * 100}% 0 0)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
