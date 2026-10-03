import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mhideh Enterprises | Bespoke Gifts, Custom Frames & Souvenirs",
  description:
    "Curated personalized gifts, custom portrait frames, wall clocks, velvet throw pillows, engraved cufflinks, magic mugs & event banners in Ibadan with nationwide delivery across Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased bg-cream-50 text-charcoal-900 selection:bg-gold-400/30 selection:text-burgundy-800">
        {children}
      </body>
    </html>
  );
}
