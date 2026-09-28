// Everything on screen comes from here — edit copy, colours or projects
// without touching the scenes. Content mirrors the live portfolio.

export const colors = {
  bg: "#050505",
  panel: "#111111",
  panelRaised: "#1a1a1a",
  line: "#2b2b2b",
  grey600: "#545454",
  grey400: "#828282",
  grey300: "#b8b8b8",
  grey200: "#dedede",
  white: "#ffffff",
  green: "#12b33f",
  greenSoft: "rgba(18, 179, 63, 0.18)",
};

export const fonts = {
  display: "'Space Grotesk', 'Switzer', sans-serif",
  body: "'Switzer', 'Space Grotesk', sans-serif",
};

export const brand = {
  firstName: "Jafer",
  lastName: "Nouri",
  role: "Full-stack Designer",
  availability: "Available for new projects",
  headshot: "images/headshot.jpg",
  signature: "images/signature.svg",
  bio: "I love turning ideas into something real through design.",

  headlineMuted: "Design that",
  headline: "delivers results.",
  sub: "Strategic design that drives growth, not just looks good.",

  services: [
    {
      icon: "handoff" as const,
      title: "Design Handoff",
      body: "I review the file and flag what needs deciding before any code.",
    },
    {
      icon: "frontend" as const,
      title: "Frontend Development",
      body: "The design becomes a precise, fast, responsive interface.",
    },
    {
      icon: "motion" as const,
      title: "Motion & Interaction",
      body: "Considered animation that makes the interface feel alive.",
    },
  ],

  process: [
    { n: "01", title: "Structure first", body: "Hierarchy and flow settled before a single colour is chosen." },
    { n: "02", title: "Pixel-perfect design", body: "Type, spacing and brand locked in place." },
    { n: "03", title: "Brought to life", body: "Motion that makes it feel alive, and ready to convert." },
  ],

  projects: [
    { name: "UOWA Library", category: "University Digital Library", image: "images/projects/uowa-lib.jpg" },
    { name: "Bareeq Almas", category: "Hospitality Services", image: "images/projects/bareeqalmas.jpg" },
    { name: "Eishan", category: "Engineering & Oil Services", image: "images/projects/eishan.jpg" },
    { name: "Computer Center", category: "University IT Center", image: "images/projects/uowa-center.jpg" },
  ],

  stats: [
    { value: 12, suffix: "", decimals: 0, label: "Years designing" },
    { value: 99, suffix: "+", decimals: 0, label: "Happy clients" },
    { value: 40, suffix: "+", decimals: 0, label: "Projects shipped" },
    { value: 4.9, suffix: "", decimals: 1, label: "Average rating" },
  ],

  avatars: [
    "images/avatars/avatar-1.jpg",
    "images/avatars/avatar-2.jpg",
    "images/avatars/avatar-3.jpg",
    "images/avatars/avatar-4.jpg",
    "images/avatars/avatar-6.jpg",
  ],

  outroWords: ["design", "build", "create"],
  outroLine: "incredible work together.",
  cta: "Book a call with me",
  email: "info@jaferni.com",
  wordmark: "JAFER",
};
