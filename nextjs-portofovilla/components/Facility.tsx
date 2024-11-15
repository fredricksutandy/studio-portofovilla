'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import facilityIco from '../public/facilities-ico.svg'
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs without additional parameters
const urlFor = (source) => builder.image(source).width(26).height(26).url();

// Sanity query to fetch the 'facility' document
const FACILITY_QUERY = `*[_type == "facility"][0]`;

const FacilitySection = () => {
  const [facilityData, setFacilityData] = useState(null);

  useEffect(() => {
    const fetchFacilityData = async () => {
      const data = await client.fetch<SanityDocument>(FACILITY_QUERY);
      setFacilityData(data);
    };

    fetchFacilityData();
  }, []);

  if (!facilityData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="max-w-[1296px] mx-auto bg-[#Fff] px-4 py-24">
        <Image src={facilityIco} alt="Asterisk icon" width={100} height={64} className="mb-8 flex"/>

      {/* <h2 className="text-3xl lg:text-6xl text-black font-medium mb-2 md:mb-4">
      </h2> */}
      
      <h2 className="text-3xl lg:text-4xl text-black font-medium mb-0">
      {facilityData.title}
      </h2>
      <h3 className="text-3xl lg:text-4xl text-black font-medium mb-10">
      {facilityData.subtitle}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {facilityData.facilities.map((facility, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center p-4 md:p-5 ps-0 gap-2 md:gap-4 border-b border-b-[#1D764A]">
            {facility.facilityImage && (
              <Image
                src={urlFor(facility.facilityImage)}
                alt={facility.facilityTitle || 'Facility icon'}
                width={26}
                height={26}
                unoptimized
              />
            )}
            <span className="text-base md:text-lg font-normal md:font-medium text-black text-center md:text-start">{facility.facilityTitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FacilitySection;
