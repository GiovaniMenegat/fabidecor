import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site-config";
import StructuredData from "@/components/StructuredData";
import MobileCallBar from "@/components/MobileCallBar";
import "./globals.css";

// Headings: Poppins (bold/extrabold). Body: Inter. See AGENTS.md "Design System".
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// "Service + Location" title pattern, ~150-160 char description with a CTA,
// canonical/OG/robots — see AGENTS.md "SEO" for the full convention.
// og/twitter images are auto-generated from app/opengraph-image.png via
// Next.js's file-based metadata convention — don't also set them here.
const TITLE = "Residential & Commercial Painter in Auckland | FabiDecor";
const DESCRIPTION =
  "Professional interior and exterior house painting in Auckland, plus property maintenance, washing and window cleaning. BCITO-qualified — get a free quote.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "FabiDecor",
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
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
      className={`${poppins.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16 font-body md:pb-0">
        <StructuredData />
        {children}
        <MobileCallBar />
      </body>
    </html>
  );
}
