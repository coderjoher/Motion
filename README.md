# Jafer Nouri — Brand Films

Two motion pieces built with [Remotion](https://www.remotion.dev/) from the same content (`src/brand.ts`):

- **Brand Film**: styled to match the portfolio site.
- **Poster Film**: an independent editorial look that shares only the content (see below).

---

## Brand Film

A ~38 second motion piece for [Jafer Nouri's portfolio](https://portfolio-livid-delta-tesygsr8ax.vercel.app/),
built with [Remotion](https://www.remotion.dev/). Colours, type and motion come from the site:
monochrome with the `#12b33f` "available" green, Space Grotesk and Switzer, the
`cubic-bezier(0.4, 0, 0.2, 1)` tween, masked word rises, the floating pill nav and the
deck-to-grid project reveal.

| Composition         | Size      | Use                                   |
| ------------------- | --------- | ------------------------------------- |
| `BrandFilm`         | 1920×1080 | Website hero, LinkedIn, YouTube       |
| `BrandFilmVertical` | 1080×1920 | Instagram Reels, TikTok, Stories      |

Both are rendered from the same scenes. Each scene switches its layout when the frame is taller than it is wide.

## Running order

1. **Intro**: name rises over a preloader line, and a green dot lands as the full stop.
2. **Hook**: "Design that / delivers results." with a hand-drawn underline.
3. **Identity**: portrait reveal, availability badge, role, bio and signature.
4. **Services**: three cards with self-drawing icons and a spotlight that passes over each.
5. **Process**: a live mock-up that goes from wireframe to design to shipped (a cursor click and a deploy toast).
6. **Work**: project covers fly in as a tilted deck, settle into a 2×2 grid, then each one takes a turn in focus.
7. **Stats**: counters for years, clients, projects and rating.
8. **Outro**: "Let's design/build/create incredible work together.", the call-to-action, then the `JAFER` wordmark.

## Poster Film

A ~40 second cut with its own art direction. It uses warm paper, ink, signal orange, cobalt and
butter yellow. Headlines are set in huge condensed Anton, with Instrument Serif italics for the
voice and JetBrains Mono for captions. Scenes cut hard on a 120 bpm grid (every scene is a whole
number of 15-frame beats) behind stacked colour-bar wipes.

| Composition          | Size      |
| -------------------- | --------- |
| `PosterFilm`         | 1920×1080 |
| `PosterFilmVertical` | 1080×1920 |

1. **Open**: four word flashes on the beat (IDEAS. DESIGN. CODE. MOTION.), then the name slams in letter by letter.
2. **The designer**: halftone duotone portrait with orbiting caption text, a starburst sticker and the bio as a serif quote.
3. **Manifesto**: "Design that delivers results." as colour bands that slide in from alternating sides, with ghosted repeats.
4. **Services**: a rolling giant index number and a morphing shape, with story-style progress bars.
5. **Process**: a blueprint timeline with a wireframe, then a designed block, then a pulsing LIVE disc.
6. **Selected work**: a contact-sheet filmstrip that pans across the projects under a ticker.
7. **In numbers**: four colour panels wipe open on the half-beat while the counters roll up.
8. **Contact**: tickers, a rotating serif verb, then an orange flood to a `JN.` end card.

Code lives in `src/poster/`: `theme.ts` for palette, fonts and beat timing, `kit.tsx` for shared
pieces, and `scenes/` for the scenes.

---

## Commands

```bash
npm install
npm run dev              # Remotion Studio: live preview and scrubbing
npm run render           # out/jafer-nouri-brand.mp4
npm run render:vertical  # out/jafer-nouri-brand-vertical.mp4
npm run render:poster           # out/jafer-nouri-poster.mp4
npm run render:poster:vertical  # out/jafer-nouri-poster-vertical.mp4
npm run still            # out/thumbnail.png
```

## Editing

- **Copy, projects, stats, colours**: `src/brand.ts`
- **Scene lengths / order**: `src/timeline.ts`
- **Transitions**: `src/BrandFilm.tsx`
- **Images**: `public/images/`; fonts are bundled in `public/fonts/`, so renders work offline.

### Adding music

Drop a track in `public/` and add it inside `BrandFilm` in `src/BrandFilm.tsx`:

```tsx
import { Audio, staticFile } from "remotion";
// ...
<Audio src={staticFile("music.mp3")} volume={0.8} />
```
