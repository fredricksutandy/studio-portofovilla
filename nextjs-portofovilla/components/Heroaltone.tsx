'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import { Krona_One } from 'next/font/google'; // Use the correct font import


// Sanity query to resolve the video reference and fetch URL
const HERO_QUERY = `*[_type == "hero"][0]{title, subtitle, video { asset-> {url} }}`;

const Hero = () => {
  const [heroData, setHeroData] = useState<any>(null); // Replace 'any' with your specific type if available

  useEffect(() => {
    const fetchHeroData = async () => {
      const data = await client.fetch(HERO_QUERY);
      setHeroData(data);
    };

    fetchHeroData();
  }, []);

  if (!heroData) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>; // Loading state
  }

  // Extract video URL from the resolved reference
  const heroVideoUrl = heroData.video?.asset?.url;

  return (
    <div className="relative w-full h-screen" id="home">
      {/* Video Container */}
      {heroVideoUrl ? (
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={heroVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500">
          {/* Placeholder content or fallback */}
          No video available
        </div>
      )}

      {/* Text Container */}
      <div className="absolute top-3/4 left-1/4 transform text-white text-start">
      {/* Center text */}
        <h1 className={`text-2xl md:text-5xl font-bold mb-2 text-gray-100 font-krona`}>
          {heroData.title}
        </h1>
        <h2 className="text-lg md:text-xl">{heroData.subtitle}</h2>
      </div>
    </div>
  );
};

export default Hero;
