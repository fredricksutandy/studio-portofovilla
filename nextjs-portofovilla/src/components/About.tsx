'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import aboutico from '../public/about-ico.svg'
import aboutdum from '../../public/aboutdum.png'

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
    <section className="w-full py-40 px-6 " id="about">
    
    <div className="relative w-full md:w-auto mt-10 md:mt-0 mb-6">
    <h1 className="text-[40px] md:text-[80px] font-medium leading-tight text-center w-full max-w-[560px] mx-auto absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] z-20">
        Seppenggal surga, di tepi Jogjakarta
    </h1>
    <Image
      src={aboutdum}
      alt="Decorative"
      className=" h-[500px] w-[370px] object-cover rounded-t-full mx-auto opacity-60"
    />
  </div>
    <p className="text-[16px] text-gray-600 text-center max-w-[720px] mx-auto">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quaerat, alias voluptas porro recusandae atque. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum atque, dolore ipsam rem molestias beatae soluta odit ut eos laborum?
    </p>

  

    </section>
  );
};

export default AboutSection;
