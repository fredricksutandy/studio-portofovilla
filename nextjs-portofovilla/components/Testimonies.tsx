'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import testimony from '../public/testimony-ico.svg';
import star from '../public/star-ico.svg';
import staroutline from '../public/staroutline-ico.svg';
import palmLeaf from '../public/palm-leaf-shadow.png';
import WaLogo from '../public/logos_whatsapp-icon.svg'
import ButtonWa from "./common/ButtonWa";

// Sanity query to fetch the 'testimony' document
const TESTIMONY_QUERY = `*[_type == "testimony"][0]`;

const TestimonySection = () => {
  const [testimonyData, setTestimonyData] = useState<any>(null);

  useEffect(() => {
    const fetchTestimonyData = async () => {
      const data = await client.fetch<SanityDocument>(TESTIMONY_QUERY);
      setTestimonyData(data);
    };

    fetchTestimonyData();
  }, []);

  if (!testimonyData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="justify-between mx-auto bg-[#fff] px-5 py-10 md:py-[80px] relative" id="testimonies">
      <Image src={palmLeaf} alt="palm-leaf" className="absolute right-0 bottom-0 z-0" />

      <div className="max-w-[1296px] block m-auto">
        <div className="mb-6 md:mb-12">
          <Image src={testimony} alt="Asterisk icon" width={100} height={64} className="mb-6" />
          <h2 className="text-xl md:text-3xl w-full text-black font-medium">{testimonyData.subtitle}</h2>
        </div>

        <div className="flex gap-2 mb-6 md:mb-12 items-center ">
        <Image src={staroutline} alt="Asterisk icon" width={40} height={40} className="w-[24px] h-[24px] md:w-[40px] md:h-[40px]"/>
        <p className="text-lg md:text-2xl text-[#047C36]"><span className="text-xl md:text-2xl font-semibold">4.8 </span> dari <span className="text-xl md:text-2xl font-semibold">5 </span> Pengunjung kami merasa puas!</p>
        </div>

        <div className="flex gap-4 md:gap-[64px] w-full items-center mb-[80px] md:mb-[80px] flex-wrap z-10 relative">
          {testimonyData.testimonies?.slice(0, 4).map((testimony, index) => (
            <div
              key={index}
              className="py-2 md:py-2 w-full md:w-[calc(50%-32px)] border-b border-b-[#1D764A] flex flex-col gap-4"
            >
              {/* Highlight and testimony text */}
              <p className="text-[#1A520F] text-xl md:text-3xl font-semibold">
                {testimony.testimonyHighlight}
              </p>
              <div className="flex gap-1">
                {Array(testimony.testimonyRating || 0) // Default to 0 if no rating is provided
                  .fill(null)
                  .map((_, starIndex) => (
                    <Image
                      key={starIndex}
                      src={star}
                      alt="Star icon"
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                  ))}
              </div>
              <p className="text-black text-base font-base">
                {testimony.testimony}
              </p>
              <p className="text-black text-base font-medium mb-2">
                {testimony.testimonyName} <span className="text-sm text-gray-500">(from {testimony.testimonyFrom})</span>
              </p>

            </div>
          ))}
        </div>

        <ButtonWa 
          link={testimony.linkCTA}
          text="Tanya jalur lebih jelas"
          type="white" // or "white"
          iconType={WaLogo.src}
        />
        
      </div>
    </section>
  );
};

export default TestimonySection;
