import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { brand, colors, fonts } from "../brand";
import { EASE_IN_OUT, EASE_OUT, EASE_SITE, lerp, progress, useLayout, useSpring } from "../components/anim";
import { FadeUp, RiseWords } from "../components/Rise";

// Stage boundaries inside this scene.
const DESIGN_AT = 62;
const LIVE_AT = 130;

const SITE_W = 1000;
const CHROME_H = 52;
const BODY_H = 600;

type Rect = { x: number; y: number; w: number; h: number };
const R = {
  nav: { x: 32, y: 20, w: 936, h: 44 },
  badge: { x: 48, y: 100, w: 210, h: 32 },
  h1: { x: 48, y: 146, w: 480, h: 176 },
  sub: { x: 48, y: 336, w: 430, h: 52 },
  btns: { x: 48, y: 408, w: 380, h: 54 },
  card: { x: 560, y: 100, w: 408, h: 362 },
  feats: { x: 32, y: 492, w: 936, h: 84 },
} satisfies Record<string, Rect>;

const box = (r: Rect): React.CSSProperties => ({
  position: "absolute",
  left: r.x,
  top: r.y,
  width: r.w,
  height: r.h,
});

const WireBox: React.FC<{ r: Rect; label: string; bars?: number[]; delay: number }> = ({ r, label, bars = [], delay }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, 16, EASE_OUT);
  return (
    <div
      style={{
        ...box(r),
        border: "2px dashed rgba(255,255,255,0.28)",
        borderRadius: 12,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        opacity: p,
        transform: `scale(${lerp(0.94, 1, p)})`,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 8,
          left: 12,
          fontFamily: "ui-monospace, monospace",
          fontSize: 13,
          color: colors.green,
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      {bars.map((w, i) => (
        <div key={i} style={{ width: `${w}%`, height: 12, borderRadius: 6, background: "rgba(255,255,255,0.14)" }} />
      ))}
    </div>
  );
};

/** A tiny landing page that is wireframed, then designed, then shipped. */
const MockSite: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const d = progress(frame, DESIGN_AT, 26, EASE_IN_OUT);
  const live = progress(frame, LIVE_AT, 20, EASE_IN_OUT);
  const el = (i: number) => spr(frame, DESIGN_AT + 4 + i * 4, { damping: 14, stiffness: 150 });

  const stage = frame < DESIGN_AT + 8 ? 0 : frame < LIVE_AT + 4 ? 1 : 2;
  const url = ["wireframe.fig", "design.fig", "yourwebsite.com"][stage];
  const chip = [
    { t: "WIREFRAME", bg: "#2b2b2b", fg: colors.grey300 },
    { t: "DESIGNING…", bg: "#3a2f0b", fg: "#f5c542" },
    { t: "LIVE ✦", bg: "rgba(18,179,63,0.18)", fg: colors.green },
  ][stage];

  const visitors = Math.round(interpolate(live, [0, 1], [0, 48210]) * progress(frame, LIVE_AT, 50, EASE_OUT));
  const bars = [0.35, 0.5, 0.42, 0.62, 0.55, 0.78, 0.7, 0.95];

  // Cursor glides to the primary CTA and clicks it.
  const cur = progress(frame, LIVE_AT + 20, 30, EASE_IN_OUT);
  const click = interpolate(frame, [LIVE_AT + 52, LIVE_AT + 56, LIVE_AT + 62], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple = progress(frame, LIVE_AT + 54, 22, EASE_OUT);
  const toast = spr(frame, LIVE_AT + 58, { damping: 14 });

  const dark = colors.bg;
  const ink = "#0b0b0b";

  return (
    <div
      style={{
        width: SITE_W,
        height: CHROME_H + BODY_H,
        borderRadius: 22,
        overflow: "hidden",
        background: "#0d0d0d",
        border: `1px solid ${colors.line}`,
        boxShadow: `0 60px 140px rgba(0,0,0,0.7), 0 0 ${120 * live}px rgba(18,179,63,${0.25 * live})`,
        fontFamily: fonts.body,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: CHROME_H,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 8,
          background: "#171717",
          borderBottom: `1px solid ${colors.line}`,
          position: "relative",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: 13, height: 13, borderRadius: 99, background: c }} />
        ))}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "7px 60px",
            borderRadius: 10,
            background: "#0d0d0d",
            color: colors.grey300,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {url}
        </div>
        <div
          style={{
            marginLeft: "auto",
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.08em",
            background: chip.bg,
            color: chip.fg,
          }}
        >
          {chip.t}
        </div>
      </div>

      {/* Page body */}
      <div style={{ position: "relative", height: BODY_H, overflow: "hidden" }}>
        {/* wireframe layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 1 - d,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        >
          <WireBox r={R.nav} label="NAV" bars={[]} delay={4} />
          <WireBox r={R.badge} label="" bars={[70]} delay={8} />
          <WireBox r={R.h1} label="H1 — value proposition" bars={[92, 84, 60]} delay={12} />
          <WireBox r={R.sub} label="" bars={[90, 55]} delay={16} />
          <WireBox r={R.btns} label="CTA ×2" bars={[]} delay={20} />
          <WireBox r={R.card} label="Product shot — dashboard, live data" bars={[40, 80, 65]} delay={24} />
          <WireBox r={R.feats} label="Social proof cards, 3 key benefits" bars={[]} delay={28} />
        </div>

        {/* designed layer */}
        <div style={{ position: "absolute", inset: 0, opacity: d, background: "#fafafa", color: ink }}>
          <div
            style={{
              ...box(R.nav),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: el(0),
              transform: `translateY(${(1 - el(0)) * -20}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 18 }}>
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: ink,
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 15,
                  fontFamily: fonts.display,
                }}
              >
                Y
              </span>
              Your Brand
            </div>
            <div style={{ display: "flex", gap: 26, fontSize: 15, fontWeight: 500, color: "#545454" }}>
              {["Product", "Features", "Pricing", "Docs"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <div style={{ padding: "9px 18px", borderRadius: 20, background: ink, color: "#fff", fontSize: 14, fontWeight: 600 }}>
              Get started
            </div>
          </div>

          <div
            style={{
              ...box(R.badge),
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 12px",
              borderRadius: 20,
              background: "#fff",
              border: "1px solid #e5e5e5",
              fontSize: 13,
              fontWeight: 600,
              opacity: el(1),
              transform: `scale(${el(1)})`,
              transformOrigin: "left center",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 9, background: colors.green }} />
            New — v2.0 is live
          </div>

          <div
            style={{
              ...box(R.h1),
              fontFamily: fonts.display,
              fontSize: 56,
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              opacity: el(2),
              transform: `translateY(${(1 - el(2)) * 30}px)`,
            }}
          >
            Everything your team needs to move fast.
          </div>

          <div
            style={{
              ...box(R.sub),
              fontSize: 17,
              lineHeight: 1.45,
              color: "#545454",
              opacity: el(3),
              transform: `translateY(${(1 - el(3)) * 20}px)`,
            }}
          >
            One place to plan, build and ship — without the busywork that slows everyone down.
          </div>

          <div style={{ ...box(R.btns), display: "flex", gap: 12, opacity: el(4), transform: `translateY(${(1 - el(4)) * 20}px)` }}>
            <div
              style={{
                position: "relative",
                padding: "0 24px",
                height: 52,
                display: "grid",
                placeItems: "center",
                borderRadius: 26,
                background: ink,
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                transform: `scale(${1 - click * 0.06})`,
                boxShadow: `0 0 0 ${ripple * 26}px rgba(18,179,63,${0.35 * (1 - ripple) * (ripple > 0 ? 1 : 0)})`,
              }}
            >
              Start free trial
            </div>
            <div
              style={{
                padding: "0 22px",
                height: 52,
                display: "grid",
                placeItems: "center",
                borderRadius: 26,
                border: "1px solid #dedede",
                background: "#fff",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              See how it works
            </div>
          </div>

          <div
            style={{
              ...box(R.card),
              borderRadius: 20,
              background: dark,
              color: "#fff",
              padding: 26,
              display: "flex",
              flexDirection: "column",
              opacity: el(5),
              transform: `perspective(900px) rotateY(${(1 - el(5)) * -25}deg) translateX(${(1 - el(5)) * 40}px)`,
              boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: colors.grey400 }}>
              <span>ANALYTICS</span>
              <span style={{ color: live > 0.5 ? colors.green : colors.grey600 }}>● LIVE</span>
            </div>
            <div style={{ marginTop: 22, fontFamily: fonts.display, fontSize: 54, fontWeight: 500, letterSpacing: "-0.03em" }}>
              {visitors.toLocaleString("en-US")}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: colors.grey400 }}>MONTHLY VISITORS</div>
            <div style={{ marginTop: 8, fontSize: 15, fontWeight: 600, color: colors.green, opacity: live }}>↑ 38% vs last month</div>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
              {bars.map((b, i) => {
                const g = progress(frame, LIVE_AT + i * 3, 24, EASE_OUT);
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${lerp(0.12, b, g) * 100}%`,
                      borderRadius: 6,
                      background: i === bars.length - 1 ? colors.green : "rgba(255,255,255,0.18)",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div style={{ ...box(R.feats), display: "flex", gap: 14 }}>
            {[
              ["◆", "Automations", "Save six hours every week"],
              ["◈", "Insights", "Realtime analytics, no setup"],
              ["✦", "Integrations", "Works with your whole stack"],
            ].map(([ic, t, b], i) => (
              <div
                key={t}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "0 18px",
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #ececec",
                  opacity: el(6 + i),
                  transform: `translateY(${(1 - el(6 + i)) * 30}px)`,
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#f0f0f0",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                  }}
                >
                  {ic}
                </span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: 13, color: "#828282" }}>{b}</div>
                </div>
              </div>
            ))}
          </div>

          {/* deploy toast */}
          <div
            style={{
              position: "absolute",
              right: 28,
              top: 30,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 18px",
              borderRadius: 14,
              background: dark,
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
              opacity: toast,
              transform: `translateY(${(1 - toast) * -60}px)`,
            }}
          >
            <span style={{ width: 24, height: 24, borderRadius: 99, background: colors.green, display: "grid", placeItems: "center", fontSize: 13 }}>
              ✓
            </span>
            Deploy successful
            <span style={{ color: colors.grey400, fontWeight: 500 }}>Live in 1.2s</span>
          </div>

          {/* cursor */}
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              left: lerp(700, 150, cur),
              top: lerp(620, 432, cur),
              opacity: progress(frame, LIVE_AT + 16, 8),
              transform: `scale(${1 - click * 0.15})`,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))",
            }}
          >
            <path d="M4 2l16 9.5-7 1.6-3.6 6.4z" fill="#0b0b0b" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export const Process: React.FC = () => {
  const frame = useCurrentFrame();
  const spr = useSpring();
  const { portrait, pad, width } = useLayout();

  const active = frame < DESIGN_AT + 4 ? 0 : frame < LIVE_AT + 2 ? 1 : 2;
  const siteIn = spr(frame, 6, { damping: 20, stiffness: 90 });
  const siteScale = portrait ? (width - pad * 2) / SITE_W : 0.98;
  const tilt = interpolate(frame, [0, 210], [8, -4], { easing: EASE_SITE });

  const heading = (
    <div
      style={{
        fontFamily: fonts.display,
        fontWeight: 500,
        fontSize: portrait ? 96 : 92,
        letterSpacing: "-0.045em",
        lineHeight: 1.02,
        color: colors.grey400,
      }}
    >
      <RiseWords text="From" delay={2} /> <span style={{ color: colors.white }}><RiseWords text="wireframe" delay={6} /></span>{" "}
      <RiseWords text="to" delay={10} /> <span style={{ color: colors.white }}><RiseWords text="live site." delay={14} /></span>
    </div>
  );

  const steps = (
    <div style={{ display: "flex", flexDirection: "column", gap: portrait ? 18 : 22 }}>
      {brand.process.map((s, i) => {
        const on = i === active;
        const onP = on ? progress(frame, [0, DESIGN_AT + 4, LIVE_AT + 2][i], 14, EASE_SITE) : 0;
        return (
          <FadeUp key={s.n} delay={18 + i * 6}>
            <div
              style={{
                display: "flex",
                gap: 22,
                alignItems: "flex-start",
                padding: "22px 26px",
                borderRadius: 22,
                background: on ? "rgba(255,255,255,0.06)" : "transparent",
                border: `1px solid ${on ? colors.line : "transparent"}`,
                opacity: on ? 1 : 0.45,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 600,
                  fontSize: 20,
                  padding: "6px 10px",
                  borderRadius: 10,
                  background: on ? colors.green : colors.line,
                  color: on ? colors.bg : colors.grey300,
                  transform: `scale(${1 + Math.sin(onP * Math.PI) * 0.15})`,
                }}
              >
                {s.n}
              </span>
              <div>
                <div style={{ fontFamily: fonts.display, fontSize: 34, fontWeight: 500, color: colors.white, letterSpacing: "-0.02em" }}>
                  {s.title}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 22,
                    lineHeight: 1.4,
                    color: colors.grey300,
                    marginTop: 6,
                    maxHeight: on ? 80 : 0,
                    overflow: "hidden",
                    opacity: onP,
                  }}
                >
                  {s.body}
                </div>
              </div>
            </div>
          </FadeUp>
        );
      })}
    </div>
  );

  const site = (
    <div
      style={{
        width: SITE_W * siteScale,
        height: (CHROME_H + BODY_H) * siteScale,
        flexShrink: 0,
        opacity: siteIn,
        transform: `perspective(2400px) rotateY(${portrait ? 0 : -tilt}deg) rotateX(${tilt * 0.4}deg) translateY(${(1 - siteIn) * 120}px)`,
      }}
    >
      <div style={{ transform: `scale(${siteScale})`, transformOrigin: "top left" }}>
        <MockSite />
      </div>
    </div>
  );

  if (portrait) {
    return (
      <AbsoluteFill style={{ padding: `200px ${pad}px 120px`, gap: 56, justifyContent: "center" }}>
        {heading}
        {site}
        {steps}
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: `60px ${pad}px 0`, gap: 80 }}>
      <div style={{ width: 600, display: "flex", flexDirection: "column", gap: 48, flexShrink: 0 }}>
        {heading}
        {steps}
      </div>
      {site}
    </AbsoluteFill>
  );
};
