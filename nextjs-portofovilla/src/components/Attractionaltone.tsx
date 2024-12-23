'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { client } from '@/sanity/client';
import Image from 'next/image';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";

import palmLeaf from '../../public/palm-leaf-shadow.png';
import WaLogo from '../../public/logos_whatsapp-icon.svg';
import ButtonWa from '../../components/common/ButtonWa';
import attractionIcon from '../../public/attraction-ico.svg';
import distanceIcon from '../../public/distance-ico.svg';

import '../styles/custom-swiper.css';

const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => {
  return source ? builder.image(source).auto('format').fit('max').url() : '';
};

const ATTRACTION_QUERY = `*[_type == "attraction"][0]`;

const AttractionSplide = () => {
  const [attractionData, setAttractionData] = useState<SanityDocument | null>(null);
  const prevAttArrowRef = useRef<HTMLButtonElement>(null);
  const nextAttArrowRef = useRef<HTMLButtonElement>(null);
  const splideAttRef = useRef<Splide | null>(null);

  useEffect(() => {
    const fetchAttractionData = async () => {
      const data = await client.fetch<SanityDocument>(ATTRACTION_QUERY);
      setAttractionData(data);
    };

    fetchAttractionData();
  }, []);

  useEffect(() => {
    if (!attractionData || splideAttRef.current) return; // Avoid reinitializing Splide

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

    // Handle the opacity of the arrows when moving the slide
    const adjustArrowsOpacity = () => {
        const perPage = splide.options.perPage; // Get the current `perPage` value
        const isFirst = splide.index === 0;
        const isLast = splide.index === splide.length - perPage; // Adjust `isLast` dynamically

        if (prevAttArrowRef.current) {
            prevAttArrowRef.current.style.opacity = isFirst ? '0.7' : '1';
            prevAttArrowRef.current.disabled = isFirst;
        }

        if (nextAttArrowRef.current) {
            nextAttArrowRef.current.style.opacity = isLast ? '0.7' : '1';
            nextAttArrowRef.current.disabled = isLast;
        }
    };

    splide.on('moved', adjustArrowsOpacity); // Adjust arrows on slide move
    adjustArrowsOpacity(); // Initial adjustment

    return () => {
        splide.destroy(); // Clean up on unmount
        if (prevAttArrowRef.current) {
            prevAttArrowRef.current.removeEventListener('click', handlePrevClick);
        }
        if (nextAttArrowRef.current) {
            nextAttArrowRef.current.removeEventListener('click', handleNextClick);
        }
    };
}, [attractionData]);

if (!attractionData) {
  return <div>Loading...</div>;
}

  return (
    <section className="splide max-w-full mx-auto bg-[#FFF] py-24 px-4 overflow-hidden relative" id="activities">
<Image src={palmLeaf} alt="palm-leaf" className="absolute left-0 bottom-0 z-0 scale-x-[-1]" />

      <div className="max-w-[1296px] mx-auto">
      <Image src={attractionIcon} alt="Attraction icon" width={100} height={100} className="mb-8" />
      <h2 className="text-xl lg:text-3xl text-black font-medium mb-0">
          {attractionData.title}
        </h2>
        <h3 className="text-xl lg:text-3xl text-black font-medium mb-10">
          {attractionData.subtitle}
        </h3>
      </div>

      <div className="max-w-[1296px] mx-auto relative">
        {/* Splide Carousel */}
        <div className="splide__track max-w-[1296px] mb-[120px] md:mb-12 mx-auto overflow-initial">
          <ul className="splide__list overflow-initial">
            {attractionData.attractions?.map((attraction: any, index: number) => (
              <li className="splide__slide" key={index}>
                <div
              className="flex flex-col h-[540px] rounded min-w-[300px] items-start justify-end p-4 hover:translate-y-[-6px] transition-all"
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
              </li>
            ))}
          </ul>
        </div>

        {/* Custom Arrows */}
        <button ref={prevAttArrowRef} className="custom-arrow custom-arrow--prev opacity-70" />
        <button ref={nextAttArrowRef} className="custom-arrow custom-arrow--next" />
      </div>

      {/* CTA Button */}
      <div className="max-w-[1296px] mx-auto flex justify-center">
        <ButtonWa
          link={attractionData.linkCTA}
          text="Tanya jalur lebih jelas"
          type="white"
          iconType={WaLogo.src}
        />
      </div>
    </section>
  );
};

export default AttractionSplide;
