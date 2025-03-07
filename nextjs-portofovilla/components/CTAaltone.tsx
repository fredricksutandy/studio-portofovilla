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
    return <div>Loading...</div>;
  }

  const leftImageUrl = ctaData.imageLeft
    ? urlFor(ctaData.imageLeft).url()
    : '';
  const rightImageUrl = ctaData.imageRight
    ? urlFor(ctaData.imageRight).url()
    : '';

  return (
    <section className="bg-white px-4 py-[240px] overflow-hidden">
      <div className="max-w-[1296px] bg-primary rounded-xl mx-auto px-4 md:px-6 py-[80px] flex flex-col items-center justify-center relative bg-cta bg-auto bg-no-repeat bg-center">


        <h2 className="text-3xl md:text-5xl text-white font-krona text-center mb-6 font-bold max-w-[680px]">{ctaData.title}</h2>
        <p className="text-base max-w-[560px] text-center mb-6 text-neutral-200 font-montserrat">{ctaData.subtitle}</p>
        <a
          href={ctaData.buttonLink}
          className="font-bold transition-all bg-white text-primary hover:translate-y-[-4px] hover:opacity-80 rounded-md px-12 py-6 text-base flex lg:w-fit mx-auto"
        >
          {ctaData.buttonName}
        </a>
        <Image 
          src={intersect}
          alt="int1"
          width={280}
          className="absolute -bottom-[12%] sm:-bottom-[16%] md:-bottom-[20%] lg:-bottom-[14%] -right-[4%] md:-right-[4%] lg:-right-[10%] w-[110px] sm:w-[160px] md:w-[200px] lg:w-[280px]"
        />
        <Image 
          src={intersect1}
          alt="int2"
          width={280}
          className="absolute -top-[12%] sm:-top-[16%] md:-top-[26%] lg:-top-[14%] -left-[4%] md:-left-[6%] lg:-left-[12%] w-[110px] sm:w-[160px] md:w-[200px] lg:w-[280px]"
        />
      </div>
    </section>
  );
};

export default CTASection;
