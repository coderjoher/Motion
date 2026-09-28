import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { brand } from "../../brand";
import { EASE_OUT, progress, useLayout, useSpring } from "../../components/anim";
import { Label, Slam } from "../kit";
import { butter, cobalt, ink, orange, paper, type } from "../theme";

const FLASHES = [
  { word: "IDEAS.", bg: orange, fg: ink },
  { word: "DESIGN.", bg: ink, fg: paper },
  { word: "CODE.", bg: cobalt, fg: paper },
  { word: "MOTION.", bg: butter, fg: ink },
];
const FLASH_LEN = 12;
const NAME_AT = FLASHES.length * FLASH_LEN;

// Cold open: four hard-cut word flashes on the beat, then the name is
// slammed onto the page like wood type.
export const Open: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait, width } = useLayout();

  if (frame < NAME_AT) {
    const i = Math.floor(frame / FLASH_LEN);
    const f = FLASHES[i];
    const local = frame - i * FLASH_LEN;
    return (
      <AbsoluteFill style={{ background: f.bg, alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: type.poster,
            fontSize: portrait ? width * 0.27 : width * 0.2,
            color: f.fg,
            lineHeight: 1,
            transform: `scale(${1.12 - progress(local, 0, FLASH_LEN, EASE_OUT) * 0.12})`,
          }}
        >
          {f.word}
        </div>
        <Label color={f.fg} style={{ position: "absolute", bottom: 60, left: 60 }}>
          ({String(i + 1).padStart(2, "0")}/04)
        </Label>
      </AbsoluteFill>
    );
  }

  const t = frame - NAME_AT;
  const size = portrait ? 330 : 470;
  const disc = spr(t, 10, { damping: 12, stiffness: 90 });
  const shift = progress(t, 38, 16, EASE_OUT);
  const serif = progress(t, 24, 16, EASE_OUT);

  return (
    <AbsoluteFill style={{ background: paper, justifyContent: "center", padding: portrait ? "0 60px" : "0 100px" }}>
      <div
        style={{
          position: "absolute",
          width: size * 1.35,
          height: size * 1.35,
          borderRadius: 999,
          background: orange,
          right: portrait ? -size * 0.35 : size * 0.3,
          top: portrait ? "18%" : "12%",
          transform: `scale(${disc})`,
        }}
      />
      <div style={{ position: "relative", fontFamily: type.poster, fontSize: size, lineHeight: 0.88, color: ink }}>
        <div>
          <Slam text={brand.firstName.toUpperCase()} delay={0} stagger={2} />
        </div>
        <div style={{ transform: `translateX(${shift * (portrait ? 40 : 180)}px)` }}>
          <Slam text={brand.lastName.toUpperCase()} delay={8} stagger={2} />
        </div>
      </div>
      <div
        style={{
          position: "relative",
          marginTop: 40,
          marginLeft: portrait ? 0 : 8,
          fontFamily: type.serif,
          fontStyle: "italic",
          fontSize: portrait ? 76 : 92,
          color: ink,
          opacity: serif,
          transform: `translateX(${(1 - serif) * -60}px)`,
        }}
      >
        — {brand.role.toLowerCase()}
      </div>
    </AbsoluteFill>
  );
};
