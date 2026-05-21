import type { Metadata } from "next";
import { Playfair_Display, Inter, Hind_Siliguri } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bengali = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arshola Janata Party — Voice of the Cha-Pipasu & Para-Politicians",
  description:
    "A satirical Bengal-themed political front for everyone the system called arshola. Five demands. Zero sponsors. One large, opinionated rowak.",
  metadataBase: new URL("https://cockroachjantaparty.forum"),
  openGraph: {
    title: "Arshola Janata Party",
    description:
      "Voice of the Cha-Pipasu & Para-Politicians. Five demands. Zero sponsors.",
    type: "website",
    url: "https://cockroachjantaparty.forum",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${bengali.variable}`}
    >
      <body className="bg-bone text-ink font-body antialiased selection:bg-sindoor selection:text-bone">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
