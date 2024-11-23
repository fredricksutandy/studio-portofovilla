'use client';

// components/Hero.tsx
import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import { Krona_One } from 'next/font/google'; // Use the correct font import
import socialproof from '../public/social-proof.png'
import Image from "next/image";

const builder = imageUrlBuilder(client);

// Initialize the Krona One font
const kronaOne = Krona_One({
  weight: '400', // Specify the weights you need
  subsets: ['latin'], // Ensure the font supports the required subset
  display: 'swap',
});

const urlFor = (source: any) => {
  return builder.image(source);
};

const HERO_QUERY = '*[_type == "heroImage"][0]'; // Adjust the query as needed

const Hero = () => {
  const [heroData, setHeroData] = useState<any>(null); // Replace 'any' with your specific type if available

  useEffect(() => {
    const fetchHeroData = async () => {
      const data = await client.fetch<SanityDocument>(HERO_QUERY);
      setHeroData(data);
    };

    fetchHeroData();
  }, []);

  if (!heroData) {
    return <div>Loading...</div>; // Loading state
  }

  // Fetch the image URL
  const heroImageUrl = heroData.image ? urlFor(heroData.image).url() : null;

  return (
    <div
      className="bg-cover bg-center flex items-center justify-center text-white h-screen"
      style={{
        backgroundImage: heroImageUrl ? `url(${heroImageUrl})` : 'none',
      }}
    >
      <div className="flex flex-col gap-y-6 md:gap-y-12 justify-center align-middle mt-12">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-2 items-center justify-center align-middle">
            <Image src={socialproof} alt="Logo" className="w-[104px] h-[26px]"/>
            <p className="text-base text-center mb-6 w-fit">Bergabung bersama <b>1,700+</b> pengunjung lain</p>
          </div>
          <h1 className={`${kronaOne.className} text-5xl md:text-7xl font-bold mb-8 text-center`}>
            {heroData.title}
          </h1>
          <h2 className="text-xl md:text-3xl text-center font-semibold">{heroData.subtitle}</h2>
        </div>
        <a
          href={heroData.buttonLink}
          className="font-bold m-auto transition-all bg-[#DBEEFE] text-[#1D764A] hover:bg-[#1D764A] hover:text-white rounded-md px-12 py-6 text-base flex w-fit"
        >
          {heroData.buttonName}
        </a>
      </div>
    </div>
  );
};

export default Hero;
