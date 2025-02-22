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
    return <div className="min-h-[100vh] flex justify-center items-center">Loading...</div>; // Loading state
  }

  // Generate image URLs if available
  const leftImageUrl = aboutData.imageLeft
    ? urlFor(aboutData.imageLeft).url()
    : '';
  const rightImageUrl = aboutData.imageRight
    ? urlFor(aboutData.imageRight).url()
    : '';

  return (
    <section className="w-full bg-[#f8f8f8]" id="about">
      <div className="max-w-[1296px] flex flex-col-reverse md:flex-row justify-between px-5 py-10 md:pt-[144px] md:pb-[80px] gap-6 md:gap-10 mx-auto">
        {/* <div className="flex flex-col gap-4 md:gap-8 justify-center mb-6 md:mb-0 w-full md:w-7/12">
          <Image src={aboutico} alt="Asterisk icon" width={100} height={100}/>
          <h2 className="font-krona text-2xl lg:text-4xl text-[#1A520F] font-semibold mb-0">{aboutData.title}</h2>
          <h3 className="text-lg md:text-2xl text-black font-semibold max-w-[460px]">{aboutData.subtitle}</h3>
          <p className="text-base w-full md:w-10/12 text-neutral-600">{aboutData.aboutDescription}</p>
        </div>

        <div className="flex items-end flex-1">
          
          {rightImageUrl && (
            <img
              src={rightImageUrl}
              alt="About Image Right"
              className="w-full object-cover h-[240px] md:h-auto md:max-h-[400px] rounded-lg md:rounded-t-full md:rounded-b-3xl"
            />
          )}
        </div> */}
        <div className="flex items-end flex-wrap">
          <div className="flex flex-col justify-center mb-6 md:mb-0 w-full md:w-6/12">
            <Image src={aboutico} alt="Asterisk icon" width={100} height={100} className="mb-8"/>
            <h2 className="font-krona text-2xl lg:text-4xl text-[#1A520F] font-semibold mb-2">{aboutData.title}</h2>
            <h3 className="text-lg md:text-2xl text-black italic max-w-[460px]">{aboutData.subtitle}</h3>
          </div>
          <p className="text-base w-full text-neutral-600 md:w-6/12">{aboutData.aboutDescription}</p>
        </div>

        <div className="flex items-end flex-1">
          
          {rightImageUrl && (
            <img
              src={rightImageUrl}
              alt="About Image Right"
              className="w-full object-cover h-[240px] md:h-auto md:max-h-[400px] rounded-lg md:rounded-t-full md:rounded-b-3xl"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
