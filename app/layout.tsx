import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PLIMZO — Make Some Noise",
  description: "Meet Plimzo, a tiny creature powered by memes, laughter and community noise on Robinhood Chain.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
