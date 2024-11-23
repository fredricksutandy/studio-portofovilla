'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import aboutico from '../public/about-ico.svg'

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// Sanity query to fetch the 'about' document
const ABOUT_QUERY = `*[_type == "about"][0]`;

const AboutSection = () => {
  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      const data = await client.fetch<SanityDocument>(ABOUT_QUERY);
      setAboutData(data);
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return <div>Loading...</div>; // Loading state
  }

  // Generate image URLs if available
  const leftImageUrl = aboutData.imageLeft
    ? urlFor(aboutData.imageLeft).url()
    : '';
  const rightImageUrl = aboutData.imageRight
    ? urlFor(aboutData.imageRight).url()
    : '';

  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[1296px] mx-auto bg-[#Fff] px-5 py-10 md:py-[80px] md:pt-[160px] gap-4 md:gap-10">
      <div className="flex flex-col gap-4 md:gap-6 justify-center mb-6 md:mb-0 flex-1">
        <Image src={aboutico} alt="Asterisk icon" width={100} height={100}/>
        {/* <h1 className="text-lg font-medium  px-6 py-4 bg-[#D6F6E3] text-[#047C36] w-fit rounded">{aboutData.tagTitle}</h1> */}
        {/* <h2 className="text-xl md:text-2xl mt-4 text-black max-w-[380px] font-semibold">{aboutData.subtitleone}</h2> */}
        <h2 className="text-xl md:text-2xl mt-4 text-black max-w-[420px] font-semibold">{aboutData.subtitletwo}</h2>
        <p className="mt-6 max-w-2xl text-lg text-[#555555]">{aboutData.aboutDescription}</p>
        {/* {leftImageUrl && (
          <img
            src={leftImageUrl}
            alt="About Image Left"
            className="w-full h-auto object-cover rounded-md"
          />
        )} */}
      </div>

      <div className="flex items-end flex-1">
        
        {rightImageUrl && (
          <img
            src={rightImageUrl}
            alt="About Image Right"
            className="w-full object-cover h-[240px] md:h-auto md:max-h-[480px] rounded"
          />
        )}
      </div>
    </section>
  );
};

export default AboutSection;
