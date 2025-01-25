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
import distanceIcon from '../../public/distance-ico.svg';
import arrowRight from '../../public/carbon_arrow-right.svg';

import '../styles/custom-swiper.css';

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
        prevAttArrowRef.current.style.opacity = isFirst ? '0.7' : '1';
        prevAttArrowRef.current.disabled = isFirst;
      }

      if (nextAttArrowRef.current) {
        nextAttArrowRef.current.style.opacity = isLast ? '0.7' : '1';
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
    <section className="splide max-w-full mx-auto bg-[#FFF] py-24 px-4 overflow-hidden relative" id="activities">
      <Image src={palmLeaf} alt="palm-leaf" className="absolute left-0 bottom-0 z-0 scale-x-[-1]" />

      <div className="max-w-[1296px] mx-auto">
        <Image src={activitiesIcon} alt="Activities icon" width={100} height={100} className="mb-8" />
        <h2 className="font-krona text-2xl lg:text-4xl text-[#1A520F] font-semibold mb-4">
          {activitiesData.title}
        </h2>
        <h3 className="text-lg text-gray-600 font-medium mb-4 max-w-[460px]">
          {activitiesData.subtitle}
        </h3>
      </div>

      <div className="max-w-[1296px] mx-auto relative">
        <div className="splide__track max-w-[1296px] mb-[120px] md:mb-12 mx-auto overflow-initial">
          <ul className="splide__list overflow-initial">
            {activitiesData.activities?.map((activities: any, index: number) => (
              <li className="splide__slide" key={index}>
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
                  <a href={activities.activitiesURL} className="absolute right-2 top-2 text-sm text-white flex gap-2">
                    lihat di peta
                    <Image src={arrowRight} alt="guest icon" width={16} height={16} />
                  </a>
                </div>
                <p className="text-black font-normal text-[14px] mt-2">
                  {activities.activitiesDescription}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <button ref={prevAttArrowRef} className="custom-arrow custom-arrow--prev opacity-70" />
        <button ref={nextAttArrowRef} className="custom-arrow custom-arrow--next" />
      </div>
    </section>
  );
};

export default ActivitiesSplide;
