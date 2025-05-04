'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { client } from '@/sanity/client';
import Image from 'next/image';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import testimony from '../../public/light-green-testimony-ico.svg';
import GmapLogo from '../../public/google-maps-2020-icon.svg';
import { LicenseDraft } from "@carbon/icons-react";
import starBackhold from '../../public/star-backhold.png';
import starTemplateWhite from '../../public/star-template-white.png';
import ButtonWa from '../../components/common/ButtonWa';
import { platformData } from '@/constant/platforms';

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).url();

const TESTIMONY_QUERY = `*[_type == "testimonyVideo"][0]{
  ...,
  "platforms": platformRating[].platformName
}`;

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
    <section className="splide splidetestimonial max-w-full mx-auto bg-floral-bg py-20 md:py-[120px] px-4 md:px-6 relative rounded-3xl" id="testimonies">
      {/* <Image src={palmLeaf} alt="palm-leaf" className="absolute right-0 bottom-0 z-0" /> */}

      <div className="max-w-[1296px] block m-auto">
        <div className="flex flex-col items-center gap-2 mb-2 md:mb-6">
        <Image src={testimony} alt="Asterisk icon" width={48} height={48} className="w-14 md:w-16 mb-2 mx-auto" />
        <h2 className="font-krona text-base text-[#99CE8F] font-medium leading-[100%!important]">{testimonyData.title}</h2>
        </div>

        <h3 className="font-montserrat mx-auto text-center mb-10 text-2xl md:text-3xl font-bold text-white max-w-[990px]">{testimonyData.subtitle}</h3>

        

        <div className="flex gap-3 flex-wrap mb-10 items-start md:items-center justify-center max-w-[660px] mx-auto">
          {testimonyData?.platformRating?.length > 0 ? (
            testimonyData.platformRating.map((platform: any) => (
              <div key={platform.platformName} className="flex flex-col items-center text-center gap-2 bg-white py-3 px-4 rounded-full">
                <div className="relative h-[14px] w-fit">
                  <Image
                    src={starTemplateWhite}
                    alt={platform.platformName}
                    width={300}
                    height={300}
                    className="w-[72px] h-[14px] relative z-30 bg-contain bg-no-repeat top-0"
                  />
                  <Image
                    src={starBackhold}
                    alt={platform.platformName}
                    width={300}
                    height={300}
                    className="w-[72px] h-[14px] absolute z-10 bg-contain bg-no-repeat top-0 left-0"
                  />
                  <div
                    className="absolute top-0 left-0 h-full bg-green-700 z-20"
                    style={{
                      width: `${(parseFloat(platform.rating) / 5) * 100}%`,
                    }}
                  >
                  </div>
                </div>

                <div className="flex gap-1 items-center">
                  <p className="text-sm font-normal text-neutral-600">
                    Rated <span className="font-semibold">{platform.rating}</span> in
                  </p>
                  <Image
                    src={platformData[platform.platformName]?.logo || platformData['Google'].logo}
                    alt={platform.platformName}
                    width={300}
                    height={300}
                    className="inline mr-2 w-auto h-4"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No platform ratings available.</p>
          )}
        </div>
      </div>

      

      <div className="max-w-[1296px] mx-auto relative">
        <div className="splide__track max-w-[1296px] mb-[80px] md:mb-10 mx-auto">
          <ul className="splide__list">
            {testimonyData.testimonies?.map((testimony: any, index: number) => (
              <li className="splide__slide" key={index}>
                <div className="flex flex-col h-full bg-white p-6 justify-between gap-2 transition-all rounded">
                  
                  {/* <div className="flex gap-1">
                    {Array(testimony.testimonyRating || 0)
                      .fill(null)
                      .map((_, starIndex) => (
                        <Image key={starIndex} src={star} alt="Star icon" width={24} height={24} className="w-5 h-5" />
                      ))}
                  </div> */}

              <div  className="flex flex-col items-start text-center gap-2 w-full"
              >
                <div className="relative h-[24px] w-fit">
                <Image
                  src={starTemplateWhite}
                  alt="{platform.platformName}"
                  width={300}
                  height={300}
                  className="w-[120px] h-[24px] relative z-30 bg-contain bg-no-repeat top-0"
                />
                <Image
                  src={starBackhold}
                  alt="{platform.platformName}"
                  width={300}
                  height={300}
                  className="w-[120px] h-[24px] absolute z-10 bg-contain bg-no-repeat top-0 left-0"
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
                  <p className="text-gray-700 text-sm text-start">{testimony.testimony}</p>
                
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
        

        

      <div className="max-w-[1296px] mx-auto flex flex-wrap justify-center mt-8 gap-4">

      <ButtonWa 
        link={testimonyData.linkFeedback}
          text="Tulis ulasanmu"
          type="green"
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
