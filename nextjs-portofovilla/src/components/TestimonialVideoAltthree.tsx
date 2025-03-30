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
      type: 'loop',
      perPage: 3,
      lazyLoad: 'nearby',
      gap: '16px',
      speed: 500,
      perMove: 1,
      autoHeight: true,
      arrows: false,
      pagination: false,
      breakpoints: {
        768: { perPage: 1, perMove: 1 },
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
    <section className="splide splidetestimonial max-w-full mx-auto bg-lightbg py-10 md:py-[144px] px-4 md:px-6 relative overflow-hidden" id="testimonies">
      <Image src={palmLeaf} alt="palm-leaf" className="absolute right-0 bottom-0 z-0" />

      <div className="max-w-[1296px] block m-auto">

        <div className="flex justify-between flex-col items-end md:flex-row  mb-8">
          <div className='w-full'>
            <div className="flex flex-row items-center gap-2 mb-2">
              <Image src={testimony} alt="testimony icon" width={80} height={64} className="w-16 mb-2" />
              <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{testimonyData.title}</h2>
            </div>

            <h3 className="font-montserrat text-2xl md:text-4xl font-bold text-black max-w-[990px] mb-8 md:mb-0">{testimonyData.subtitle}</h3>
          </div>

        
        <div className="flex gap-2">
          <button ref={prevArrowRef} className="custom-arrow-top border border-primary rounded-full custom-arrow--prev" />
          <button ref={nextArrowRef} className="custom-arrow-top border border-primary rounded-full custom-arrow--next" />
        </div>
      </div>
      {/* </div>

      <div className="max-w-[1296px] block m-auto">

      <div className="flex flex-row items-center gap-2 mb-2">
        <Image src={testimony} alt="testimony icon" width={80} height={64} className="w-16 mb-2" />
        <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{testimonyData.title}</h2>
      </div>

      <h3 className="font-montserrat text-2xl md:text-4xl font-bold mb-8 text-black max-w-[990px]">{testimonyData.subtitle}</h3> */}


    
      

      <div className="mx-auto relative">
        <div className="splide__track mb-4 mx-auto overflow-initial">
          <ul className="splide__list">
            {testimonyData.testimonies?.map((testimony: any, index: number) => (
              <li className="splide__slide" key={index}>
                <div className="flex flex-col min-h-[380px] h-full rounded bg-white border border-[#d9d9d9] p-6 justify-between gap-2 transition-all">
                  
                  {/* <div className="flex gap-1">
                    {Array(testimony.testimonyRating || 0)
                      .fill(null)
                      .map((_, starIndex) => (
                        <Image key={starIndex} src={star} alt="Star icon" width={24} height={24} className="w-5 h-5" />
                      ))}
                  </div> */}

              <div  className="flex flex-col items-start text-start w-full"
              >
                <div className="flex gap-2 items-center">
                  <p className="text-primary text-lg font-semibold">{testimony.testimonyRating}</p>
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
                </div>
                <p className="text-primary text-2xl font-semibold mt-4 mb-4">
                    "{testimony.testimonyHighlight}"
                  </p>
                  
                  <p className="text-black text-start">{testimony.testimony}</p>
                
                </div>
                  <div className="flex items-center gap-4">
                  
                  <Image
                    src={urlFor(testimony.testimonyImage)}  // Correctly accessing the image
                    alt={testimony.testimonyName}
                    width={200}
                    height={200}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                  <p className="text-black text-base font-[500]">
                    {testimony.testimonyName}{' '}
                    
                  </p>
                  {testimony.testimonyFrom && <p className="text-gray-500">(dari {testimony.testimonyFrom})</p>}
                  </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
      </div>

      
      </div>

      {/* <div className="flex gap-2 max-w-[1296px] mx-auto justify-end">
        <button ref={prevArrowRef} className="custom-arrow-top border border-primary rounded-full custom-arrow--prev" />
        <button ref={nextArrowRef} className="custom-arrow-top border border-primary rounded-full custom-arrow--next" />
      </div> */}

      {/* <div className="flex gap-10 flex-wrap my-20 items-start md:items-center justify-center">
        {testimonyData?.platformRating?.length > 0 ? (
            testimonyData.platformRating.map((platform: any) => (

              

              <div key={platform.platformName} className="flex flex-col items-center text-center gap-2"
              >
                <div className="relative h-[24px] w-fit">
                <Image
                  src={starTemplate}
                  alt="{platform.platformName}"
                  width={400}
                  height={400}
                  className="w-[116px] h-[24px] relative z-30 bg-contain bg-no-repeat top-0"
                />
                <Image
                  src={starBackhold}
                  alt="{platform.platformName}"
                  width={400}
                  height={400}
                  className="w-[116px] h-[24px] absolute z-10 bg-contain bg-no-repeat top-0 left-0"
                />
                  
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
        </div> */}

      <div className="max-w-[1296px] mx-auto flex flex-wrap justify-center mt-8 gap-4">

      <div className="flex flex-1 min-w-[230px]">
        <ButtonWa 
        link={testimonyData.linkFeedback}
          text="Tulis ulasanmu"
          type="transparent-border"
          iconType={<LicenseDraft size={24} />}
          radius='lg'
          width='full'
          displayDesktop={true}
          displayMobile={true}
        />
        </div>
        <div className="flex flex-1 min-w-[230px]">
        <ButtonWa 
        link={testimonyData.linkReview}
          text="Lihat testimoni lain"
          type="white"
          iconType={GmapLogo.src}
          radius='lg'
          width='full'
          displayDesktop={true}
          displayMobile={true}
        />
        </div>
      </div>
    </section>
  );
};

export default TestimonySplide;
