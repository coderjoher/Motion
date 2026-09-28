import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { brand } from "../../brand";
import { EASE_IN_OUT, EASE_OUT, lerp, progress, useLayout, useSpring } from "../../components/anim";
import { Label, Slam } from "../kit";
import { cobalt, ink, orange, paper, type } from "../theme";

const STOP = [30, 72, 114];

const Wireframe: React.FC<{ s: number; draw: number }> = ({ s, draw }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: "visible" }}>
    <path d="M4 4H96V96H4Z" fill="none" stroke={ink} strokeWidth={2.5} strokeDasharray="6 5" opacity={draw} />
    {["M4 4L96 96M96 4L4 96", "M16 20H64M16 32H52"].map((d) => (
      <path
        key={d}
        d={d}
        fill="none"
        stroke={ink}
        strokeWidth={1.5}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
    ))}
  </svg>
);

const Designed: React.FC<{ s: number; k: number }> = ({ s, k }) => (
  <div
    style={{
      width: s,
      height: s,
      borderRadius: s * 0.12,
      background: cobalt,
      padding: s * 0.13,
      display: "flex",
      flexDirection: "column",
      gap: s * 0.07,
      transform: `scale(${k}) rotate(${(1 - k) * -12}deg)`,
    }}
  >
    <div style={{ width: "70%", height: s * 0.1, background: paper }} />
    <div style={{ width: "45%", height: s * 0.1, background: paper, opacity: 0.6 }} />
    <div style={{ marginTop: "auto", width: s * 0.36, height: s * 0.16, borderRadius: 99, background: orange }} />
  </div>
);

const Live: React.FC<{ s: number; k: number }> = ({ s, k }) => {
  const frame = useCurrentFrame();
  const bounce = Math.abs(Math.sin(frame * 0.18)) * s * 0.18 * k;
  return (
    <div style={{ position: "relative", width: s, height: s, display: "grid", placeItems: "center" }}>
      {[0, 1, 2].map((i) => {
        const r = ((frame * 0.03 + i / 3) % 1) * k;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: s,
              height: s,
              borderRadius: 999,
              border: `3px solid ${orange}`,
              transform: `scale(${0.4 + r * 0.8})`,
              opacity: 1 - r,
            }}
          />
        );
      })}
      <div
        style={{
          width: s * 0.5,
          height: s * 0.5,
          borderRadius: 999,
          background: orange,
          transform: `translateY(${-bounce}px) scale(${k})`,
          display: "grid",
          placeItems: "center",
          fontFamily: type.poster,
          fontSize: s * 0.13,
          color: ink,
        }}
      >
        LIVE
      </div>
    </div>
  );
};

// Blueprint paper: a line runs through three stations and each station
// evolves one step further — wireframe, designed, alive.
export const Process: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait, width, height } = useLayout();

  const line = progress(frame, 18, 110, EASE_IN_OUT);
  const shape = 230;

  // Stations sit on a horizontal line (landscape) or a vertical one (portrait).
  const pad = portrait ? 140 : 340;
  const axisStart = pad;
  const axisEnd = (portrait ? height - 260 : width) - pad;
  const cross = portrait ? 360 : 680;
  const stationPos = (i: number) => lerp(axisStart + (portrait ? 500 : 0), axisEnd, i / 2);

  return (
    <AbsoluteFill
      style={{
        background: paper,
        backgroundImage:
          "linear-gradient(rgba(37,54,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(37,54,255,0.10) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div style={{ position: "absolute", left: portrait ? 70 : 100, top: portrait ? 150 : 110 }}>
        <Label color={cobalt} style={{ marginBottom: 16 }}>
          Process — sheet 03
        </Label>
        <div style={{ fontFamily: type.poster, fontSize: portrait ? 118 : 120, lineHeight: 0.95, color: ink }}>
          <Slam text="WIREFRAME" delay={0} stagger={1} />
          <span style={{ fontFamily: type.serif, fontStyle: "italic", color: orange }}> to </span>
          {portrait && <br />}
          <Slam text="LIVE SITE." delay={8} stagger={1} />
        </div>
      </div>

      {/* the axis */}
      <div
        style={{
          position: "absolute",
          background: ink,
          ...(portrait
            ? { left: cross, top: stationPos(0), width: 4, height: (stationPos(2) - stationPos(0)) * line }
            : { top: cross, left: stationPos(0), height: 4, width: (stationPos(2) - stationPos(0)) * line }),
        }}
      />

      {brand.process.map((st, i) => {
        const at = STOP[i];
        const k = spr(frame, at, { damping: 12, stiffness: 140 });
        const draw = progress(frame, at, 24, EASE_OUT);
        const text = progress(frame, at + 6, 14, EASE_OUT);
        const pos = stationPos(i);
        const shapeBox: React.CSSProperties = portrait
          ? { left: cross - shape - 50, top: pos - shape / 2 }
          : { left: pos - shape / 2, top: cross - shape - 60 };
        const textBox: React.CSSProperties = portrait
          ? { left: cross + 50, top: pos - 90, width: width - cross - 120 }
          : { left: pos - 220, top: cross + 44, width: 440, textAlign: "center" };

        return (
          <React.Fragment key={st.n}>
            <div style={{ position: "absolute", ...shapeBox }}>
              {i === 0 && <Wireframe s={shape} draw={draw} />}
              {i === 1 && <Designed s={shape} k={k} />}
              {i === 2 && <Live s={shape} k={k} />}
            </div>
            <div
              style={{
                position: "absolute",
                width: 28,
                height: 28,
                borderRadius: 99,
                background: i === 2 ? orange : ink,
                border: `4px solid ${paper}`,
                transform: `scale(${k})`,
                ...(portrait ? { left: cross - 12, top: pos - 14 } : { top: cross - 12, left: pos - 14 }),
              }}
            />
            <div style={{ position: "absolute", ...textBox, opacity: text, transform: `translateY(${(1 - text) * 20}px)` }}>
              <Label color={orange}>{st.n}</Label>
              <div style={{ fontFamily: type.poster, fontSize: 58, lineHeight: 1.05, color: ink, marginTop: 6 }}>
                {st.title.toUpperCase()}
              </div>
              <div style={{ fontFamily: type.serif, fontStyle: "italic", fontSize: 36, lineHeight: 1.1, color: ink, opacity: 0.75, marginTop: 6 }}>
                {st.body}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
