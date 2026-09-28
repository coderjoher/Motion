# Jafer Nouri — Brand Film

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

## Commands

```bash
npm install
npm run dev              # Remotion Studio: live preview and scrubbing
npm run render           # out/jafer-nouri-brand.mp4
npm run render:vertical  # out/jafer-nouri-brand-vertical.mp4
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
