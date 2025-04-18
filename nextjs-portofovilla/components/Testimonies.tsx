'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import testimony from '../public/light-green-testimony-ico.svg';
import starTemplateWhite from '../public/star-template-white.png';
import starBackhold from '../public/star-backhold.png';
import staroutline from '../public/staroutline-ico.svg';
import ButtonWa from "./common/ButtonWa";
import imageUrlBuilder from "@sanity/image-url";
import { LicenseDraft } from "@carbon/icons-react";
import GmapLogo from '../public/google-maps-2020-icon.svg';


const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();
// Sanity query to fetch the 'testimony' document
const TESTIMONY_QUERY = `*[_type == "testimonyVideo"][0]`;

const TestimonySection = () => {
  const [testimonyData, setTestimonyData] = useState<any>(null);

  useEffect(() => {
    const fetchTestimonyData = async () => {
      const data = await client.fetch<SanityDocument>(TESTIMONY_QUERY);
      setTestimonyData(data);
    };

    fetchTestimonyData();
  }, []);

  if (!testimonyData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="justify-between mx-auto bg-floral-bg bg-[100%] px-5 py-10 md:py-[144px] relative rounded-3xl md:rounded-[64px]" id="testimonies">
      <div className="max-w-[1296px] block m-auto">
      <div className="flex flex-col items-center gap-2 mb-2 md:mb-6">
          <Image src={testimony} alt="Asterisk icon" width={80} height={64} className="w-16 md:w-20 mb-2 mx-auto" />
          <h2 className="font-krona text-base md:text-lg text-[#99CE8F] font-medium leading-[100%!important]">{testimonyData.title}</h2>
        </div>

        <h3 className="font-montserrat mx-auto text-center mb-10 text-3xl md:text-5xl font-bold text-white max-w-[990px]">{testimonyData.subtitle}</h3>


        <div className="flex gap-2 mb-6 md:mb-12 items-center justify-center">
        <Image src={staroutline} alt="Asterisk icon" width={32} height={32} className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] filter grayscale brightness-0 invert"/>
        <p className="text-lg md:text-2xl text-white"><span className="text-xl md:text-2xl font-semibold">4.8 </span> dari <span className="text-xl md:text-2xl font-semibold">5 </span> Pengunjung kami merasa puas!</p>
        </div>

        <div className="w-full mb-[80px] z-10 p-0 md:py-10 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white rounded-3xl overflow-hidden">
          {testimonyData.testimonies?.slice(0, 3).map((testimony, index) => (
            <div
            key={index}
            className={`flex flex-col bg-white p-8 md:px-10 justify-between self-stretch gap-2 transition-all border-b md:border-b-0 border-r border-neutral-200
              ${index === 2 ? 'border-r-0 border-b-0' : ''}
            `}
          >
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
                <p className="text-primary text-xl md:text-2xl font-bold">
                    {testimony.testimonyHighlight}
                  </p>
                  <p className="text-black text-sm md:text-base text-start">{testimony.testimony}</p>
                
                </div>
                  <div className="flex items-center gap-2 mt-8">
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
          ))}
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
        
      </div>
    </section>
  );
};

export default TestimonySection;
