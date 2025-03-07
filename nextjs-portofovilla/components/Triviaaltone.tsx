'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import triviaIMG from '../public/trivia-image.png'
import palmLeaf from '../public/palm-leaf-shadow.png'
import arrowLink from '../public/visit-arrow.svg'
import { Krona_One } from 'next/font/google'; 

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
    <section className="justify-between mx-auto bg-lightbg pb-10 md:pb-[144px] relative">
        <Image src={palmLeaf} alt="palm-leaf" className="absolute right-0 bottom-0 z-0"/>

      <div className="max-w-[1296px] px-5 block m-auto">

        <div className="flex gap-6 items-end mb-12 md:mb-16 flex-col md:flex-row">
          <div className="flex gap-0 md:gap-4 w-full h-fit items-start md:items-end flex-wrap z-10 relative">
            <div className="py-4 border-b border-b-graymuted md:border-0 md:py-6 w-full md:w-[calc(50%-18px)] items-start justify-start">
                {/* <Image className="mb-6 w-7 h-7 md:w-10 md:h-10" src={happyCustomer} alt="happy customer" width={40} height={40}/> */}
                <p className={`text-secondary text-4xl md:text-3xl mb-1 font-semibold`}>{triviaData.triviaOneNumber}</p>    
                <p className={`text-gray-500 text-base md:text-lg font-base mb-1`}>{triviaData.triviaOne}</p>    
                <p className={`text-black text-sm sm:text-base font-base`}>{triviaData.triviaOneDescription}</p>    
            </div>
            <div className="py-4 border-b border-b-graymuted md:border-0  md:py-6 w-full md:w-[calc(50%-18px)] items-start justify-start">
                {/* <Image className="mb-6" src={rateReview} alt="rating star" width={40} height={40}/> */}
                <p className={`text-secondary text-4xl md:text-3xl mb-1 font-semibold`}>{triviaData.triviaTwoNumber}</p>    
                <p className={`text-gray-500 text-base md:text-lg font-base mb-1`}>{triviaData.triviaTwo}</p>    
                <p className={`text-black text-sm sm:text-base font-base`}>{triviaData.triviaTwoDescription}</p>    
            </div>
            <div className="py-4 border-b border-b-graymuted md:border-0  md:py-6 w-full md:w-[calc(50%-18px)] items-start justify-start">
                {/* <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/> */}
                <p className={`text-secondary text-4xl md:text-3xl mb-1 font-semibold`}>{triviaData.triviaThreeNumber}</p>    
                <p className={`text-gray-500 text-base md:text-lg font-base mb-1`}>{triviaData.triviaThree}</p>    
                <p className={`text-black text-sm sm:text-base font-base`}>{triviaData.triviaThreeDescription}</p>    
            </div>
            <div className="py-4 border-b border-b-graymuted md:border-0  md:py-6 w-full md:w-[calc(50%-18px)] items-start justify-start">
                {/* <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/> */}
                <p className={`text-secondary text-4xl md:text-3xl mb-1 font-semibold`}>{triviaData.triviaFourNumber}</p>    
                <p className={`text-gray-500 text-base md:text-lg font-base mb-1`}>{triviaData.triviaFour}</p>    
                <p className={`text-black text-sm sm:text-base font-base`}>{triviaData.triviaFourDescription}</p>    
            </div>
          </div>  
          <Image src={triviaIMG} alt="Trivia-side-img" className="hidden md:flex max-w-[500px] w-full"/>

        </div>

        <div className="w-full z-10 relative">
          <p className="text-xl text-black mb-4 font-semibold">Direkomendasikan oleh</p>

          <div className="flex gap-2 md:gap-4 w-full flex-wrap">
              <div className="w-full p-6 bg-white md:w-[calc(33%-16px)] min-w-[280px] relative">
                  <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>
                  <p className="text-primary text-lg font-semibold">{triviaData.reccomByOne}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomOneURL}>{triviaData.reccomOne}</a>
              </div>

              <div className="w-full p-6 bg-white md:w-[calc(33%-16px)] min-w-[280px] relative">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text-primary text-lg font-semibold">{triviaData.reccomByTwo}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomTwoURL}>{triviaData.reccomTwo}</a>
              </div>

              <div className="w-full p-6 bg-white md:w-[calc(33%-16px)] min-w-[280px] relative">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text-primary text-lg font-semibold">{triviaData.reccomByThree}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomThreeURL}>{triviaData.reccomThree}</a>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriviaSection;
