import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming, linearTiming } from "@remotion/transitions";
import type { TransitionPresentation, TransitionTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Background, Grain } from "./components/Background";
import { Hud } from "./components/Hud";
import "./components/Fonts";
import { Hook } from "./scenes/Hook";
import { Identity } from "./scenes/Identity";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { Process } from "./scenes/Process";
import { Services } from "./scenes/Services";
import { Stats } from "./scenes/Stats";
import { Work } from "./scenes/Work";
import { SCENES, SceneId, TRANSITION } from "./timeline";

const COMPONENTS: Record<SceneId, React.FC> = {
  intro: Intro,
  hook: Hook,
  identity: Identity,
  services: Services,
  process: Process,
  work: Work,
  stats: Stats,
  outro: Outro,
};

const spring = springTiming({ durationInFrames: TRANSITION, config: { damping: 200 } });
const linear = linearTiming({ durationInFrames: TRANSITION });

type AnyPresentation = TransitionPresentation<Record<string, unknown>>;
// Presentations have different prop types; erase them so they can share an array.
const loose = <T extends Record<string, unknown>>(p: TransitionPresentation<T>) => p as unknown as AnyPresentation;

// Transition that leads INTO each scene after the first.
const TRANSITIONS: { presentation: AnyPresentation; timing: TransitionTiming }[] = [
  { presentation: loose(fade()), timing: linear },
  { presentation: loose(slide({ direction: "from-bottom" })), timing: spring },
  { presentation: loose(fade()), timing: linear },
  { presentation: loose(slide({ direction: "from-right" })), timing: spring },
  { presentation: loose(wipe({ direction: "from-bottom-right" })), timing: spring },
  { presentation: loose(slide({ direction: "from-bottom" })), timing: spring },
  { presentation: loose(fade()), timing: linear },
];

export const BrandFilm: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <TransitionSeries>
      {SCENES.flatMap((s, i) => {
        const Scene = COMPONENTS[s.id];
        const seq = (
          <TransitionSeries.Sequence key={s.id} durationInFrames={s.duration} name={s.id}>
            <Scene />
          </TransitionSeries.Sequence>
        );
        if (i === 0) return [seq];
        const t = TRANSITIONS[i - 1];
        return [<TransitionSeries.Transition key={`${s.id}-in`} presentation={t.presentation} timing={t.timing} />, seq];
      })}
    </TransitionSeries>
    <Hud />
    <Grain />
  </AbsoluteFill>
);
