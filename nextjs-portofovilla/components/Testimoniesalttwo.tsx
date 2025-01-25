'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { client } from '@/sanity/client';
import Image from 'next/image';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

import palmLeaf from '../public/palm-leaf-shadow.png';
import testimony from '../public/testimony-ico.svg';
import WaLogo from '../public/logos_whatsapp-icon.svg';
import star from '../public/star-ico.svg';
import staroutline from '../public/staroutline-ico.svg';
import ButtonWa from './common/ButtonWa';
import '../src/styles/custom-swiper.css';

// Sanity query to fetch the 'testimony' document
const TESTIMONY_QUERY = `*[_type == "testimonyVideo"][0]`;

const TestimonySplide = () => {
  const [testimonyData, setTestimonyData] = useState<any>(null);
  const prevArrowRef = useRef<HTMLButtonElement>(null);
  const nextArrowRef = useRef<HTMLButtonElement>(null);
  const splideRef = useRef<Splide | null>(null);

  // Fetching the testimony data
  useEffect(() => {
    const fetchTestimonyData = async () => {
      const data = await client.fetch(TESTIMONY_QUERY);
      setTestimonyData(data);
    };

    fetchTestimonyData();
  }, []);

  useEffect(() => {
    if (!testimonyData || splideRef.current) return; // Avoid reinitializing Splide

    const splide = new Splide('.splidetestimonial', {
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

    splideRef.current = splide;

    // Handle the custom arrow button clicks
    const handlePrevClick = () => splide.go('-1');
    const handleNextClick = () => splide.go('+1');

    if (prevArrowRef.current && nextArrowRef.current) {
        prevArrowRef.current.addEventListener('click', handlePrevClick);
        nextArrowRef.current.addEventListener('click', handleNextClick);
    }

    // Handle the opacity of the arrows when moving the slide
    const adjustArrowsOpacity = () => {
        const perPage = splide.options.perPage; // Get the current `perPage` value
        const isFirst = splide.index === 0;
        const isLast = splide.index === splide.length - perPage; // Adjust `isLast` dynamically

        if (prevArrowRef.current) {
            prevArrowRef.current.style.opacity = isFirst ? '0.7' : '1';
            prevArrowRef.current.disabled = isFirst;
        }

        if (nextArrowRef.current) {
            nextArrowRef.current.style.opacity = isLast ? '0.7' : '1';
            nextArrowRef.current.disabled = isLast;
        }
    };

    splide.on('moved', adjustArrowsOpacity); // Adjust arrows on slide move
    adjustArrowsOpacity(); // Initial adjustment

    return () => {
        splide.destroy(); // Clean up on unmount
        if (prevArrowRef.current) {
            prevArrowRef.current.removeEventListener('click', handlePrevClick);
        }
        if (nextArrowRef.current) {
            nextArrowRef.current.removeEventListener('click', handleNextClick);
        }
    };
}, [testimonyData]);

if (!testimonyData) {
  return <div>Loading...</div>;
}

  return (
    <section className="splide splidetestimonial max-w-full mx-auto bg-[#f1f7ed] py-10 md:py-[80px] px-4 relative" id="testimonies">
      {/* Background Image */}
      <Image src={palmLeaf} alt="palm-leaf" className="absolute right-0 bottom-0 z-0" />

      {/* Title and Subtitle */}
      <div className="max-w-[1296px] block m-auto">
        <div className="mb-6 md:mb-12">
          <Image src={testimony} alt="Asterisk icon" width={100} height={64} className="mb-6" />
          <h2 className="text-xl md:text-3xl w-full text-black font-medium">
            {testimonyData.subtitle}
          </h2>
        </div>

        {/* Rating Section */}
        <div className="flex gap-2 mb-6 md:mb-12 items-start md:items-center">
          <Image
            src={staroutline}
            alt="Star outline icon"
            width={40}
            height={40}
            className="w-[24px] h-[24px] md:w-[40px] md:h-[40px] mt-1 md:mt-0"
          />
          <p className="text-lg md:text-2xl text-[#047C36]">
            <span className="text-2xl md:text-4xl font-semibold">4.8 </span> dari{' '}
            <span className="text-2xl md:text-4xl font-semibold">5 </span> Pengunjung kami merasa
            puas!
          </p>
        </div>
      </div>

      <div className="max-w-[1296px] mx-auto relative">
        {/* Splide Carousel */}
        <div className="splide__track max-w-[1296px] mb-[80px] md:mb-10 mx-auto">
          <ul className="splide__list">
            {testimonyData.testimonies?.map((testimony: any, index: number) => (
              <li className="splide__slide" key={index}>
                <div className="flex flex-col h-[320px] rounded bg-white border border-[#d9d9d9] p-6 justify-between gap-2 hover:translate-y-[-6px] transition-all">
                  {/* Testimony Content */}
                  <div className="flex flex-col gap-6">
                    <p className="text-[#1A520F] text-xl md:text-2xl font-semibold">
                      {testimony.testimonyHighlight}
                    </p>
                    <div className="flex gap-1">
                      {Array(testimony.testimonyRating || 0)
                        .fill(null)
                        .map((_, starIndex) => (
                          <Image
                            key={starIndex}
                            src={star}
                            alt="Star icon"
                            width={24}
                            height={24}
                            className="w-5 h-5"
                          />
                        ))}
                    </div>
                    <p className="text-black text-base">{testimony.testimony}</p>
                  </div>
                  <p className="text-black text-sm font-medium">
                    {testimony.testimonyName}{' '}
                    {testimony.testimonyFrom && (
                      <span className="text-gray-500">(from {testimony.testimonyFrom})</span>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Custom Arrows */}
        <button ref={prevArrowRef} className="custom-arrow custom-arrow--prev opacity-70" />
        <button ref={nextArrowRef} className="custom-arrow custom-arrow--next" />
      </div>

      <h3 className='text-lg md:text-xl w-full text-start md:text-center text-black font-medium max-w-[1296px] mx-auto mb-6'>Kisah dalam video</h3>
      <div className="flex flex-col md:flex-row gap-4 max-w-[1296px] mx-auto">
        {testimonyData.videos.map((video, index) => (
          <iframe
            key={index} // Use a unique key for each iframe
            width="1278"
            height="360"
            src={video.iframeLink} // Dynamically set the iframe source
            title={video.videoTitle} // Dynamically set the iframe title
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="flex flex-auto md:flex-1 rounded w-full h-[200px] sm:h-[240px] md:h-[320px]"
          ></iframe>
        ))}
      </div>


      {/* CTA Button */}
      <div className="max-w-[1296px] mx-auto flex justify-center">
        <ButtonWa
          link={testimonyData.linkCTA}
          text="Tanya jalur lebih jelas"
          type="white"
          iconType={WaLogo.src}
          radius='lg'
          width='fit'
          displayDesktop={true}
          displayMobile={true}
        />
      </div>
    </section>
  );
};

export default TestimonySplide;
