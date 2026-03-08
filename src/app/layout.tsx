import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AutoLinkTracking } from "@/components/google-analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pro Court Surfaces",
  description: "Court resurfacing quotes and invoicing platform",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pro Court Surfaces",
  url: "https://www.procourtsurfaces.com",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pro Court Surfaces",
  url: "https://www.procourtsurfaces.com",
  logo: "https://res.cloudinary.com/dwyd4f7lz/image/upload/v1767487583/pro_court_logo_full_color_no_bg_2_owjtqf.png",
  description:
    "Court surfacing subcontractor in Austin, TX installing ATS Sports Acrytech acrylic surfaces on tennis courts, pickleball courts, and multi-sport courts for general contractors and multi-family amenity centers in Central Texas.",
  telephone: "+15128930466",
  email: "patrick@procourtsurfaces.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2733 Unit 601 Dulce Lane",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78704",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 30.2672,
      longitude: -97.7431,
    },
    geoRadius: "100 mi",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  return (
    <html lang="en">
      <head>
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AutoLinkTracking />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
