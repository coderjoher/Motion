import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { brand, colors, fonts } from "../brand";
import { EASE_SITE, lerp, progress, useLayout, useSpring } from "../components/anim";
import { Arrow } from "../components/Icons";
import { FadeUp, RiseWords } from "../components/Rise";

const LABEL_H = 64;
const GAP = 28;
const SPOT_AT = 108;
const SPOT_LEN = 23;

// The portfolio's signature move: project cards arrive as a tilted, scattered
// deck and settle into a 2×2 grid. Then each project takes a turn in focus.
export const Work: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait, pad, width } = useLayout();

  const cardW = portrait ? (width - pad * 2 - GAP) / 2 : 470;
  const cardH = cardW * 0.75;
  const gridW = cardW * 2 + GAP;
  const gridH = (cardH + LABEL_H) * 2 + GAP;

  const deckRot = [-9, 7, -3, 12];
  const offX = portrait ? 700 : 1100;
  const offY = portrait ? -1400 : -900;

  const title = (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, width: portrait ? "100%" : 560 }}>
      <FadeUp>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: colors.green,
          }}
        >
          Selected work
        </div>
      </FadeUp>
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: portrait ? 116 : 120,
          lineHeight: 0.98,
          letterSpacing: "-0.045em",
          color: colors.white,
        }}
      >
        <RiseWords text="Latest Projects" delay={4} stagger={6} />
      </div>
      <FadeUp delay={20}>
        <div style={{ fontFamily: fonts.body, fontSize: 32, lineHeight: 1.4, color: colors.grey300, maxWidth: 520 }}>
          No fluff, just hard-hitting design projects.
        </div>
      </FadeUp>
    </div>
  );

  const grid = (
    <div style={{ position: "relative", width: gridW, height: gridH, flexShrink: 0 }}>
      {brand.projects.map((p, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const slotX = col * (cardW + GAP);
        const slotY = row * (cardH + LABEL_H + GAP);
        const deckX = (gridW - cardW) / 2 + i * 10;
        const deckY = (gridH - cardH) / 2 - i * 10;

        const a = spr(frame, i * 5, { damping: 17, stiffness: 90 });
        const b = spr(frame, 44 + i * 3, { damping: 15, stiffness: 95 });

        const x = lerp(lerp(deckX + offX, deckX, a), slotX, b);
        const y = lerp(lerp(deckY + offY, deckY, a), slotY, b);
        const rot = lerp(lerp(deckRot[i] * 2.2, deckRot[i], a), 0, b);
        const scale = lerp(0.82, 1, b);

        const local = frame - (SPOT_AT + i * SPOT_LEN);
        const focus = interpolate(local, [0, 8, SPOT_LEN, SPOT_LEN + 8], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_SITE,
        });
        const anyFocus = frame >= SPOT_AT && frame < SPOT_AT + SPOT_LEN * brand.projects.length + 4;
        const dim = anyFocus ? lerp(0.45, 1, focus) : 1;
        const label = progress(frame, 78 + i * 4, 18);

        return (
          <div
            key={p.name}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: cardW,
              transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale * (1 + focus * 0.04)})`,
              zIndex: focus > 0 ? 10 : 4 - i,
              opacity: dim,
            }}
          >
            <div
              style={{
                position: "relative",
                width: cardW,
                height: cardH,
                borderRadius: 22,
                overflow: "hidden",
                border: `1px solid ${focus > 0.4 ? colors.green : "rgba(255,255,255,0.1)"}`,
                boxShadow: `0 40px 90px rgba(0,0,0,0.6), 0 0 ${60 * focus}px rgba(18,179,63,${0.4 * focus})`,
              }}
            >
              <Img
                src={staticFile(p.image)}
                style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.02 + focus * 0.08})` }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 18,
                  bottom: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: 30,
                  background: colors.white,
                  color: colors.bg,
                  fontFamily: fonts.body,
                  fontWeight: 600,
                  fontSize: 18,
                  opacity: focus,
                  transform: `translateY(${(1 - focus) * 20}px)`,
                }}
              >
                View Project <Arrow size={18} color={colors.bg} />
              </div>
            </div>
            <div
              style={{
                height: LABEL_H,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: 4,
                opacity: label,
                transform: `translateY(${(1 - label) * 12}px)`,
              }}
            >
              <div style={{ fontFamily: fonts.body, fontSize: 24, fontWeight: 600, color: colors.white }}>{p.name}</div>
              <div style={{ fontFamily: fonts.body, fontSize: 17, fontWeight: 600, color: colors.grey400 }}>{p.category}</div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        flexDirection: portrait ? "column" : "row",
        alignItems: portrait ? "flex-start" : "center",
        justifyContent: "center",
        gap: portrait ? 72 : 80,
        padding: portrait ? `160px ${pad}px 80px` : `110px ${pad}px 0`,
      }}
    >
      {title}
      {grid}
    </AbsoluteFill>
  );
};
