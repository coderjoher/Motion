import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts ship in /public so renders never depend on a network fetch.
export const fontsReady = Promise.all([
  loadFont({
    family: "Space Grotesk",
    url: staticFile("fonts/SpaceGrotesk-latin.woff2"),
    weight: "300 700",
  }),
  loadFont({ family: "Switzer", url: staticFile("fonts/Switzer-400.woff2"), weight: "400" }),
  loadFont({ family: "Switzer", url: staticFile("fonts/Switzer-500.woff2"), weight: "500" }),
  loadFont({ family: "Switzer", url: staticFile("fonts/Switzer-600.woff2"), weight: "600" }),
]);
