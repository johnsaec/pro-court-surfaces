import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Court Resurfacing in Austin TX | Pro Court Surfaces",
  description:
    "Austin's trusted court resurfacing company. Pickleball and tennis court restoration with premium Acrytech surfaces. Free estimates — call Patrick at (512) 893-0466.",
  keywords:
    "court resurfacing Austin, pickleball court resurfacing near me, tennis court resurfacing Austin TX, court surfacing Westlake TX",
  openGraph: {
    title: "Court Resurfacing in Austin TX | Pro Court Surfaces",
    description:
      "Pickleball and tennis court resurfacing with premium Acrytech surfaces. Free estimates.",
    type: "website",
    url: "https://www.procourtsurfaces.com/landing-fb",
  },
  alternates: {
    canonical: "https://www.procourtsurfaces.com/landing-fb",
  },
};

export default function LandingFbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
