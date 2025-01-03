'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import activitiesIcon from '../public/activities-ico.svg';
import distanceIcon from '../public/distance-ico.svg';
import topMount from '../public/top-mount.jpg';
import arrowRight from '../public/arrow-right.svg';
import { Description } from "@headlessui/react";

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => {
  return source ? builder.image(source).auto('format').fit('max').url() : '';
};

// Sanity query to fetch the 'activities' document
const ACTIVITIES_QUERY = `*[_type == "activities"][0]`;

interface Activities {
  activitiesTitle: string;
  galleryImage: any;
}

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
    <section className="max-w-[1296px] mx-auto bg-[#FFF] px-4 py-24" id="activities">
      <Image src={activitiesIcon} alt="Activities icon" width={100} height={100} className="mb-8" />
      <h2 className="text-3xl lg:text-4xl text-black font-medium mb-0">
        {activitiesData.title}
      </h2>
      <h3 className="text-3xl lg:text-4xl text-black font-medium mb-10">
        {activitiesData.subtitle}
      </h3>

      <div className="flex gap-4 flex-wrap wrap">
        {activitiesData.activities?.slice(0, 3).map((activities: Activities, index: number) => (
          <div
            key={index}
            className="flex flex-col h-[560px] min-w-[300px] flex-1 items-start justify-end p-4 hover:translate-y-[-6px] transition-all"
            style={{
              backgroundImage: `url(${urlFor(activities.galleryImage) || ''})`,
              backgroundSize: 'cover', // Cover the entire div
              backgroundPosition: 'center', // Center the background image
              backgroundRepeat: 'no-repeat' // Prevent background from repeating
            }}
          >
            <span className="text-white font-bold text-lg flex items-center gap-2">
              <Image src={distanceIcon} alt="Activities icon" width={50} height={50} />
              {activities.activitiesRange}
            </span>
            <span className="text-white font-bold text-2xl">
              {activities.activitiesTitle}
            </span>
            <p className="text-white font-bold text-2xl">
              {activities.activitiesDescription}
          </p>
          </div>
          
        ))}
      </div>
    </section>
  );
};

export default ActivitiesSection;

