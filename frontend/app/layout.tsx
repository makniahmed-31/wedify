import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wedify — La marketplace N°1 des mariages en Tunisie",
    template: "%s | Wedify",
  },
  description: "Découvrez les meilleurs prestataires de mariage en Tunisie. Réservez photographes, salles, décorateurs et plus sur Wedify.",
  keywords: ["mariage", "wedding", "Tunisie", "Tunis", "prestataires mariage", "salle de mariage"],
  authors: [{ name: "Wedify" }],
  creator: "Wedify",
  metadataBase: new URL("https://wedify.tn"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://wedify.tn",
    siteName: "Wedify",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@wedify_tn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
