import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { brand } from "../brand";
import { Grain } from "../components/Background";
import { EASE_IN_OUT, progress } from "../components/anim";
import { Label } from "./kit";
import { Manifesto } from "./scenes/Manifesto";
import { Numbers } from "./scenes/Numbers";
import { Open } from "./scenes/Open";
import { Outro } from "./scenes/Outro";
import { Portrait } from "./scenes/Portrait";
import { Process } from "./scenes/Process";
import { Services } from "./scenes/Services";
import { Work } from "./scenes/Work";
import { PSceneId, WIPE, cobalt, ink, orange, paper, pTimeline } from "./theme";

const COMPONENTS: Record<PSceneId, React.FC> = {
  open: Open,
  portrait: Portrait,
  manifesto: Manifesto,
  services: Services,
  process: Process,
  work: Work,
  numbers: Numbers,
  outro: Outro,
};

const WIPE_COLORS = [ink, orange, cobalt, orange, ink, cobalt, orange];

/**
 * Hard cuts hidden behind two stacked colour bars that sweep across the frame:
 * the bars cover in the WIPE frames before a cut and uncover in the WIPE after.
 */
const Wipes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {pTimeline.slice(1).map((s, i) => {
        const t = s.start;
        if (frame < t - WIPE || frame > t + WIPE + 2) return null;
        const inP = progress(frame, t - WIPE, WIPE, EASE_IN_OUT);
        const outP = progress(frame, t, WIPE, EASE_IN_OUT);
        const back = progress(frame, t - WIPE + 2, WIPE, EASE_IN_OUT);
        const backOut = progress(frame, t + 2, WIPE, EASE_IN_OUT);
        const main = WIPE_COLORS[i % WIPE_COLORS.length];
        const second = main === ink ? orange : ink;
        return (
          <React.Fragment key={s.id}>
            <AbsoluteFill style={{ background: second, clipPath: `inset(0 ${(1 - inP) * 100}% 0 ${outP * 100}%)` }} />
            <AbsoluteFill style={{ background: main, clipPath: `inset(0 ${(1 - back) * 100}% 0 ${backOut * 100}%)` }} />
          </React.Fragment>
        );
      })}
    </>
  );
};

/** Magazine-style corner furniture: film title, section, running timecode. */
const Meta: React.FC = () => {
  const frame = useCurrentFrame();
  const current = [...pTimeline].reverse().find((s) => frame >= s.start) ?? pTimeline[0];
  const outro = pTimeline[pTimeline.length - 1];
  if (current.id === "open" || frame > outro.start + 110) return null;
  const color = current.dark ? paper : ink;
  const secs = frame / 30;
  const tc = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(Math.floor(secs % 60)).padStart(2, "0")}:${String(frame % 30).padStart(2, "0")}`;
  const edge = 36;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Label color={color} size={18} style={{ position: "absolute", top: edge, left: edge }}>
        {brand.firstName} {brand.lastName} — brand reel
      </Label>
      <Label color={color} size={18} style={{ position: "absolute", top: edge, right: edge }}>
        ({String(current.index).padStart(2, "0")}) {current.label}
      </Label>
      <Label color={color} size={18} style={{ position: "absolute", bottom: edge, right: edge }}>
        {tc}
      </Label>
    </AbsoluteFill>
  );
};

export const PosterFilm: React.FC = () => (
  <AbsoluteFill style={{ background: paper }}>
    {pTimeline.map((s) => {
      const Scene = COMPONENTS[s.id];
      return (
        <Sequence key={s.id} from={s.start} durationInFrames={s.duration} name={s.id}>
          <Scene />
        </Sequence>
      );
    })}
    <Meta />
    <Wipes />
    <Grain />
  </AbsoluteFill>
);
