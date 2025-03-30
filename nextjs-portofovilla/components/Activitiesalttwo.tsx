'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import activitiesIcon from '../public/activities-ico.svg';
import { ArrowRight, PanHorizontal, Time } from '@carbon/icons-react';
import OtherActivitiesSection from "../src/components/OtherActivities";



const builder = imageUrlBuilder(client);
const urlFor = (source: any) => {
  return source ? builder.image(source).auto('format').fit('max').url() : '';
};

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
    <section className="max-w-[1296px] mx-auto bg-white px-4 md:px-6 py-10 md:py-[120px] relative" id="activities">
      <div className="flex flex-row  items-end gap-2 mb-6">
            <Image src={activitiesIcon} alt="Asterisk icon" width={48} height={48} className=""/>
            <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{activitiesData.title}</h2>
          </div>
        <h3 className="font-montserrat text-2xl md:text-4xl font-bold text-black max-w-[990px] mb-10">
          {activitiesData.subtitle}
        </h3>

      <div className="flex gap-4 md:gap-6 flex-wrap wrap">
        {activitiesData.activities?.map((activities: Activities, index: number) => (
          <div className="rounded overflow-hidden w-full md:w-[calc(50%-12px)] lg:w-[calc(33%-16px)]" key={index}>
                <Image
                    src={urlFor(activities.activitiesImage) || ''}
                    alt="Activity Image"
                    width={420}
                    height={400}
                    objectFit="cover"
                    objectPosition="center"
                    priority
                    className='w-full h-[240px] md:h-[400px] object-cover mb-4'
                  />
                <div className="flex flex-col gap-4 md:gap-6">
                
                    <h3 className="font-medium text-xl">
                      {index + 1}. {activities.activitiesTitle}
                    </h3>

                    <div className="flex gap-4 flex-row flex-wrap">
                    <span className="text-base font-medium flex items-center gap-2">
                      <div className="p-1 bg-secondary rounded-full">
                    <PanHorizontal width={18} height={18} className="text-white"/>

                      </div>
                    {/* <Image src={distanceIcon} alt="Activities icon" width={24} height={24} /> */}
                    {activities.activitiesRange}
                  </span>
                  <span className="text-base font-medium flex items-center gap-2">
                  <div className="p-1 bg-secondary rounded-full">
                    <Time width={18} height={18} className="text-white"/>
                  </div>
                    {activities.activitiesDuration}
                  </span>
                </div>

                  <p className="text-neutral-600 font-normal text-[14px]">
                    {activities.activitiesDescription}
                  </p>

                  

                  {activities.activitiesURL && activities.activitiesURL.trim() !== "" && (
                  <a href={activities.activitiesURL} className="text-sm flex items-center gap-2 text-bluelink hover:translate-x-2 duration-700 transition-all w-fit mb-4">
                    lihat di peta
                    <ArrowRight className='text-bluelink mt-[2px]' width={16} height={16}/>
                  </a>
                  )}
              </div>
            </div>
        ))}
      </div>

      <OtherActivitiesSection />

    </section>
  );
};

export default ActivitiesSection;

