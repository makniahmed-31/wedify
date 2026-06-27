import type { Metadata } from "next";
import { Poppins, Playfair_Display, Noto_Sans_Arabic } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BonPlanMariage.tn — La marketplace N°1 des mariages en Tunisie",
    template: "%s | BonPlanMariage.tn",
  },
  description: "Découvrez les meilleurs prestataires de mariage en Tunisie. Salles de fêtes, photographes, traiteurs, décorateurs et bien plus sur BonPlanMariage.tn.",
  keywords: ["mariage", "tunisie", "prestataires mariage", "salle de mariage tunis", "photographe mariage", "traiteur mariage"],
  authors: [{ name: "BonPlanMariage.tn" }],
  creator: "BonPlanMariage.tn",
  metadataBase: new URL("https://bonplanmariage.tn"),
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: "https://bonplanmariage.tn",
    siteName: "BonPlanMariage.tn",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@bonplanmariage",
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
      className={`${poppins.variable} ${playfair.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <AuthProvider>{children}</AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
