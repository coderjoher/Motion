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
| 6 cta | 524-578 | …knows who to message: headshot + "Jafer Nouri" + "Tell me about your business." (echoes the opening placeholder). |

## Real vs illustrative
- **Real (lifted from the live site, EN and /ar):** his name, headshot, "Available for new projects", "Tell me about your business"; the whole sample page (plan.fig / build.fig / yourwebsite.com, PLAN / BUILDING… / LIVE ✦, "Hero photo — your shop or team", "Service cards, 3 key offers", "Your business, open online, day and night.", the sub line, "Message us / Our services", the nav, "WhatsApp", the enquiries panel labels, the three service cards) and **every Arabic string**, copied verbatim from the site's Arabic version. Also the four project covers with their names and categories, the accent green (sampled from his badge, `#1ede55`), Space Grotesk / Switzer (captured), and his cursor style (black arrow + "Jafer" tag).
- **Rebuilt:** the chat panel is a rebuild in his site's grammar (square corners, his greys). It is not a capture of a real app.
- **Illustrative:** the client's message text ("Hi Jafer, we need a website in Arabic and English."), the visitor press, and the counter going 0 → 1. His own site labels that panel "Example figures" (أرقام توضيحية), and the film keeps that label on screen.
- **Not generated:** no image generation, no 3D, no stock.
- **Arabic font:** IBM Plex Sans Arabic (OFL, Google Fonts), the face his CSS falls back to. KO Sans, his first choice, was not available.
- **Sound:** none. This machine has no ElevenLabs key, so there is no VO, music or SFX. Cuts sit on a 30 f grid, so a 120 bpm bed can be laid under it.

## Gates (numbers printed by the skill's scripts)
Final render: `final.mp4`, 1920x1080, 30 fps, 578 frames (19.27 s), `--grain 0.03`, no audio.

| Gate | Result | Source |
|---|---|---|
| G0 render exists | **PASS**: "duration 19.27 s matches --expect 19.27 s; audio none (not required)" | `look.py` (`look-final/gates.json`) |
| G1 proof readable | **PASS by eye, no script number.** The input text is 48 px on screen. The page is ≥ 0.75 W at its widest. The camera macros the toggle, the Arabic headline (1.55x) and the counter (2.3x), and each cover is 0.40 W while the strip is moving. | sheet + stills |
| G2 no empty frame | **PASS**: "no run of > 3 flat frames" | `look.py` |
| G3 end card | **PASS**: "end hold 1.23 s (0.6-1.4); final shot 1.27 s = 7 % of the film (<= 25 %)" | `look.py` |
| G4 one hero per frame | **PASS by eye, no script number.** The chat panel, then one page, then the strip (two covers are in frame only while the strip moves), then the lockup. | sheet |
| G5 no page chrome | **PASS**: "GATE G5: PASS". One warning: V4 zinc-grey text (2 distinct): the `PLAN` chip and the toast's second line, both his sample site's own UI greys inside the page. | `lint.mjs` |

Also from the scripts:
- **Motion:** "mean frame-to-frame luma change 5.0/255 (human-made films: median 6.8, IQR 4.4-9.8): inside the human band".
- **Cuts:** 14 cuts from events, shot length mean 1.33 s.
- **Seek-safety:** `Motion.selfTest` (80 random jumps plus a sequential pass) gives `{"ok":true,"elements":250,"canvases":1,"mismatches":[]}`.

Earlier passes failed G3 (end hold 2.00 s, then 1.70 s, then 1.43 s). I fixed it by landing the lockup sooner and ending at f578. I also fixed one selfTest mismatch at f262 (the cursor press and the cursor path shared a scale track, so the press moved to an inner element) and one mid-move collision (the sent bubble passed under the input field).

## Each sheet frame in one sentence
From `look-final/sheet.jpg`, about every 1.2 s:
1. 0.6 s: the dark chat panel with his headshot, "Jafer Nouri" and the green "Available" square. The hero is the input with "Hi Jafer, we n" being typed. Not a slide: the text is changing.
2. 1.8 s: the sent bubble lifting out of the input field into the thread (it is drawn above the field, so the text visibly leaves it).
3. 3.0 s: deep in the dive. The bubble's sentence fills the frame width, white on the dark world.
4. 4.2 s: the plan.fig wireframe (dashed blocks, X-ed photo box, his annotations) as a lit page in the dot-lattice world.
5. 5.4 s: build.fig mid-cascade. Headline words rising, the enquiries panel in, one card still a dashed wireframe.
6. 6.6 s: his sample page fully designed (Your business, open online, day and night.).
7. 7.8 s: the camera pushing toward the nav. The `Jafer` cursor arriving at `العربية`, the headline cropped by the push.
8. 9.0 s: just after the mirror. Arabic nav, the Arabic headline on the right, the panel on the left, the cursor still at the old toggle spot.
9. 10.2 s: the settled right-to-left page, camera pulling in.
10. 11.4 s: macro on the Arabic headline (عملك، مفتوح على الإنترنت ليلا ونهارا.) with the buttons راسلنا / خدماتنا.
11. 12.6 s: LIVE ✦ chip (the scene's only green), yourwebsite.com, the toast "الموقع منشور / على نطاقك الخاص", and the cursor on راسلنا.
12. 13.8 s: macro on the counter. "1" for رسائل هذا الشهر, with his "أرقام توضيحية" (example figures) label.
13. 15.0 s: the real-work strip mid-pan (Bareeq Almas, Eishan, Computer Center, Al-Jawhara Archive).
14. 16.2 s: the strip decelerating onto Al-Jawhara Archive.
15. 17.4 s: the last cover contracting to a small square at its own centre (the container replacement).
16. 18.6 s: the lockup. Square headshot + "Jafer Nouri", and under it the green square + "Tell me about your business.", in the lit lattice.

**Thumbnail test.** At sheet size you can tell whose film it is (face and name in frames 1 and 16) and what it is about (a web page turning Arabic). **Cover test.** With the name covered, the mirror beat still says "bilingual web builds". It does not say *whose* until frames 13-16, where the real covers and the face carry it.

## What I would still improve
- **Sound.** With an ElevenLabs key: a key-click bed under the typing, a dropout just before the mirror, one soft hit on the 0 → 1, and the name on a VO line.
- **Smear.** The mirror uses a plain blur on fast moves. A true directional smear (the runtime's `smear` on `M.enter`) would read more like a whip.
- **Real work beat.** The strip passes the first three covers in about 1 s, so they read as volume rather than one by one. If that beat matters more to you, give it 0.5 s more.
- **Language.** The film is English-first. An Arabic-first cut (flip `EN` → `ع` the other way) would be the natural sibling for an Arabic feed.
- **Vertical.** No 1080x1920 version yet.
