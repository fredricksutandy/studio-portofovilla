'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";

// Import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../src/styles/custom-swiper.css'; // Import custom styles here

import attractionIcon from '../public/attraction-ico.svg';
import distanceIcon from '../public/distance-ico.svg';

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => {
  return source ? builder.image(source).auto('format').fit('max').url() : '';
};

// Sanity query to fetch the 'attraction' document
const ATTRACTION_QUERY = `*[_type == "attraction"][0]`;

interface Attraction {
  attractionTitle: string;
  attractionImage: any;
  attractionRange: string;
}

const AttractionSection = () => {
  const [attractionData, setAttractionData] = useState<SanityDocument | null>(null);

  useEffect(() => {
    const fetchAttractionData = async () => {
      const data = await client.fetch<SanityDocument>(ATTRACTION_QUERY);
      setAttractionData(data);
    };

    fetchAttractionData();
  }, []);

  if (!attractionData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="max-w-full mx-auto bg-[#FFF] py-24 px-4 overflow-hidden">
      <div className="max-w-[1296px] mx-auto">
        <Image src={attractionIcon} alt="Attraction icon" width={100} height={100} className="mb-8" />
        <h2 className="text-3xl lg:text-4xl text-black font-medium mb-0">
          {attractionData.title}
        </h2>
        <h3 className="text-3xl lg:text-4xl text-black font-medium mb-10">
          {attractionData.subtitle}
        </h3>
      </div>

      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        // pagination={{ clickable: true }}
        grabCursor={true}
        spaceBetween={16}
        slidesPerView={1.2} // Show partial next slide
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{color: "red"}}
        className="max-w-[1296px] [&_.swiper-button-next]:text-black [&_.swiper-button-prev]:text-black"
      >
        {attractionData.attractions?.map((attraction: Attraction, index: number) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col h-[380px] rounded min-w-[300px] items-start justify-end p-4 hover:translate-y-[-6px] transition-all"
              style={{
                backgroundImage: `url(${urlFor(attraction.attractionImage) || ''})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <span className="text-white font-bold text-lg flex items-center gap-2">
                <Image src={distanceIcon} alt="Attraction icon" width={50} height={50} />
                {attraction.attractionRange}
              </span>
              <span className="text-white font-bold text-2xl">
                {attraction.attractionTitle}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AttractionSection;
