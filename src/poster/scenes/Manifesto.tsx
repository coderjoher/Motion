import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { brand } from "../../brand";
import { EASE_OUT, progress, useLayout } from "../../components/anim";
import { Label, Typed } from "../kit";
import { cobalt, ink, orange, paper, type } from "../theme";

type Band = { text: string; bg: string; fg: string; serif?: boolean; from: 1 | -1; drift: number };

// The headline broken into colour bands that slam in from alternating sides
// and keep drifting, like posters pasted over each other.
export const Manifesto: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, width, height } = useLayout();

  const [w1, w2] = brand.headlineMuted.split(" ");
  const [w3, w4] = brand.headline.split(" ");
  const bands: Band[] = [
    { text: w1, bg: paper, fg: ink, from: -1, drift: -1.2 },
    { text: w2, bg: paper, fg: orange, serif: true, from: 1, drift: 1.6 },
    { text: w3, bg: ink, fg: paper, from: -1, drift: -1.8 },
    { text: w4, bg: orange, fg: ink, from: 1, drift: 1.2 },
  ];

  const captionH = portrait ? 260 : 150;
  const bandH = (height - captionH - (portrait ? 180 : 110)) / bands.length;

  return (
    <AbsoluteFill style={{ background: paper, paddingTop: portrait ? 180 : 110 }}>
      {bands.map((b, i) => {
        const p = progress(frame, i * 7, 14, EASE_OUT);
        return (
          <div
            key={i}
            style={{
              height: bandH,
              background: b.bg,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              transform: `translateX(${(1 - p) * width * b.from}px)`,
            }}
          >
            <div
              style={{
                // negative drifts start further right so the first letter never leaves frame
                paddingLeft: (portrait ? 60 : 100) + Math.max(0, -b.drift) * 120,
                transform: `translateX(${frame * b.drift}px)`,
                fontFamily: b.serif ? type.serif : type.poster,
                fontStyle: b.serif ? "italic" : "normal",
                fontSize: (b.serif ? bandH * 1.08 : bandH * 0.98) * (portrait ? 0.7 : 1),
                lineHeight: 1,
                color: b.fg,
                textTransform: b.serif ? "lowercase" : "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {b.text}
              {i === 3 && <span style={{ color: cobalt }}>■</span>}
              {!b.serif &&
                [0, 1, 2].map((r) => (
                  <span
                    key={r}
                    style={{ marginLeft: "0.3em", color: "transparent", WebkitTextStroke: `2px ${b.fg}`, opacity: 0.35 - r * 0.1 }}
                  >
                    {b.text}
                  </span>
                ))}
            </div>
          </div>
        );
      })}
      <div
        style={{
          height: captionH,
          display: "flex",
          flexDirection: portrait ? "column" : "row",
          justifyContent: portrait ? "center" : "flex-start",
          alignItems: portrait ? "flex-start" : "center",
          gap: 20,
          padding: portrait ? "0 60px" : "0 100px",
        }}
      >
        <Label size={portrait ? 30 : 28} style={{ maxWidth: portrait ? 960 : 1200, lineHeight: 1.4 }}>
          <Typed text={brand.sub} delay={36} cps={2.2} />
        </Label>
      </div>
    </AbsoluteFill>
  );
};
