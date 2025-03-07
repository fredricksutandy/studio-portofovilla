'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { client } from '@/sanity/client';
import Image from 'next/image';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

import palmLeaf from '../../public/palm-leaf-shadow.png';
import testimony from '../../public/testimony-ico.svg';
import GmapLogo from '../../public/google-maps-2020-icon.svg';
import { LicenseDraft } from "@carbon/icons-react";
import starTemplate from '../../public/star-template.png';
import starBackhold from '../../public/star-backhold.png';
import starTemplateWhite from '../../public/star-template-white.png';
import ButtonWa from '../../components/common/ButtonWa';
import airbnbLogo from '../../public/colored-ico/Airbnb-Logo.wine.svg';
import tiketComLogo from '../../public/colored-ico/Tiket.com_logo.svg';
import bookingComLogo from '../../public/colored-ico/Booking.com-Logo.wine.svg';
import agodaLogo from '../../public/colored-ico/Agoda_transparent_logo.svg';
import tripComLogo from '../../public/colored-ico/Trip.com_logo.svg.svg';
import travelokaLogo from '../../public/colored-ico/traveloka-logo-brandlogo.net.svg';
import googleLogo from '../../public/colored-ico/devicon_google.svg';

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

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

  const platformImages: Record<string, string> = {
    Airbnb: airbnbLogo,
    'Tiket-com': tiketComLogo,
    'Booking-com': bookingComLogo,
    Agoda: agodaLogo,
    'Trip-com': tripComLogo,
    Traveloka: travelokaLogo,
    Google: googleLogo
  };

  // Initialize Splide
  const initializeSplide = useCallback(() => {
    if (!testimonyData || splideRef.current) return;

    const splide = new Splide('.splidetestimonial', {
      perPage: 3,
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
    <section className="splide splidetestimonial max-w-full mx-auto bg-lightbg py-10 md:py-[144px] px-4 md:px-6 relative" id="testimonies">
      <Image src={palmLeaf} alt="palm-leaf" className="absolute right-0 bottom-0 z-0" />

      <div className="max-w-[1296px] block m-auto">
        <div className="flex flex-col items-center gap-2 mb-2 md:mb-6">
          <Image src={testimony} alt="Asterisk icon" width={80} height={64} className="w-16 md:w-20 mb-2 mx-auto" />
          <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{testimonyData.title}</h2>
        </div>

        <h3 className="font-montserrat mx-auto text-center mb-10 md:mb-16 text-2xl md:text-4xl font-bold text-black max-w-[990px]">{testimonyData.subtitle}</h3>

        <div className="flex gap-10 flex-wrap mb-8 md:mb-16 items-start md:items-center justify-center">
        {testimonyData?.platformRating?.length > 0 ? (
            testimonyData.platformRating.map((platform: any) => (

              

              <div key={platform.platformName} className="flex flex-col items-center text-center gap-2"
              >
                <div className="relative h-[16px] w-fit">
                <Image
                  src={starTemplate}
                  alt="{platform.platformName}"
                  width={300}
                  height={300}
                  className="w-[80px] h-[16px] relative z-30 bg-contain bg-no-repeat top-0"
                />
                <Image
                  src={starBackhold}
                  alt="{platform.platformName}"
                  width={300}
                  height={300}
                  className="w-[80px] h-[16px] absolute z-10 bg-contain bg-no-repeat top-0 left-0"
                />
                  {/* <div className="bg-star-template w-[128px] h-[26px] relative z-30 bg-contain bg-no-repeat"></div>
                  <div className="bg-star-holder w-[128px] h-[26px] absolute z-10 bg-contain bg-no-repeat top-0 left-0"></div> */}
                  <div
                    className="absolute top-0 left-0 h-full bg-green-700 z-20"
                    style={{
                      width: `${(parseFloat(platform.rating) / 5) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="flex gap-1 items-center">
                <p className="text-base font-normal text-neutral-600">
  Rated <span className="font-semibold">{platform.rating}</span> in
</p>
                <Image
                  src={platformImages[platform.platformName]}
                  alt={platform.platformName}
                  width={300}
                  height={300}
                  className="inline mr-2 w-auto h-5"
                />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No platform ratings available.</p>
          )}
          {/* <Image src={staroutline} alt="Star outline icon" width={40} height={40} className="w-[24px] h-[24px] md:w-[40px] md:h-[40px] mt-1 md:mt-0" />
          <p className="text-lg md:text-3xl font-medium text-secondary">
            <span className="text-lg md:text-3xl font-semibold">4.8 </span> dari{' '}
            <span className="text-lg md:text-3xl font-semibold">5 </span> Pengunjung kami merasa
            puas!
          </p> */}
        </div>
      </div>

      

      <div className="max-w-[1296px] mx-auto relative">
        <div className="splide__track max-w-[1296px] mb-[80px] md:mb-10 mx-auto">
          <ul className="splide__list">
            {testimonyData.testimonies?.map((testimony: any, index: number) => (
              <li className="splide__slide" key={index}>
                <div className="flex flex-col h-[280px] rounded bg-white p-6 justify-between gap-2 transition-all">
                  
                  {/* <div className="flex gap-1">
                    {Array(testimony.testimonyRating || 0)
                      .fill(null)
                      .map((_, starIndex) => (
                        <Image key={starIndex} src={star} alt="Star icon" width={24} height={24} className="w-5 h-5" />
                      ))}
                  </div> */}

              <div  className="flex flex-col items-start text-center gap-2 w-full"
              >
                <div className="relative h-[16px] w-fit">
                <Image
                  src={starTemplateWhite}
                  alt="{platform.platformName}"
                  width={300}
                  height={300}
                  className="w-[80px] h-[16px] relative z-30 bg-contain bg-no-repeat top-0"
                />
                <Image
                  src={starBackhold}
                  alt="{platform.platformName}"
                  width={300}
                  height={300}
                  className="w-[80px] h-[16px] absolute z-10 bg-contain bg-no-repeat top-0 left-0"
                />
                  <div
                    className="absolute top-0 left-0 h-full bg-green-700 z-20"
                    style={{
                      width: `${(parseFloat(testimony.testimonyRating) / 5) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-primary text-xl md:text-2xl font-semibold">
                    {testimony.testimonyHighlight}
                  </p>
                  <p className="text-black text-base text-start">{testimony.testimony}</p>
                
                </div>
                  <div className="flex items-center gap-2">
                  <Image
                    src={urlFor(testimony.testimonyImage)}  // Correctly accessing the image
                    alt={testimony.testimonyName}
                    width={300}
                    height={300}
                    className="w-7 h-7 rounded-full object-cover"
                  />

                  <p className="text-black text-sm font-medium">
                    {testimony.testimonyName}{' '}
                    {testimony.testimonyFrom && <span className="text-gray-500">(dari {testimony.testimonyFrom})</span>}
                  </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button ref={prevArrowRef} className="custom-arrow custom-arrow--prev opacity-70" />
        <button ref={nextArrowRef} className="custom-arrow custom-arrow--next" />
      </div>
        <div className="flex flex-col md:flex-row gap-4 max-w-[1296px] mx-auto mb-10md:mb-20">
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

        

      <div className="max-w-[1296px] mx-auto flex flex-wrap justify-center mt-8 gap-4">

      <ButtonWa 
        link={testimonyData.linkFeedback}
          text="Tulis ulasanmu"
          type="transparent-border"
          iconType={<LicenseDraft size={24} />}
          radius='lg'
          width='fit'
          displayDesktop={true}
          displayMobile={true}
        />
        <ButtonWa 
        link={testimonyData.linkReview}
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
