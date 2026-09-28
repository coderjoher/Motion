import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { brand } from "../../brand";
import { EASE_IN_OUT, EASE_OUT, progress, useLayout, useSpring } from "../../components/anim";
import { Label, Marquee, OrbitText, Slam } from "../kit";
import { cobalt, ink, orange, paper, type } from "../theme";

const WORD_LEN = 16;
const FLOOD_AT = 118;

// Tickers top and bottom, a serif word that won't sit still, then an orange
// disc floods the frame for the end card.
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait, width, height } = useLayout();

  const words = brand.outroWords;
  const wi = Math.min(words.length - 1, Math.floor(Math.max(0, frame - 14) / WORD_LEN));
  const wordLocal = frame - 14 - wi * WORD_LEN;
  const wordIn = progress(wordLocal, 0, 8, EASE_OUT);

  const flood = progress(frame, FLOOD_AT, 20, EASE_IN_OUT);
  const floodR = Math.hypot(width, height) * flood;
  const endIn = spr(frame, FLOOD_AT + 14, { damping: 12 });
  const badge = spr(frame, 40, { damping: 10 });

  const tick = `${brand.availability} ✺ ${brand.cta} ✺ ${brand.email} ✺`;

  return (
    <AbsoluteFill style={{ background: paper }}>
      <Marquee text={tick} color={paper} bg={ink} size={portrait ? 50 : 56} speed={7} style={{ position: "absolute", top: portrait ? 110 : 60, left: 0, right: 0 }} />
      <Marquee
        text={tick}
        color={ink}
        bg={orange}
        size={portrait ? 50 : 56}
        speed={-7}
        style={{ position: "absolute", bottom: portrait ? 110 : 60, left: 0, right: 0 }}
      />

      <AbsoluteFill style={{ justifyContent: "center", padding: portrait ? "0 70px" : "0 110px" }}>
        <div style={{ fontFamily: type.poster, fontSize: portrait ? 210 : 230, lineHeight: 0.92, color: ink }}>
          <Slam text="LET’S" delay={0} stagger={2} />{" "}
          <span
            style={{
              display: "inline-block",
              fontFamily: type.serif,
              fontStyle: "italic",
              color: [orange, cobalt, orange][wi],
              fontSize: "1.08em",
              transform: `translateY(${(1 - wordIn) * 40}px) rotate(${(1 - wordIn) * -6}deg)`,
              opacity: frame >= 14 ? wordIn : 0,
            }}
          >
            {words[wi]}
          </span>
          <br />
          <Slam text={brand.outroLine.toUpperCase()} delay={10} stagger={1} style={{ fontSize: portrait ? "0.5em" : "0.52em" }} />
        </div>
        <Label size={portrait ? 30 : 32} style={{ marginTop: 40, opacity: progress(frame, 50, 12) }}>
          → {brand.email}
        </Label>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          right: portrait ? 110 : 230,
          top: portrait ? 330 : height / 2 - 170,
          width: 260,
          height: 260,
          transform: `scale(${badge})`,
        }}
      >
        <Img src={staticFile(brand.headshot)} style={{ width: 260, height: 260, borderRadius: 999, objectFit: "cover", filter: "grayscale(1) contrast(1.2)" }} />
        <OrbitText text="BOOK A CALL ✺ BOOK A CALL ✺ " radius={165} color={ink} size={24} speed={1.2} />
      </div>

      {/* flood to end card */}
      <div
        style={{
          position: "absolute",
          left: width / 2 - floodR,
          top: height / 2 - floodR,
          width: floodR * 2,
          height: floodR * 2,
          borderRadius: 9999,
          background: orange,
        }}
      />
      {flood > 0.6 && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div
            style={{
              fontFamily: type.poster,
              fontSize: portrait ? 460 : 520,
              lineHeight: 0.85,
              color: ink,
              transform: `scale(${endIn})`,
            }}
          >
            JN<span style={{ color: paper }}>.</span>
          </div>
          <div style={{ fontFamily: type.serif, fontStyle: "italic", fontSize: portrait ? 64 : 72, color: ink, opacity: endIn }}>
            {brand.firstName} {brand.lastName}, {brand.role.toLowerCase()}
          </div>
          <Label size={28} color={ink} style={{ opacity: progress(frame, FLOOD_AT + 30, 12) }}>
            {brand.email}
          </Label>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
