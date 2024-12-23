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
    <section className="w-full bg-[#f1f7ed]" id="about">
      <div className="max-w-[1296px] flex flex-col-reverse md:flex-row justify-between px-5 py-10 md:py-[80px] gap-6 md:gap-10 mx-auto">
        <div className="flex flex-col gap-4 md:gap-8 justify-center mb-6 md:mb-0 w-full md:w-2/3">
          <Image src={aboutico} alt="Asterisk icon" width={100} height={100}/>
          <h2 className="text-xl md:text-3xl text-black font-medium">{aboutData.subtitletwo}</h2>
          <p className="text-base md:text-lg w-full md:w-10/12 text-[#555555]">{aboutData.aboutDescription}</p>
        </div>

        <div className="flex items-end flex-1">
          
          {rightImageUrl && (
            <img
              src={rightImageUrl}
              alt="About Image Right"
              className="w-full object-cover h-[240px] md:h-auto md:max-h-[440px] md:rounded-t-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
