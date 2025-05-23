import type { Metadata } from "next";
import { Montserrat, Krona_One, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import LenisProvider from '@/components/LenisProvider';
import Lenis from "@studio-freight/lenis/types";


// Import the fonts
const montserrat = Montserrat({
  weight: ['100', '400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose weights you plan to use
  display: 'swap',
});

const kronaOne = Krona_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Villa eh Website",
  description: "A beautifully designed villa website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@carbon/icons/css/carbon-icons.min.css"
        />
      </Head>
      <body
        className={`${montserrat.className} ${kronaOne.className} ${libreBaskerville.className} antialiased`}
      >
        <LenisProvider>
        {children}
        </LenisProvider>
      </body>
    </html>
  );
}
