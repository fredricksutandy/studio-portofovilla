'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import asterisk from '../../public/asterisk-ico.svg'

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// Sanity query to fetch the 'contact' document
const CONTACT_QUERY = `*[_type == "contact"][0]`;

const FooterSection = () => {
  const [contactData, setContactData] = useState<any>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      const data = await client.fetch<SanityDocument>(CONTACT_QUERY);
      setContactData(data);
    };

    fetchContactData();
  }, []);

  if (!contactData) {
    return <div>Loading...</div>; // Loading state
  }
  return (
    <footer className="bg-[#06270B] px-[24px] py-[64px] text-white relative z-20">
      <div className="max-w-[1296px] mx-auto w-full flex flex-col justify-center items-center gap-[80px]">
        <div className="flex w-full flex-col md:flex-row md:justify-between">
          {/* Left Section */}
          <div className="flex gap-4 justify-start items-center h-fit">
          <Image src={asterisk} alt="Asterisk icon" className="" width={60} height={60}/>

            <h2 className="text-2xl tracking-[4px] font-semibold">
              Kemewahan Alam
              <br />
              Tiada Tara
            </h2>
          </div>

          {/* Right Section */}
          <div className="flex gap-10">
            <div className="text-left flex flex-col gap-4">
              <a href="#" className="hover:text-gray-300 font-semibold text-base transition">
                Home
              </a>
              <a href="#" className="hover:text-gray-300 text-sm font-normal text-white/[0.5] transition">
                About
              </a>
              <a href="#" className="hover:text-gray-300 text-sm font-normal text-white/[0.5] transition">
                Amenities
              </a>
              <a href="#" className="hover:text-gray-300 text-sm font-normal text-white/[0.5] transition">
                Nearby
              </a>
              <a href="#" className="hover:text-gray-300 text-sm font-normal text-white/[0.5] transition">
                Testimonies
              </a>
              <a href="#" className="hover:text-gray-300 text-sm font-normal text-white/[0.5] transition">
                FAQ
              </a>
            </div>
            <div className="text-left flex flex-col gap-4">
              <a href="#" className="hover:text-gray-300 font-semibold text-base transition">
                Room
              </a>
              <a href="#" className="hover:text-gray-300 text-sm font-normal text-white/[0.5] transition">
                Bandung room
              </a>
              <a href="#" className="hover:text-gray-300 text-sm font-normal text-white/[0.5] transition">
                Jogja room
              </a>
              <a href="#" className="hover:text-gray-300 text-sm font-normal text-white/[0.5] transition">
                Lombok room
              </a>
              <a href="#" className="hover:text-gray-300 text-sm font-normal text-white/[0.5] transition">
                Bali room
              </a>
            </div>
          </div>
        </div>


          {/* Center Section */}
          <div className="flex flex-col items-center text-center px-4 py-[72px] bg-[#093510] rounded-xl w-full gap-6">
<div className="flex gap-6 ">
            {contactData.socialMedia.map((social: { link: string | undefined; icon: any; platform: any; }, index: Key | null | undefined) => (
              <a key={index} href={social.link} className="bg-transparent flex items-center grayscale invert">
                {social.icon && <Image width={24} height={24} src={urlFor(social.icon).url()} alt={`${social.platform} icon`} className="w-6 h-6" />}
              </a>
            ))}
          </div>
            <p className="text-2xl">+62 815-5319-0001</p>
            <p className="text-2xl">reservations@hideoutbali.com</p>
            <p className="text-2xl">Jalan Jangu, Selat Duda, Karangasem, Mbali</p>
          </div>

        <div className=" w-full flex flex-col justify-between items-center gap-6">
        <Image src={asterisk} alt="Asterisk icon" width={100} height={100} className=""/>

          <p>Powered by Portofovilla © 2024</p>
        </div>
      </div>
      {/* Background Image */}
      <div className="relative">
        {/* <img
          src="/footer-image.jpg"
          alt="Scenic view"
          className="w-full h-32 md:h-48 object-cover"
        /> */}
      </div>
    </footer>
  );
};

export default FooterSection;
