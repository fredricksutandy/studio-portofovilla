import type { Metadata } from "next";
import { Montserrat, Krona_One } from "next/font/google";
import "./globals.css";

// Import the fonts
const montserrat = Montserrat({
  weight: ['100', '400', '700', '900'], // Define the required weights
  subsets: ['latin'],
  display: 'swap',
});

const kronaOne = Krona_One({
  weight: '400', // Krona One only has one weight
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Villa Website",
  description: "A beautifully designed villa website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${kronaOne.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
