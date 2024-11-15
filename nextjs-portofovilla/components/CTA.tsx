'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// Sanity query to fetch the 'about' document
const CTA_QUERY = `*[_type == "CTA"][0]{
    title,
    subtitle,
    buttonName,
    buttonLink,
    imageLeft,
    imageRight
  }`;

const CTASection = () => {
  const [ctaData, setCtaData] = useState<any>(null);

  useEffect(() => {
    const fetchCTAData = async () => {
      const data = await client.fetch<SanityDocument>(CTA_QUERY);
      setCtaData(data);
    };

    fetchCTAData();
  }, []);

  if (!ctaData) {
    return <div>Loading...</div>; // Loading state
  }

  // Generate image URLs if available
  const leftImageUrl = ctaData.imageLeft
    ? urlFor(ctaData.imageLeft).url()
    : '';
  const rightImageUrl = ctaData.imageRight
    ? urlFor(ctaData.imageRight).url()
    : '';

  return (
    <section className="flex justify-between flex-col lg:flex-row max-w-[1440px] mx-auto bg-[#Fff] px-4 py-24 gap-4 lg:gap-8">
      <div className="flex items-start flex-col flex-1 gap-4 lg:gap-8 order-2 lg:order-1 ">
        {rightImageUrl && (
          <img
            src={rightImageUrl}
            alt="About Image Right"
            className="w-full rounded-lg max-w-[991px] max-h-[340px] lg:max-h-[440px] lg:max-h-auto object-cover"
          />
        )}
        <h2 className="text-2xl md:text-5xl text-black font-medium">{ctaData.subtitle}</h2>
        <a
          href={ctaData.buttonLink}
          className="font-bold transition-all bg-[#DBEEFE] text-[#1D764A] hover:bg-[#1D764A] hover:text-white rounded-md px-12 py-6 text-base flex mx-0 lg:w-fit me-auto"
        >
          {ctaData.buttonName}
        </a>
      </div>

      <div className="flex items-center justify-end flex-1 order-1 lg:order-2">
        {leftImageUrl && (
          <img
            src={leftImageUrl}
            alt="About Image Left"
            className="w-7/12 lg:w-full rounded-lg"
          />
        )}
      </div>
    </section>
  );
};

export default CTASection;
