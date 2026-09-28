import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { brand } from "../../brand";
import { EASE_IN_OUT, lerp, progress, useLayout, useSpring } from "../../components/anim";
import { Label, Marquee } from "../kit";
import { cobalt, ink, orange, paper, type } from "../theme";

// A contact-sheet filmstrip that pans across the projects on an orange field.
export const Work: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait, width, height } = useLayout();

  const cardW = portrait ? 860 : 820;
  const cardH = cardW * 0.75;
  const caption = 150;
  const gap = portrait ? 90 : 110;
  const n = brand.projects.length;
  const stripLen = n * (portrait ? cardH + caption : cardW) + (n - 1) * gap;
  const viewport = portrait ? height - 520 : width;
  const lead = portrait ? 380 : 100;

  const pan = progress(frame, 12, 170, EASE_IN_OUT);
  const offset = lerp(portrait ? height * 0.4 : width * 0.55, -(stripLen - viewport) - (portrait ? 0 : 100), pan);

  return (
    <AbsoluteFill style={{ background: orange }}>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: portrait ? "column" : "row",
          gap,
          ...(portrait
            ? { left: (width - cardW) / 2, top: lead + offset }
            : { top: 260, left: offset }),
        }}
      >
        {brand.projects.map((p, i) => {
          const tilt = (i % 2 === 0 ? -1 : 1) * 2.2;
          const inS = spr(frame, i * 6, { damping: 14 });
          return (
            <div key={p.name} style={{ width: cardW, flexShrink: 0, transform: `rotate(${tilt * inS}deg)` }}>
              <div
                style={{
                  position: "relative",
                  width: cardW,
                  height: cardH,
                  background: paper,
                  padding: 18,
                  boxShadow: `18px 18px 0 ${ink}`,
                }}
              >
                <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                  <Img
                    src={staticFile(p.image)}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.15 - pan * 0.1})` }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: -26,
                    left: 30,
                    padding: "8px 16px",
                    background: i % 2 ? cobalt : ink,
                    color: paper,
                    fontFamily: type.mono,
                    fontSize: 22,
                    letterSpacing: "0.12em",
                  }}
                >
                  N°{String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div style={{ height: caption, paddingTop: 34, display: "flex", alignItems: "baseline", gap: 24, color: ink }}>
                <div style={{ fontFamily: type.poster, fontSize: 64, lineHeight: 1 }}>{p.name.toUpperCase()}</div>
                <div style={{ fontFamily: type.serif, fontStyle: "italic", fontSize: 36 }}>{p.category}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Marquee
        text={`Selected work ✺ ${n} projects ✺ ${brand.projects.map((p) => p.name).join(" ✺ ")} ✺`}
        color={orange}
        bg={ink}
        size={54}
        speed={5}
        style={{ position: "absolute", top: portrait ? 120 : 70, left: 0, right: 0 }}
      />
      <Label
        color={paper}
        style={{ position: "absolute", left: portrait ? 70 : 100, bottom: portrait ? 110 : 50, background: ink, padding: "10px 16px" }}
      >
        Contact sheet — {String(Math.min(n, Math.floor(pan * n) + 1)).padStart(2, "0")}/{String(n).padStart(2, "0")}
      </Label>
    </AbsoluteFill>
  );
};
