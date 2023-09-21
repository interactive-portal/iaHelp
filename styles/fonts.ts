import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
// const greatVibes = localFont({ src: "./GreatVibes-Regular.ttf" });

export { roboto };
