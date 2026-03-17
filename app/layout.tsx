import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontSerif } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://bouye.ca"),
  title: {
    default:
      "Bouye — Gambian Wellness Juices | Wonjo, Ginger & Baobab | Toronto Delivery",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Toronto's first Gambian juice brand. Handcrafted Wonjo (Hibiscus), Ginger & Baobab wellness juices with pure cane sugar, under 20g per bottle. Plant-based compostable packaging. Order delivery via Uber Eats or direct across the GTA.",
  keywords: [
    "Gambian juice Toronto",
    "hibiscus juice delivery Toronto",
    "baobab drink Toronto",
    "African juice Toronto",
    "healthy juice delivery GTA",
    "wonjo juice",
    "bouye juice",
    "plant-based juice Toronto",
    "Gambian wellness drinks",
    "hibiscus drink Toronto",
    "baobab juice Canada",
    "ginger juice delivery Toronto",
    "African drink delivery Toronto",
    "low sugar juice Toronto",
    "compostable bottle juice",
    "West African juice Toronto",
  ],
  authors: [{ name: "Bouye" }],
  creator: "Bouye",
  publisher: "Bouye",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://bouye.ca",
    siteName: "Bouye",
    title:
      "Bouye — Gambian Wellness Juices | Toronto Delivery",
    description:
      "Wonjo (Hibiscus), Ginger & Baobab wellness juices handcrafted in Toronto. Pure cane sugar, under 20g per bottle. Plant-based packaging. Order on Uber Eats or direct.",
    images: [
      {
        url: "/og-image.jpg", // TODO: Add actual OG image (1200x630)
        width: 1200,
        height: 630,
        alt: "Bouye — Gambian Wellness Juices: Wonjo, Ginger, and Baobab bottles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bouye — Gambian Wellness Juices | Toronto",
    description:
      "Toronto's first Gambian juice brand. Wonjo, Ginger & Baobab — delivered to your door.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://bouye.ca",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFDF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1a14" },
  ],
  width: "device-width",
  initialScale: 1,
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://bouye.ca/#business",
      name: "Bouye",
      description:
        "Toronto's first and only Gambian juice brand. Handcrafted Wonjo (Hibiscus), Ginger & Baobab wellness juices.",
      url: "https://bouye.ca",
      logo: "https://bouye.ca/logo.png",
      image: "https://bouye.ca/og-image.jpg",
      telephone: "",
      email: "hello@bouye.ca",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toronto",
        addressRegion: "ON",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.6532,
        longitude: -79.3832,
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 43.6532,
          longitude: -79.3832,
        },
        geoRadius: "50000",
      },
      priceRange: "$$",
      servesCuisine: ["Gambian", "West African", "Juice", "Wellness Drinks"],
      sameAs: [
        "https://instagram.com/bouyejuices",
        "https://tiktok.com/@bouyejuices",
      ],
    },
    {
      "@type": "FoodEstablishment",
      "@id": "https://bouye.ca/#food",
      name: "Bouye",
      description:
        "Gambian wellness juices — Wonjo (Hibiscus), Ginger & Baobab. Delivery across the GTA via Uber Eats.",
      url: "https://bouye.ca",
      servesCuisine: "Gambian",
      menu: "https://bouye.ca/#products",
      acceptsReservations: false,
      hasMenu: {
        "@type": "Menu",
        hasMenuSection: {
          "@type": "MenuSection",
          name: "Wellness Juices",
          hasMenuItem: [
            {
              "@type": "MenuItem",
              name: "Wonjo (Hibiscus Juice)",
              description:
                "Deep ruby-red hibiscus juice rich in antioxidants and vitamin C. 500ml, under 20g sugar.",
              offers: {
                "@type": "Offer",
                price: "12.00",
                priceCurrency: "CAD",
              },
            },
            {
              "@type": "MenuItem",
              name: "Ginger Juice",
              description:
                "Warm, spicy golden ginger juice. Anti-inflammatory powerhouse. 500ml, under 20g sugar.",
              offers: {
                "@type": "Offer",
                price: "12.00",
                priceCurrency: "CAD",
              },
            },
            {
              "@type": "MenuItem",
              name: "Bouye (Baobab Juice)",
              description:
                "Creamy baobab fruit juice. Prebiotic superfruit with 6x vitamin C of oranges. 500ml, under 20g sugar.",
              offers: {
                "@type": "Offer",
                price: "12.00",
                priceCurrency: "CAD",
              },
            },
            {
              "@type": "MenuItem",
              name: "The Bouye Bundle (All 3 Juices)",
              description:
                "One of each — Wonjo, Ginger & Baobab. 3x 500ml bottles. Save $6.",
              offers: {
                "@type": "Offer",
                price: "30.00",
                priceCurrency: "CAD",
              },
            },
          ],
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://bouye.ca/#website",
      url: "https://bouye.ca",
      name: "Bouye",
      description: "Gambian Wellness Juices — Toronto Delivery",
      publisher: {
        "@id": "https://bouye.ca/#business",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col min-h-screen grain">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
