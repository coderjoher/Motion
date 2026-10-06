# NOTE: "First message" (Jafer Nouri)

Made with the motionmaxxing skill (github.com/Tejashmakwana/motionmaxxing): `brand.mjs` capture → `STORYBOARD.md` → `index.html` in the skill's runtime → `render.mjs` → `look.py` + `lint.mjs`. This note describes what I checked. It does not certify that the film is good; only you can judge that.

## The one idea, and why
The film is a UI documentary of one task, built on his own process line "From first message to live site". A first message becomes the site, and his cursor presses `العربية` so the **whole page mirrors to right-to-left Arabic**. That mirror is the hero. Jafer's FAQ makes this his point of difference ("Arabic pages are built right-to-left from the start… so they read naturally instead of feeling like a translation"), and a generic agency reel could not show it with his real Arabic copy. The film starts with a message *to* him and ends with the live site receiving its own first message (0 → 1).

## Beats and what each buys
| # | Frames | Buys: the viewer… |
|---|---|---|
| 1 hook | 0-105 | …sees one real ask begin (his chat, his face, his "Available" status, his placeholder line). |
| 2 proof | 105-225 | …watches the message become a plan (plan.fig wireframe), then his real sample site (build.fig). |
| 3 turn/proof (hero) | 225-360 | …sees the site *become* Arabic: every block crosses its centre line and lands in Arabic. |
| 4 proof | 360-446 | …sees it go live (LIVE ✦, "الموقع منشور / على نطاقك الخاص") and receive its first message: `راسلنا` is pressed and the count goes 0 → 1. |
| 5 proof | 446-524 | …sees it is not a mock-up: his four real client builds pass in a whip pan. |
| 6 cta | 524-590 | …knows who to message: headshot + "Jafer Nouri" + "Tell me about your business." (echoes the opening placeholder). |

## Real vs illustrative
- **Real (lifted from the live site, EN and /ar):** his name, headshot, "Available for new projects", "Tell me about your business"; the whole sample page (plan.fig / build.fig / yourwebsite.com, PLAN / BUILDING… / LIVE ✦, "Hero photo — your shop or team", "Service cards, 3 key offers", "Your business, open online, day and night.", the sub line, "Message us / Our services", the nav, "WhatsApp", the enquiries panel labels, the three service cards) and **every Arabic string**, copied verbatim from the site's Arabic version. Also the four project covers with their names and categories, the accent green (sampled from his badge, `#1ede55`), Space Grotesk / Switzer (captured), and his cursor style (black arrow + "Jafer" tag).
- **Rebuilt:** the chat panel is a rebuild in his site's grammar (square corners, his greys). It is not a capture of a real app.
- **Illustrative:** the client's message text ("Hi Jafer, we need a website in Arabic and English."), the visitor press, and the counter going 0 → 1. His own site labels that panel "Example figures" (أرقام توضيحية), and the film keeps that label on screen.
- **Not generated:** no image generation, no 3D, no stock.
- **Arabic font:** IBM Plex Sans Arabic (OFL, Google Fonts), the face his CSS falls back to. KO Sans, his first choice, was not available.
- **Sound:** none. This machine has no ElevenLabs key, so there is no VO, music or SFX. Cuts sit on a 30 f grid, so a 120 bpm bed can be laid under it.

## Gates (numbers printed by the skill's scripts)
GATES_PLACEHOLDER

## Each sheet frame in one sentence
SHEET_PLACEHOLDER

## What I would still improve
- **Sound.** With an ElevenLabs key: a key-click bed under the typing, a dropout just before the mirror, one soft hit on the 0 → 1, and the name on a VO line.
- **Smear.** The mirror uses a plain blur on fast moves. A true directional smear (the runtime's `smear` on `M.enter`) would read more like a whip.
- **Real work beat.** The strip passes the first three covers in about 1 s, so they read as volume rather than one by one. If that beat matters more to you, give it 0.5 s more.
- **Language.** The film is English-first. An Arabic-first cut (flip `EN` → `ع` the other way) would be the natural sibling for an Arabic feed.
- **Vertical.** No 1080x1920 version yet.
