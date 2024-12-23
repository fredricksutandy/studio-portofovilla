'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import attractionIcon from '../public/attraction-ico.svg';
import distanceIcon from '../public/distance-ico.svg';
import topMount from '../public/top-mount.jpg';
import arrowRight from '../public/arrow-right.svg';

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => {
  return source ? builder.image(source).auto('format').fit('max').url() : '';
};

// Sanity query to fetch the 'attraction' document
const ATTRACTION_QUERY = `*[_type == "attraction"][0]`;

interface Attraction {
  attractionTitle: string;
  galleryImage: any;
}

const AttractionSection = () => {
  const [attractionData, setAttractionData] = useState<SanityDocument | null>(null);

  useEffect(() => {
    const fetchAttractionData = async () => {
      const data = await client.fetch<SanityDocument>(ATTRACTION_QUERY);
      setAttractionData(data);
    };

    fetchAttractionData();
  }, []);

  if (!attractionData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="max-w-[1296px] mx-auto bg-[#FFF] px-4 py-24" id="activities">
      <Image src={attractionIcon} alt="Attraction icon" width={100} height={100} className="mb-8" />
      <h2 className="text-3xl lg:text-4xl text-black font-medium mb-0">
        {attractionData.title}
      </h2>
      <h3 className="text-3xl lg:text-4xl text-black font-medium mb-10">
        {attractionData.subtitle}
      </h3>

      <div className="flex gap-4 flex-wrap wrap">
        {attractionData.attractions?.slice(0, 3).map((attraction: Attraction, index: number) => (
          <div
            key={index}
            className="flex flex-col h-[560px] min-w-[300px] flex-1 items-start justify-end p-4 hover:translate-y-[-6px] transition-all"
            style={{
              backgroundImage: `url(${urlFor(attraction.galleryImage) || ''})`,
              backgroundSize: 'cover', // Cover the entire div
              backgroundPosition: 'center', // Center the background image
              backgroundRepeat: 'no-repeat' // Prevent background from repeating
            }}
          >
            <span className="text-white font-bold text-lg flex items-center gap-2">
              <Image src={distanceIcon} alt="Attraction icon" width={50} height={50} />
              {attraction.attractionRange}
            </span>
            <span className="text-white font-bold text-2xl">
              {attraction.attractionTitle}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AttractionSection;

