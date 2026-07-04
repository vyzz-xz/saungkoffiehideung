import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saung Koffie Hideung | Wisata Kuliner, Adventure, Glamping Karawang",
  description:
    "Experience the perfect blend of mountain air and premium coffee at Saung Koffie Hideung. Glamping, ATV, Sky Bike, and more await you in nature's embrace.",
  keywords: [
    "Saung Koffie Hideung",
    "outdoor coffee shop",
    "glamping",
    "nature recreation",
    "mountain cafe",
    "ATV adventure",
  ],
  openGraph: {
    title: "Saung Koffie Hideung | Wisata Kuliner, Adventure, Glamping Karawang",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
