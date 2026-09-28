import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { brand } from "../../brand";
import { EASE_IN_OUT, EASE_OUT, progress, useLayout } from "../../components/anim";
import { Label } from "../kit";
import { BEAT, butter, cobalt, ink, orange, paper, type } from "../theme";

const CELLS = [
  { bg: cobalt, fg: paper, accent: butter },
  { bg: paper, fg: ink, accent: orange },
  { bg: orange, fg: ink, accent: paper },
  { bg: ink, fg: paper, accent: butter },
];

// Four panels wipe open one per beat; each number counts up inside.
export const Numbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();

  return (
    <AbsoluteFill
      style={{
        background: ink,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      }}
    >
      {brand.stats.map((s, i) => {
        const c = CELLS[i];
        const at = i * (BEAT / 2);
        const wipe = progress(frame, at, 12, EASE_IN_OUT);
        const count = progress(frame, at + 4, 40, EASE_OUT);
        const fromLeft = i % 2 === 0;
        return (
          <div
            key={s.label}
            style={{
              position: "relative",
              background: c.bg,
              clipPath: fromLeft ? `inset(0 ${(1 - wipe) * 100}% 0 0)` : `inset(0 0 0 ${(1 - wipe) * 100}%)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: portrait ? "0 44px 90px" : "0 70px 50px",
              overflow: "hidden",
            }}
          >
            <Label color={c.fg} size={portrait ? 22 : 22} style={{ position: "absolute", top: portrait ? 150 : 90, left: portrait ? 44 : 70 }}>
              ({String(i + 1).padStart(2, "0")})
            </Label>
            <div style={{ fontFamily: type.poster, fontSize: portrait ? 330 : 330, lineHeight: 0.9, color: c.fg }}>
              {(s.value * count).toFixed(s.decimals)}
              <span style={{ color: c.accent }}>{s.suffix}</span>
            </div>
            <div
              style={{
                fontFamily: type.serif,
                fontStyle: "italic",
                fontSize: portrait ? 58 : 64,
                color: c.fg,
                marginTop: 10,
                opacity: progress(frame, at + 16, 12),
              }}
            >
              {s.label.toLowerCase()}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
