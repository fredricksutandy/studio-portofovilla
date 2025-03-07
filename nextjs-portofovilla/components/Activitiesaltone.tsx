'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import palmLeaf from '../public/palm-leaf-shadow.png';

// Import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../src/styles/custom-swiper.css'; // Import custom styles here

import activitiesIcon from '../public/activities-ico.svg';
import distanceIcon from '../public/distance-ico.svg';

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => {
  return source ? builder.image(source).auto('format').fit('max').url() : '';
};

// Sanity query to fetch the 'activities' document
const ACTIVITIES_QUERY = `*[_type == "activities"][0]`;



const ActivitiesSection = () => {
  const [activitiesData, setActivitiesData] = useState<SanityDocument | null>(null);

  useEffect(() => {
    const fetchActivitiesData = async () => {
      const data = await client.fetch<SanityDocument>(ACTIVITIES_QUERY);
      setActivitiesData(data);
    };

    fetchActivitiesData();
  }, []);

  if (!activitiesData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="max-w-full mx-auto bg-white py-24 px-4 overflow-hidden relative" id="activities">
<Image src={palmLeaf} alt="palm-leaf" className="absolute left-0 bottom-0 z-0 scale-x-[-1]" />

      <div className="max-w-[1296px] mx-auto">
        <Image src={activitiesIcon} alt="Activities icon" width={100} height={100} className="mb-8" />
        <h2 className="text-xl lg:text-3xl text-black font-medium mb-0">
          {activitiesData.title}
        </h2>
        <h3 className="text-xl lg:text-3xl text-black font-medium mb-10">
          {activitiesData.subtitle}
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
        {activitiesData.activities?.map((activities: Activities, index: number) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col h-[540px] rounded min-w-[300px] items-start justify-end p-4 hover:translate-y-[-6px] transition-all"
              style={{
                backgroundImage: `url(${urlFor(activities.activitiesImage) || ''})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <span className="text-white font-bold text-lg flex items-center gap-2">
                <Image src={distanceIcon} alt="Activities icon" width={50} height={50} />
                {activities.activitiesRange}
              </span>
              <span className="text-white font-bold text-2xl">
                {activities.activitiesTitle}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ActivitiesSection;
