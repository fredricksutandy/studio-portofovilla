'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { client } from '@/sanity/client';
import Image from 'next/image';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityDocument } from 'next-sanity';
import palmLeaf from '../../public/palm-leaf-shadow.png';
import activitiesIcon from '../../public/activities-ico.svg';
import { ArrowRight, PanHorizontal, Time } from '@carbon/icons-react';
import OtherActivitiesSection from "../../src/components/OtherActivities";


import '../styles/custom-swiper.css';
import '../styles/custom-swiper-alt-top.css';

const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => {
  return source ? builder.image(source).auto('format').fit('max').url() : '';
};

const ACTIVITIES_QUERY = `*[_type == "activities"][0]`;

const ActivitiesSplide = () => {
  const [activitiesData, setActivitiesData] = useState<SanityDocument | null>(null);
  const prevAttArrowRef = useRef<HTMLButtonElement>(null);
  const nextAttArrowRef = useRef<HTMLButtonElement>(null);
  const splideAttRef = useRef<Splide | null>(null);

  useEffect(() => {
    const fetchActivitiesData = async () => {
      const data = await client.fetch<SanityDocument>(ACTIVITIES_QUERY);
      setActivitiesData(data);
    };

    fetchActivitiesData();
  }, []);

  const initializeSplide = useCallback(() => {
    if (splideAttRef.current) return; // Avoid reinitializing

    const splide = new Splide('.splide', {
      perPage: 3,
      lazyLoad: 'nearby',
      gap: '16px',
      perMove: 1,
      arrows: false, // Disable default arrows
      pagination: false,
      breakpoints: {
        768: { perPage: 1 },
        1024: { perPage: 2 },
      },
    }).mount();

    splideAttRef.current = splide;

    // Handle the custom arrow button clicks
    const handlePrevClick = () => splide.go('-1');
    const handleNextClick = () => splide.go('+1');

    if (prevAttArrowRef.current && nextAttArrowRef.current) {
      prevAttArrowRef.current.addEventListener('click', handlePrevClick);
      nextAttArrowRef.current.addEventListener('click', handleNextClick);
    }

    // Adjust arrow opacity dynamically
    const adjustArrowsOpacity = () => {
      const perPage = splide.options.perPage; // Current `perPage` value
      const isFirst = splide.index === 0;
      const isLast = splide.index === splide.length - perPage;

      if (prevAttArrowRef.current) {
        prevAttArrowRef.current.style.opacity = isFirst ? '0.5' : '1';
        prevAttArrowRef.current.disabled = isFirst;
      }

      if (nextAttArrowRef.current) {
        nextAttArrowRef.current.style.opacity = isLast ? '0.5' : '1';
        nextAttArrowRef.current.disabled = isLast;
      }
    };

    splide.on('moved', adjustArrowsOpacity);
    adjustArrowsOpacity(); // Initial adjustment
  }, []);

  useEffect(() => {
    if (activitiesData) {
      initializeSplide();
    }

    return () => {
      if (splideAttRef.current) {
        splideAttRef.current.destroy();
        splideAttRef.current = null;
      }
    };
  }, [activitiesData, initializeSplide]);

  if (!activitiesData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="splide max-w-full mx-auto bg-white px-4 md:px-6 py-10 md:py-[120px] overflow-hidden relative" id="activities">
      <Image src={palmLeaf} alt="palm-leaf" className="absolute left-0 bottom-0 z-0 scale-x-[-1]" />

      <div className="max-w-[1296px] mx-auto mb-8">
      <div className="flex flex-row  items-end gap-2 mb-6">
            <Image src={activitiesIcon} alt="Asterisk icon" width={48} height={48} className=""/>
            <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{activitiesData.title}</h2>
          </div>
        {/* <Image src={activitiesIcon} alt="Activities icon" width={100} height={100} className="mb-8 mx-auto" />
        <h2 className="font-krona text-2xl lg:text-4xl text-primary font-semibold mb-4 text-center">
          {activitiesData.title}
        </h2> */}
        <h3 className="font-montserrat text-2xl md:text-4xl font-bold text-black mb-2 max-w-[990px]">
          {activitiesData.subtitle}
        </h3>
      </div>

      <div className="max-w-[1296px] mx-auto relative">
        <div className="splide__track max-w-[1296px] mb-[120px] md:mb-12 mx-auto">
          <ul className="splide__list">
            {activitiesData.activities?.map((activities: any, index: number) => (
              <li className="splide__slide bg-white border border-graymuted rounded overflow-hidden" key={index}>
                <Image
                    src={urlFor(activities.activitiesImage) || ''}
                    alt="Activity Image"
                    width={420}
                    height={300}
                    objectFit="cover"
                    objectPosition="center"
                    priority
                    className='w-full h-[220px] md:h-[260px] object-cover'
                  />
                <div className="p-4 flex flex-col gap-2 md:gap-4">
                
                  <div className='border-b-2 pb-2 md:pb-4'>
                    <h3 className="font-medium text-xl">
                      {index + 1}. {activities.activitiesTitle}
                    </h3>
                    <span className='text-sm font-semibold text-gray-500'>Adventurous</span>
                  </div>

                  

                  <p className="text-neutral-600 font-normal text-[14px]">
                    {activities.activitiesDescription}
                  </p>

                  <div className="flex gap-2 flex-col mb-4">
                    <span className="text-base font-medium flex items-center gap-2">
                    <div className="p-1 bg-secondary rounded-full">
                    <PanHorizontal width={18} height={18} className="text-white"/>

                      </div>
                    {activities.activitiesRange}
                  </span>
                  <span className="text-base font-medium flex items-center gap-2">
                  <div className="p-1 bg-secondary rounded-full">
                    <Time width={18} height={18} className="text-white"/>
                  </div>                    {activities.activitiesDuration}
                  </span>
                  </div>
                  {activities.activitiesURL && activities.activitiesURL.trim() !== "" && (
                  <a href={activities.activitiesURL} className="text-sm flex items-center gap-2 text-bluelink hover:translate-x-2 transition-all w-fit duration-700">
                    lihat di peta
                    <ArrowRight className='text-bluelink mt-[2px]' width={16} height={16}/>
                  </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button ref={prevAttArrowRef} className="custom-arrow  less-top custom-arrow--prev opacity-50" />
        <button ref={nextAttArrowRef} className="custom-arrow  less-top custom-arrow--next" />
      </div>

      <OtherActivitiesSection />

    </section>
  );
};

export default ActivitiesSplide;
