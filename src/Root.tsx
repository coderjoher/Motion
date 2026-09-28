import React from "react";
import { Composition } from "remotion";
import { BrandFilm } from "./BrandFilm";
import { FPS, TOTAL_FRAMES } from "./timeline";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="BrandFilm" component={BrandFilm} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition
      id="BrandFilmVertical"
      component={BrandFilm}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  </>
);
