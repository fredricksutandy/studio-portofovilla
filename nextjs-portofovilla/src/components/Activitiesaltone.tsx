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
import arrowRightBlue from '../../public/carbon_arrow-right-blue.svg';

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

      <div className="max-w-[1296px] mx-auto mb-8">
        <Image src={activitiesIcon} alt="Activities icon" width={100} height={100} className="mb-8 mx-auto" />
        <h2 className="font-krona text-2xl lg:text-5xl text-[#1A520F] font-semibold mb-4 text-center">
          {activitiesData.title}
        </h2>
        <p className="text-lg text-gray-600 mb-4 max-w-[580px] mx-auto text-center">
          {activitiesData.subtitle}
        </p>
      </div>

      <div className="max-w-[1296px] mx-auto relative">
        <div className="splide__track max-w-[1296px] mb-[120px] md:mb-12 mx-auto overflow-initial">
          <ul className="splide__list overflow-initial">
            {activitiesData.activities?.map((activities: any, index: number) => (
              <li className="splide__slide bg-white border border-[#d9d9d9] rounded overflow-hidden" key={index}>
                <div
                  className="flex flex-col h-[280px] items-start justify-end p-4   transition-all"
                  style={{
                    backgroundImage: `url(${urlFor(activities.activitiesImage) || ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  
                </div>
                <div className="p-4 flex flex-col gap-4">
                
                  <div className='border-b-2 pb-4'>
                    <h3 className="font-medium text-xl">
                      {index + 1}. {activities.activitiesTitle}
                    </h3>
                    <span className='text-sm font-semibold text-[#666666]'>Adventurous</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-lg flex items-center gap-2">
                    <Image src={distanceIcon} alt="Activities icon" width={50} height={50} />
                    {activities.activitiesRange}
                  </span>
                  <span className="text-lg flex items-center gap-2">
                    <Image src={distanceIcon} alt="Activities icon" width={50} height={50} />
                    {activities.activitiesRange}
                  </span>
                  </div>

                  <p className="text-neutral-600 font-normal text-[14px]">
                    {activities.activitiesDescription}
                  </p>

                  
                
                  <a href={activities.activitiesURL} className="text-sm flex items-center gap-2 text-[#0064D3] hover:translate-x-2 transition-all">
                    lihat di peta
                    <Image src={arrowRightBlue} alt="guest icon" width={16} height={16} className='mt-1' />
                  </a>
                </div>
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
