'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import attraction from '../public/attraction-ico.svg'
import happyCustomer from '../public/carbon_user-favorite.svg'

// Sanity query to fetch the 'about' document
const ATTRACTION_QUERY = `*[_type == "attraction"][0]`;

const RoomSection = () => {
  const [attractionData, setAttractionData] = useState<any>(null);

  useEffect(() => {
    const fetchAttractionData = async () => {
      const data = await client.fetch<SanityDocument>(ATTRACTION_QUERY);
      setAttractionData(data);
    };

    fetchAttractionData();
  }, []);

  if (!attractionData) {
    return <section className="mx-auto bg-[#06270B] px-4 py-24"></section>; // Loading state
  }

  return (
    <section className="max-w-[1440px] mx-auto bg-[#Fff] px-4 py-24">
        <Image src={attraction} alt="Asterisk icon" width={160} height={100} className="mb-8"/>

      <h2 className="text-5xl lg:text-6xl text-black font-medium mb-4">
        {attractionData.title}
      </h2>
      <h3 className="text-3xl lg:text-4xl text-black font-medium mb-10">
        {attractionData.subtitle}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* {attractionData.facilities.map((facility, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center p-6 gap-2 bg-white rounded border border-[#d9d9d9]">
            {facility.facilityImage && (
              <Image
                src={urlFor(facility.facilityImage)}
                alt={facility.facilityTitle || 'Facility icon'}
                width={26}
                height={26}
                unoptimized
              />
            )}
            <span className="text-black text-center md:text-start">{facility.facilityTitle}</span>
          </div>
        ))} */}
      </div>
    </section>
  );
};

export default RoomSection;
