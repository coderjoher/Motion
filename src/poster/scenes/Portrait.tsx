import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { brand } from "../../brand";
import { EASE_OUT, progress, useLayout, useSpring } from "../../components/anim";
import { HalftonePhoto, Label, OrbitText } from "../kit";
import { butter, cobalt, ink, orange, paper, type } from "../theme";

const Sticker: React.FC<{ delay: number; size: number }> = ({ delay, size }) => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const s = spr(frame, delay, { damping: 8, stiffness: 160 });
  const points = Array.from({ length: 24 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : 42;
    const a = (i / 24) * Math.PI * 2;
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <div style={{ position: "relative", width: size, height: size, transform: `scale(${s}) rotate(${frame * -1.2}deg)` }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: "absolute" }}>
        <polygon points={points} fill={butter} />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          fontFamily: type.poster,
          fontSize: size * 0.22,
          lineHeight: 0.95,
          color: ink,
        }}
      >
        {brand.stats[0].value} YRS
        <br />
        DESIGNING
      </div>
    </div>
  );
};

// "Fig. 01": a halftone duotone portrait with orbiting caption text.
export const Portrait: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait } = useLayout();

  const photo = portrait ? 620 : 600;
  const inS = spr(frame, 0, { damping: 14, stiffness: 100 });
  const words = brand.bio.split(" ");

  const figure = (
    <div
      style={{
        position: "relative",
        width: photo + 180,
        height: photo + 180,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        transform: `scale(${inS}) rotate(${(1 - inS) * -40}deg)`,
      }}
    >
      <HalftonePhoto src={brand.headshot} tint={orange} size={photo} />
      <OrbitText
        text={`${brand.role} ✺ ${brand.availability} ✺ `.toUpperCase()}
        radius={photo / 2 + 50}
        color={paper}
        size={26}
      />
      <div style={{ position: "absolute", right: 0, bottom: 30 }}>
        <Sticker delay={30} size={portrait ? 210 : 220} />
      </div>
    </div>
  );

  const quote = (
    <div style={{ maxWidth: portrait ? 900 : 760 }}>
      <Label color={butter} style={{ marginBottom: 28, opacity: progress(frame, 10, 10) }}>
        Fig. 01 — The designer
      </Label>
      <div style={{ fontFamily: type.serif, fontStyle: "italic", fontSize: portrait ? 96 : 104, lineHeight: 1.02, color: paper }}>
        “
        {words.map((w, i) => {
          const p = progress(frame, 16 + i * 3, 14, EASE_OUT);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: "0.22em",
                opacity: p,
                transform: `translateY(${(1 - p) * 30}px)`,
                color: w.startsWith("real") ? butter : paper,
              }}
            >
              {w}
            </span>
          );
        })}
        ”
      </div>
      <Label color={paper} style={{ marginTop: 36, opacity: progress(frame, 60, 12) }}>
        {brand.firstName} {brand.lastName}
      </Label>
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        background: cobalt,
        flexDirection: portrait ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: portrait ? 40 : 40,
        padding: portrait ? "0 70px" : "0 100px",
      }}
    >
      {figure}
      {quote}
    </AbsoluteFill>
  );
};
