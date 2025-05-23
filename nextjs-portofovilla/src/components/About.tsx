'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import asteriskico from '../../public/asterisk-ico.svg'

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
    <section className="w-full py-40 px-6 max-w-[1296px] mx-auto" id="about">
      {/* <div className="flex flex-row md:flex-col items-center gap-4 mb-6 md:mb-12">
        <Image src={asteriskico} alt="Asterisk icon" width={28} height={28} className=""/>
        <h2 className="font-libre text-base md:text-lg text-primary font-medium leading-[100%!important]">{aboutData.title}</h2>
      </div> */}
    <div className="flex flex-row items-center gap-2 md:gap-4 md:mb-6">
        <Image src={asteriskico} alt="Asterisk icon" width={24} height={24} className=""/>
        <h2 className="font-montserrat text-base md:text-lg text-primary font-medium leading-[100%!important]">{aboutData.title}</h2>
      </div>
    <div className="relative w-full md:w-auto mt-10 md:mt-0 mb-6">
    {/* <h1 className="text-[48px] sm:text-[72px] md:text-[80px] font-medium font-libre leading-relaxed md:text-center w-full max-w-[580px] mx-auto relative md:absolute md:left-[50%] md:top-[50%] md:translate-y-[-50%] md:translate-x-[-50%] z-20">
    {aboutData.subtitle}
    </h1>
    <Image
      src={aboutdum}
      alt="Decorative"
      className="h-[220px] sm:h-[540px] w-10/12 sm:w-10/12 max-w-[400px] object-cover md:rounded-t-full ms-auto me-0 md:mx-auto opacity-60 -mt-8 md:mt-0"
    /> */}

<h1 className="text-[48px] sm:text-[64px] md:text-[80px] font-bold font-libre w-full max-w-[580px] relative z-20">
    {aboutData.subtitle}
    </h1>
    <Image
      src={urlFor(aboutData.aboutImage).url()}
      width={1000}
      height={400}
      alt="Decorative"
      className="h-[220px] sm:h-[400px] w-9/12 object-cover me-0 ms-auto opacity-75 -mt-7 md:-mt-12"
    />
  </div>
    <p className="text-sm md:text-base text-gray-600 max-w-[720px] md:text-end ms-auto">
    {aboutData.aboutDescription}    
    </p>

  

    </section>
  );
};

export default AboutSection;
