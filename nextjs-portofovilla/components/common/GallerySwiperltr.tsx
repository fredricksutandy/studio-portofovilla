'use client';

import { useEffect, useRef } from 'react';
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/dist/css/splide.min.css';
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from 'next/image';

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => {
  return source ? builder.image(source).auto('format').fit('max').url() : '';
};

const SplideComponent: React.FC<SplideComponentProps> = ({ data, autoScrollSpeed = 1, reverse = false }) => {
  const splideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (splideRef.current) {
      const splide = new Splide(splideRef.current, {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        lazyLoad: 'nearby', // Only load nearby slides
        perPage: 4, // Adjust for visible slides
        gap: '16px',
        arrows: false,
        pagination: false,
        direction: reverse ? 'rtl' : 'ltr', // Handle reverse direction
        autoScroll: {
          speed: autoScrollSpeed,
          rewind: true,
          pauseOnHover: true,
          pauseOnFocus: false,
        },
        breakpoints: {
          768: {
            perPage: 2,
          },
          1024: {
            perPage: 3,
          },
        },
      });

      splide.mount({ AutoScroll }); // Mount with AutoScroll extension
    }
  }, [autoScrollSpeed, reverse]);

  return (
    <div ref={splideRef} className="splide mb-4 md:mb-6 overflow-initial">
      <div className="splide__track overflow-initial">
        <ul className="splide__list overflow-initial">
          {data?.map((item, index) => (
            <li key={index} className="splide__slide">
              <div className="flex flex-col h-[180px] md:h-[270px] rounded bg-white border border-graymuted p-6 justify-between gap-2 hover:translate-y-[-6px] transition-all">
                {/* Display the image */}
                {item?.image ? (
                  <Image
                    src={urlFor(item.image).toString()}
                    alt={`Gallery Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-200 text-sm text-gray-600 h-full">
                    No Image Available
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SplideComponent;
