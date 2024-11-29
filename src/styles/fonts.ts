import localFont from "next/font/local";
import { Montserrat, Open_Sans, Oswald } from 'next/font/google'

const header = localFont({
  src: "fonts/PropagationRegular.ttf",
  variable: '--font-header',
});
const body = localFont({
  src: "/fonts/TangoSans.ttf",
});
const bodyBold = localFont({
  src: "/fonts/TangoSans_Bold.ttf",
});
const bodyBoldItalic = localFont({
  src: "/fonts/TangoSans_BoldItalic.ttf",
});
const bodyItalic = localFont({
  src: "/fonts/TangoSans_Italic.ttf",
});
const openSans = Open_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})
const montserrat = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

const anisette = localFont({
  src: "fonts/Anisette.otf",
  variable: '--font-anisette',
})

const clashDisplay = localFont({
  src: "/fonts/ClashDisplay-Variable (Subheader & body).ttf",
  variable: '--font-clash',
});


export { header, body, bodyBold, bodyBoldItalic, bodyItalic, openSans, montserrat, anisette, clashDisplay };
