import type { Metadata } from "next";
import { Montserrat, Krona_One } from "next/font/google";
import "./globals.css";
import Head from "next/head";

// Import the fonts
const montserrat = Montserrat({
  weight: ['100', '400', '500', '600', '700', '900'],
  subsets: ['latin'],
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
        className={`${montserrat.className} ${kronaOne.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
