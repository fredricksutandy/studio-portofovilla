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
      <div className="max-w-[1296px] pt-10 md:pt-[144px] mx-auto mb-10 md:mb-20 px-6">

        <div className="flex flex-col flex-1 mb-4 md:mb-14">
          <div className="flex flex-row items-end gap-2 mb-4 md:mb-8">
            <Image src={aboutico} alt="Asterisk icon" width={48} height={48} className=""/>
            <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{aboutData.title}</h2>
          </div>
          <h3 className="font-montserrat text-3xl sm:text-4xl md:text-7xl font-semibold text-neutral-800 w-full md:w-7/12">{aboutData.subtitle}</h3>
        </div>

        <p className="text-base md:text-xl text-neutral-600 flex flex-1 w-full md:w-7/12 ms-auto">{aboutData.aboutDescription}</p>
      </div>

      {/* <div className="flex flex-col-reverse items-start md:flex-row justify-between px-5 py-16 md:pt-[144px] md:pb-[222px] md:gap-[96px]">
        

      </div> */}
        <Image 
          src={urlFor(aboutData.aboutImage).url()}
          alt="about villa image" 
          width={1920} 
          height={620} 
          className="w-full object-cover items-stretch flex h-[400px] md:h-[600px]"
        />
        
        

       
    </section>
  );
};

export default AboutSection;
