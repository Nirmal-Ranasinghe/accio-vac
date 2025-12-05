import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AccioVac – Smart AI Travel Planner & Trip Companion",
  description:
    "AccioVac is an AI-powered travel assistant that generates personalized itineraries, real-time geofencing alerts, weather updates, and smart destination insights to enhance every journey.",
  keywords: [
    "AccioVac",
    "travel planner app",
    "AI itinerary generator",
    "smart travel assistant",
    "geofencing alerts",
    "real-time weather travel",
    "tour planning",
    "trip automation",
    "travel companion app",
  ],
  authors: [{ name: "AccioVac Team" }],
  openGraph: {
    title: "AccioVac – Your AI-Powered Travel Planner",
    description:
      "Plan smarter. Travel better. Get personalized itineraries, geofencing notifications, and real-time travel insights with AccioVac.",
    url: "https://acciovac.com",
    siteName: "AccioVac",
    images: [
      {
        url: "/og-image.png", // replace with your final OG image
        width: 1200,
        height: 630,
        alt: "AccioVac Travel Planner App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AccioVac – AI Travel Planner",
    description:
      "AI travel planning made simple. Build itineraries, get smart alerts, and enjoy your trips stress-free.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
