'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import asterisk from '../public/asterisk-ico.svg'
import palmLeaf from '../public/palm-leaf-shadow.png'
import arrowLink from '../public/visit-arrow.svg'
import moon from '../public/carbon_mostly-cloudy-night.svg'
import rateReview from '../public/carbon_star.svg'
import happyCustomer from '../public/carbon_user-favorite.svg'
import { Krona_One } from 'next/font/google'; // Use the correct font import

const kronaOne = Krona_One({
  weight: '400', // Specify the weights you need
  subsets: ['latin'], // Ensure the font supports the required subset
  display: 'swap',
});

// Sanity query to fetch the 'about' document
const TRIVIA_QUERY = `*[_type == "trivia"][0]`;

const TriviaSection = () => {
  const [triviaData, setTriviaData] = useState<any>(null);

  useEffect(() => {
    const fetchTriviaData = async () => {
      const data = await client.fetch<SanityDocument>(TRIVIA_QUERY);
      setTriviaData(data);
    };

    fetchTriviaData();
  }, []);

  if (!triviaData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="justify-between mx-auto bg-[#f1f7ed] pb-10 md:pb-[80px] relative">
        <Image src={palmLeaf} alt="palm-leaf" className="absolute right-0 bottom-0 z-0"/>

      <div className="max-w-[1296px] px-5 block m-auto">

        <div className="flex gap-4 md:gap-[24px] w-full items-stretch mb-10 md:mb-[64px] flex-wrap z-10 relative">
          <div className="ps-0 pb-4 md:ps-6 w-full md:w-[calc(25%-18px)] border-b border-b-[#1d764a] border-s-0 md:border-b-0 md:border-s md:border-s-[#1D764A]">
              {/* <Image className="mb-6 w-7 h-7 md:w-10 md:h-10" src={happyCustomer} alt="happy customer" width={40} height={40}/> */}
              <p className={`${kronaOne.className} text-[#1A520F] text-xl md:text-3xl font-medium`}>{triviaData.triviaOneNumber}</p>    
              <p className={`${kronaOne.className} text-[#1A520F] text-base md:text-lg font-base mb-2`}>{triviaData.triviaOne}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaOneDescription}</p>    
          </div>
          <div className="ps-0 pb-4 md:ps-6 w-full md:w-[calc(25%-18px)] border-b border-b-[#1d764a] border-s-0 md:border-b-0 md:border-s md:border-s-[#1D764A]">
              {/* <Image className="mb-6" src={rateReview} alt="rating star" width={40} height={40}/> */}
              <p className={`${kronaOne.className} text-[#1A520F] text-xl md:text-3xl font-medium`}>{triviaData.triviaTwoNumber}</p>    
              <p className={`${kronaOne.className} text-[#1A520F] text-base md:text-lg font-base mb-2`}>{triviaData.triviaTwo}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaTwoDescription}</p>    
          </div>
          <div className="ps-0 pb-4 md:ps-6 w-full md:w-[calc(25%-18px)] border-b border-b-[#1d764a] border-s-0 md:border-b-0 md:border-s md:border-s-[#1D764A]">
              {/* <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/> */}
              <p className={`${kronaOne.className} text-[#1A520F] text-xl md:text-3xl font-medium`}>{triviaData.triviaThreeNumber}</p>    
              <p className={`${kronaOne.className} text-[#1A520F] text-base md:text-lg font-base mb-2`}>{triviaData.triviaThree}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaThreeDescription}</p>    
          </div>
          <div className="ps-0 pb-4 md:ps-6 w-full md:w-[calc(25%-18px)] border-b border-b-[#1d764a] border-s-0 md:border-b-0 md:border-s md:border-s-[#1D764A]">
              {/* <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/> */}
              <p className={`${kronaOne.className} text-[#1A520F] text-xl md:text-3xl font-medium`}>{triviaData.triviaFourNumber}</p>    
              <p className={`${kronaOne.className} text-[#1A520F] text-base md:text-lg font-base mb-2`}>{triviaData.triviaFour}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaFourDescription}</p>    
          </div>
        </div>

        <div className="w-full z-10 relative">
          <p className="text-xl md:text-2xl text-black mb-4 font-medium">Direkomendasikan oleh</p>

          <div className="flex gap-2 md:gap-4 w-full flex-wrap">
              <div className="w-full p-6 bg-[#fff] md:w-[calc(33%-16px)] min-w-[280px] relative">
                  <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>
                  <p className="text-[#1A520F] text-lg font-semibold">{triviaData.reccomByOne}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomOneURL}>{triviaData.reccomOne}</a>
              </div>

              <div className="w-full p-6 bg-[#fff] md:w-[calc(33%-16px)] min-w-[280px] relative">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text-[#1A520F] text-lg font-semibold">{triviaData.reccomByTwo}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomTwoURL}>{triviaData.reccomTwo}</a>
              </div>

              <div className="w-full p-6 bg-[#fff] md:w-[calc(33%-16px)] min-w-[280px] relative">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text-[#1A520F] text-lg font-semibold">{triviaData.reccomByThree}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomThreeURL}>{triviaData.reccomThree}</a>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriviaSection;
