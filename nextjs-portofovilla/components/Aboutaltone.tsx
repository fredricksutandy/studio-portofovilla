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
      <div className="max-w-[1296px] flex flex-col-reverse items-center md:flex-row justify-between px-6 py-16 md:py-[120px] gap-6 mx-auto">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-end gap-2 mb-8">
            <Image src={aboutico} alt="Asterisk icon" width={48} height={48} className=""/>
            <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{aboutData.title}</h2>
          </div>
          <h3 className="font-montserrat text-2xl md:text-5xl font-bold text-black mb-8">{aboutData.subtitle}</h3>
          <p className="text-base w-full text-neutral-600 md:max-w-[600px]">{aboutData.aboutDescription}</p>
        </div>

        <div className="flex w-full items-stretch">
        <Image 
          src={urlFor(aboutData.aboutImage).url()}
          alt="about villa image" 
          width={500} 
          height={500} 
          className="w-full object-cover items-stretch flex h-[280px] md:h-[500px] rounded"
        />
          {/* <Image
            src={urlFor(aboutData.aboutImage).url()}
            alt={aboutData.subtitle || 'about villa image'}
            width={400}
            height={400}
            unoptimized
          /> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
