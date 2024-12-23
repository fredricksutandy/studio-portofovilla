'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import asterisk from '../public/asterisk-ico.svg'
import placeholder from '../public/contact-placeholder2.jpg'
import arrowLink from '../public/visit-arrow.svg'
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
    <section className="justify-between mx-auto bg-[#f1fcf3] relative flex">
        <Image src={placeholder} alt="palm-leaf" className="w-5/12 lg:w-6/12 object-cover"/>

      <div className="w-7/12 lg:w-6/12 block m-auto px-[80px] py-[80px]">
        <div className="mb-6 md:mb-10">
          <Image src={asterisk} alt="Asterisk icon" width={60} height={60} className="mb-6"/>
          <h2 className="text-xl md:text-4xl w-full text-black font-medium mb-4">{triviaData.subtitle}</h2>
          <p className="text-base w-full text-black max-w-[720px]">{triviaData.description}</p>
        </div>

        <div className="flex gap-4 md:gap-[40px] w-full items-center mb-[80px] md:mb-10 flex-wrap z-10 relative">
          <div className="ps-4 w-full md:w-[calc(50%-20px)] border-s border-s-[#1D764A]">
              {/* <Image className="mb-6 w-7 h-7 md:w-10 md:h-10" src={happyCustomer} alt="happy customer" width={40} height={40}/> */}
              <p className={`${kronaOne.className} text-[#1A520F] text-xl md:text-3xl font-medium`}>{triviaData.triviaOneNumber}</p>    
              <p className={`${kronaOne.className} text-[#1A520F] text-base md:text-lg font-base mb-2`}>{triviaData.triviaOne}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaOneDescription}</p>    
          </div>
          <div className="ps-4 w-full md:w-[calc(50%-20px)] border-s border-s-[#1D764A]">
              {/* <Image className="mb-6" src={rateReview} alt="rating star" width={40} height={40}/> */}
              <p className={`${kronaOne.className} text-[#1A520F] text-xl md:text-3xl font-medium`}>{triviaData.triviaTwoNumber}</p>    
              <p className={`${kronaOne.className} text-[#1A520F] text-base md:text-lg font-base mb-2`}>{triviaData.triviaTwo}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaTwoDescription}</p>    
          </div>
          <div className="ps-4 w-full md:w-[calc(50%-20px)] border-s border-s-[#1D764A]">
              {/* <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/> */}
              <p className={`${kronaOne.className} text-[#1A520F] text-xl md:text-3xl font-medium`}>{triviaData.triviaThreeNumber}</p>    
              <p className={`${kronaOne.className} text-[#1A520F] text-base md:text-lg font-base mb-2`}>{triviaData.triviaThree}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaThreeDescription}</p>    
          </div>
          <div className="ps-4 w-full md:w-[calc(50%-20px)] border-s border-s-[#1D764A]">
              {/* <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/> */}
              <p className={`${kronaOne.className} text-[#1A520F] text-xl md:text-3xl font-medium`}>{triviaData.triviaFourNumber}</p>    
              <p className={`${kronaOne.className} text-[#1A520F] text-base md:text-lg font-base mb-2`}>{triviaData.triviaFour}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaFourDescription}</p>    
          </div>
        </div>

        <div className="w-full z-10 relative">
          <p className="text-xl md:text-2xl text-black mb-4 font-medium">Direkomendasikan oleh</p>

          <div className="flex gap-4 md:gap-4 w-full flex-wrap">
              <div className="w-full p-6 bg-[#fff] flex-1 min-w-[280px] relative">
                  <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>
                  <p className="text-[#1A520F] text-md md:text-lg font-medium">{triviaData.reccomByOne}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomOneURL}>{triviaData.reccomOne}</a>
              </div>

              <div className="w-full p-6 bg-[#fff] flex-1 min-w-[280px] relative">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text-[#1A520F] text-md md:text-lg font-medium">{triviaData.reccomByTwo}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomTwoURL}>{triviaData.reccomTwo}</a>
              </div>

              <div className="w-full p-6 bg-[#fff] flex-1 min-w-[280px] relative">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text-[#1A520F] text-md md:text-lg font-medium">{triviaData.reccomByThree}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomThreeURL}>{triviaData.reccomThree}</a>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriviaSection;
