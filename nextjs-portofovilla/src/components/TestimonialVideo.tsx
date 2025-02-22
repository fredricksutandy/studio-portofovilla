'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { client } from '@/sanity/client';
import Image from 'next/image';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

import palmLeaf from '../../public/palm-leaf-shadow.png';
import testimony from '../../public/testimony-ico.svg';
import GmapLogo from '../../public/google-maps-2020-icon.svg';
import star from '../../public/star-ico.svg';
import staroutline from '../../public/staroutline-ico.svg';
import ButtonWa from '../../components/common/ButtonWa';

const TESTIMONY_QUERY = `*[_type == "testimonyVideo"][0]`;

const TestimonySplide = () => {
  const [testimonyData, setTestimonyData] = useState<any>(null);
  const prevArrowRef = useRef<HTMLButtonElement>(null);
  const nextArrowRef = useRef<HTMLButtonElement>(null);
  const splideRef = useRef<Splide | null>(null);

  // Fetch testimony data
  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(TESTIMONY_QUERY);
      setTestimonyData(data);
    };
    fetchData();
  }, []);

  // Initialize Splide
  const initializeSplide = useCallback(() => {
    if (!testimonyData || splideRef.current) return;

    const splide = new Splide('.splidetestimonial', {
      perPage: 2,
      lazyLoad: 'nearby',
      gap: '16px',
      perMove: 1,
      arrows: false,
      pagination: false,
      breakpoints: {
        768: { perPage: 1 },
        1024: { perPage: 2 },
      },
    }).mount();

    splideRef.current = splide;

    const handlePrevClick = () => splide.go('-1');
    const handleNextClick = () => splide.go('+1');

    if (prevArrowRef.current && nextArrowRef.current) {
      prevArrowRef.current.addEventListener('click', handlePrevClick);
      nextArrowRef.current.addEventListener('click', handleNextClick);
    }

    const adjustArrowsOpacity = () => {
      const perPage = splide.options.perPage;
      const isFirst = splide.index === 0;
      const isLast = splide.index === splide.length - perPage;

      if (prevArrowRef.current) {
        prevArrowRef.current.style.opacity = isFirst ? '0.7' : '1';
        prevArrowRef.current.disabled = isFirst;
      }

      if (nextArrowRef.current) {
        nextArrowRef.current.style.opacity = isLast ? '0.7' : '1';
        nextArrowRef.current.disabled = isLast;
      }
    };

    splide.on('moved', adjustArrowsOpacity);
    adjustArrowsOpacity();
  }, [testimonyData]);

  // Destroy Splide on unmount
  useEffect(() => {
    if (testimonyData) {
      initializeSplide();
    }

    return () => {
      if (splideRef.current) {
        splideRef.current.destroy();
        splideRef.current = null;
      }

      if (prevArrowRef.current) {
        prevArrowRef.current.removeEventListener('click', () => {});
      }
      if (nextArrowRef.current) {
        nextArrowRef.current.removeEventListener('click', () => {});
      }
    };
  }, [testimonyData, initializeSplide]);

  if (!testimonyData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="splide splidetestimonial max-w-full mx-auto bg-[#f1f7ed] py-10 md:py-[80px] px-4 relative" id="testimonies">
      <Image src={palmLeaf} alt="palm-leaf" className="absolute right-0 bottom-0 z-0" />

      <div className="max-w-[1296px] block m-auto">
        <div className="mb-6">
          <Image src={testimony} alt="Asterisk icon" width={100} height={64} className="mb-6 mx-auto" />
          <h2 className="font-krona text-lg text-[#1A520F] font-semibold text-center">{testimonyData.title}</h2>
          {/* <h3 className="text-lg text-gray-600 font-medium mb-10 max-w-[460px]">{testimonyData.subtitle}</h3> */}
        </div>

        <div className="flex gap-2 mb-6 md:mb-12 items-start md:items-center justify-center">
          <Image src={staroutline} alt="Star outline icon" width={40} height={40} className="w-[24px] h-[24px] md:w-[40px] md:h-[40px] mt-1 md:mt-0" />
          <p className="text-lg md:text-3xl font-medium text-[#047C36]">
            <span className="text-2xl md:text-5xl font-semibold">4.8 </span> dari{' '}
            <span className="text-2xl md:text-5xl font-semibold">5 </span> Pengunjung kami merasa
            puas!
          </p>
        </div>
      </div>

      <div className="max-w-[1296px] mx-auto relative">
        <div className="splide__track max-w-[1296px] mb-[80px] md:mb-10 mx-auto">
          <ul className="splide__list">
            {testimonyData.testimonies?.map((testimony: any, index: number) => (
              <li className="splide__slide" key={index}>
                <div className="flex flex-col h-[280px] rounded bg-white border border-[#d9d9d9] p-6 justify-between gap-2 hover:translate-y-[-6px] transition-all">
                  <p className="text-[#1A520F] text-xl md:text-2xl font-semibold">
                    {testimony.testimonyHighlight}
                  </p>
                  <div className="flex gap-1">
                    {Array(testimony.testimonyRating || 0)
                      .fill(null)
                      .map((_, starIndex) => (
                        <Image key={starIndex} src={star} alt="Star icon" width={24} height={24} className="w-5 h-5" />
                      ))}
                  </div>
                  <p className="text-black text-base">{testimony.testimony}</p>
                  <p className="text-black text-sm font-medium">
                    {testimony.testimonyName}{' '}
                    {testimony.testimonyFrom && <span className="text-gray-500">(dari {testimony.testimonyFrom})</span>}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button ref={prevArrowRef} className="custom-arrow custom-arrow--prev opacity-70" />
        <button ref={nextArrowRef} className="custom-arrow custom-arrow--next" />
      </div>

      <h3 className="text-lg md:text-xl w-full text-start md:text-center text-black font-medium max-w-[1296px] mx-auto mb-8">
        Kisah dalam video
      </h3>
      <div className="flex flex-col md:flex-row gap-4 max-w-[1296px] mx-auto">
        {testimonyData.videos.map((video, index) => (
          <iframe
            key={index}
            width="1278"
            height="360"
            src={video.iframeLink}
            title={video.videoTitle}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="flex flex-auto md:flex-1 rounded w-full h-[200px] sm:h-[240px] md:h-[320px]"
          ></iframe>
        ))}
      </div>

      <div className="max-w-[1296px] mx-auto flex justify-center mt-8">
        <ButtonWa 
        link={testimonyData.linkCTA}
          text="Lihat testimoni lain"
          type="white"
          iconType={GmapLogo.src}
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
