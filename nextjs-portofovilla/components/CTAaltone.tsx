'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import palmLeaf from '../public/palm-leaf-shadow.png';
import intersect from '../public/Intersect.png';
import intersect1 from '../public/Intersect-1.png';
import Image from "next/image";

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
    <section className="bg-[#Fff] px-4 py-[240px]">
      <div className="max-w-[1296px] bg-[#1A520F] rounded-xl mx-auto px-4 py-[96px] flex flex-col items-center justify-center relative bg-cta bg-auto bg-no-repeat bg-center">


        <h2 className="text-xl md:text-5xl text-[#fff] font-krona text-center mb-6 font-bold max-w-[600px]">Karena Dirimu Layak untuk Beristirahat</h2>
        <p className="text-base max-w-[560px] text-center mb-6 text-neutral-200 font-montserrat">Beristirahatlah di tengah harmoni alam yang memelukmu. Biarkan setiap momen menjadi cerita indah yang tak terlupakan.</p>
        <a
          href={ctaData.buttonLink}
          className="font-bold transition-all bg-[#fff] text-[#1A520F] hover:translate-y-[-4px] hover:opacity-80 rounded-md px-12 py-6 text-base flex lg:w-fit mx-auto"
        >
          {ctaData.buttonName}
        </a>
        <Image 
      src={intersect}
      alt="int1"
      width={280}
      className="absolute -top-[14%] -right-[8%]"
    />
    <Image 
      src={intersect1}
      alt="int1"
      width={280}
      className="absolute -bottom-[14%] -left-[8%]"
    />
      </div>
    
    </section>
  );
};

export default CTASection;
