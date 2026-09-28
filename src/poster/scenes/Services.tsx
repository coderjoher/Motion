import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { brand } from "../../brand";
import { EASE_IN_OUT, EASE_OUT, progress, useLayout } from "../../components/anim";
import { Label, Slam } from "../kit";
import { butter, cobalt, ink, orange, paper, type } from "../theme";

const PER = 55;
const COLORS = [orange, cobalt, butter];

/** One shape that becomes the next: square → circle → pill, turning as it goes. */
const Morph: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();
  const k1 = progress(frame, PER - 8, 16, EASE_IN_OUT);
  const k2 = progress(frame, PER * 2 - 8, 16, EASE_IN_OUT);
  const radius = interpolate(k1 - k2 * 0.5, [0, 1], [0, 50]);
  const w = size * (1 - k2 * 0.25);
  const h = size * (1 - k2 * 0.55);
  const color = k2 > 0.5 ? COLORS[2] : k1 > 0.5 ? COLORS[1] : COLORS[0];
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: `${radius}%`,
        background: color,
        transform: `rotate(${frame * 0.8 + k1 * 45 - k2 * 45}deg)`,
      }}
    />
  );
};

// A rolling index number and the service name, three times, on beat.
export const Services: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();

  const idx = Math.min(2, Math.floor(frame / PER));
  const s = brand.services[idx];
  const local = frame - idx * PER;
  const roll = [1, 2].reduce((acc, i) => acc + progress(frame, i * PER - 6, 12, EASE_IN_OUT), 0);
  const numSize = portrait ? 560 : 640;
  const body = progress(local, 14, 14, EASE_OUT);

  const number = (
    <div style={{ position: "relative", width: numSize * 1.05, height: numSize * 1.02, flexShrink: 0 }}>
      <div style={{ position: "absolute", left: "38%", top: "22%" }}>
        <Morph size={numSize * 0.62} />
      </div>
      <div style={{ position: "relative", height: numSize * 1.02, overflow: "hidden" }}>
        <div style={{ transform: `translateY(${-roll * numSize * 1.02}px)` }}>
          {["01", "02", "03"].map((n) => (
            <div
              key={n}
              style={{ fontFamily: type.poster, fontSize: numSize, lineHeight: 1.02, height: numSize * 1.02, color: paper, mixBlendMode: "difference" }}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const words = s.title.toUpperCase().split(" ");
  const text = (
    <div style={{ flex: portrait ? "none" : 1, minWidth: 0 }}>
      <Label color={COLORS[idx]} style={{ marginBottom: 24 }}>
        What I do — {idx + 1}/3
      </Label>
      <div key={idx} style={{ fontFamily: type.poster, fontSize: portrait ? 150 : 150, lineHeight: 0.92, color: paper }}>
        {words.map((w, i) => (
          <div key={w}>
            <Slam text={w} delay={idx * PER + i * 5} stagger={1} seed={`${idx}-${w}`} />
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 30,
          fontFamily: type.serif,
          fontStyle: "italic",
          fontSize: portrait ? 56 : 54,
          lineHeight: 1.1,
          color: paper,
          opacity: body * 0.85,
          transform: `translateY(${(1 - body) * 20}px)`,
          maxWidth: 780,
        }}
      >
        {s.body}
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={{ background: ink }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: portrait ? "column" : "row",
          alignItems: portrait ? "flex-start" : "center",
          justifyContent: "center",
          gap: portrait ? 20 : 40,
          padding: portrait ? "0 70px" : "0 100px",
        }}
      >
        {number}
        {text}
      </div>
      {/* story-style progress segments */}
      <div style={{ position: "absolute", left: portrait ? 70 : 100, right: portrait ? 70 : 100, bottom: portrait ? 150 : 90, display: "flex", gap: 12 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, height: 6, background: "rgba(239,232,220,0.2)" }}>
            <div style={{ height: "100%", width: `${progress(frame, i * PER, PER, (t) => t) * 100}%`, background: COLORS[i] }} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
