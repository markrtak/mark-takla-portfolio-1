import type { Metadata } from "next";
import {
  Chewy,
  Fredoka,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Reem_Kufi_Fun,
} from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Hero scribbles: alternate bubbly faces */
const scribbleA = Fredoka({
  variable: "--font-scribble",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const scribbleB = Chewy({
  variable: "--font-scribble-alt",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/** AHLAN greeting — Arabic-inspired Latin display */
const ahlan = Reem_Kufi_Fun({
  variable: "--font-ahlan",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.VERCEL_URL != null
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mark Takla — Data science portfolio",
    template: "%s — Mark Takla",
  },
  description:
    "Data science, ML, and full-stack projects by Mark Takla — New Cairo, Egypt.",
  openGraph: {
    title: "Mark Takla — Data science portfolio",
    description:
      "Data science, ML, and full-stack projects — portfolio and GitHub work.",
    type: "website",
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
      className={`${sans.variable} ${mono.variable} ${scribbleA.variable} ${scribbleB.variable} ${ahlan.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
