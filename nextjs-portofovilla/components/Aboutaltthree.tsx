'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import aboutico from '../public/about-ico.svg'

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

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
    return <div className="min-h-[100vh] flex justify-center items-center">Loading...</div>;
  }

  return (
    <section className="w-full bg-lightbg" id="about">
      <div className="max-w-[1296px] flex flex-col-reverse items-start md:flex-row justify-between px-6 py-16 md:pt-[144px] md:pb-[222px] gap-8 md:gap-[96px] mx-auto">
      <div className="flex flex-1 w-full items-stretch">
        <Image 
          src={urlFor(aboutData.aboutImage).url()}
          alt="about villa image" 
          width={700} 
          height={900} 
          className="w-full object-cover items-stretch flex h-[400px] md:h-[660px] rounded"
        />
        </div>
        
        <div className="flex flex-col flex-1 pt-0 md:pt-20">
          <div className="flex flex-row items-end gap-2 mb-4 md:mb-8">
            <Image src={aboutico} alt="Asterisk icon" width={48} height={48} className=""/>
            <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{aboutData.title}</h2>
          </div>
          <h3 className="font-montserrat text-3xl md:text-5xl font-semibold text-black mb-4 md:mb-8">{aboutData.subtitle}</h3>
          <p className="text-base w-full text-neutral-600 md:max-w-[1120px] mb-0 md:mb-12">{aboutData.aboutDescription}</p>

          <Image 
          src={urlFor(aboutData.secondAboutImage).url()}
          alt="about villa image" 
          width={500} 
          height={400} 
          className="w-full object-cover items-stretch hidden md:flex h-[260px] md:h-[320px] rounded"
        />
        </div>

       
      </div>
    </section>
  );
};

export default AboutSection;
