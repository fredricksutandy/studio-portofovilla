'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import asterisk from '../public/asterisk-ico.svg'
import palmLeaf from '../public/palm-leaf-shadow.png'
import arrowLink from '../public/visit-arrow.svg'

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
    <section className="justify-between mx-auto bg-white px-5 py-10 md:py-[80px] relative">
        <Image src={palmLeaf} alt="palm-leaf" className="absolute right-0 bottom-0 z-0"/>

      <div className="max-w-[1296px] block m-auto">
        <div className="mb-6 md:mb-[80px]">
          <Image src={asterisk} alt="Asterisk icon" width={60} height={60} className="mb-6"/>
          <h2 className="text-3xl md:text-4xl w-full lg:text-5xl text-black font-medium">{triviaData.subtitle}</h2>
        </div>

        <div className="flex gap-4 md:gap-[40px] w-full items-center mb-[80px] md:mb-[80px] flex-wrap z-10 relative">
          <div className="py-2 md:py-2 w-full md:w-[calc(50%-20px)] border-b border-b-secondary">
              {/* <Image className="mb-6 w-7 h-7 md:w-10 md:h-10" src={happyCustomer} alt="happy customer" width={40} height={40}/> */}
              <p className={`text-primary text-xl md:text-4xl font-medium`}>{triviaData.triviaOneNumber}</p>    
              <p className={`text-primary text-base md:text-xl font-base mb-2`}>{triviaData.triviaOne}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaOneDescription}</p>    
          </div>
          <div className="py-2 md:py-2 w-full md:w-[calc(50%-32px)] border-b border-b-secondary">
              {/* <Image className="mb-6" src={rateReview} alt="rating star" width={40} height={40}/> */}
              <p className={`text-primary text-xl md:text-4xl font-medium`}>{triviaData.triviaTwoNumber}</p>    
              <p className={`text-primary text-base md:text-xl font-base mb-2`}>{triviaData.triviaTwo}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaTwoDescription}</p>    
          </div>
          <div className="py-2 md:py-2 w-full md:w-[calc(50%-32px)] border-b border-b-secondary">
              {/* <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/> */}
              <p className={`text-primary text-xl md:text-4xl font-medium`}>{triviaData.triviaThreeNumber}</p>    
              <p className={`text-primary text-base md:text-xl font-base mb-2`}>{triviaData.triviaThree}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaThreeDescription}</p>    
          </div>
          <div className="py-2 md:py-2 w-full md:w-[calc(50%-32px)] border-b border-b-secondary">
              {/* <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/> */}
              <p className={`text-primary text-xl md:text-4xl font-medium`}>{triviaData.triviaFourNumber}</p>    
              <p className={`text-primary text-base md:text-xl font-base mb-2`}>{triviaData.triviaFour}</p>    
              <p className={`text-black text-base font-base`}>{triviaData.triviaFourDescription}</p>    
          </div>
        </div>

        <div className="w-full z-10 relative">
          <p className="text-xl md:text-2xl text-black mb-4 font-medium">Direkomendasikan oleh</p>

          <div className="flex gap-4 md:gap-4 w-full flex-wrap">
              <div className="w-full p-6 bg-lightbg md:w-[calc(33%-16px)] min-w-[280px] relative">
                  <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>
                  <p className="text-primary text-xl md:text-xl font-medium">{triviaData.reccomByOne}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomOneURL}>{triviaData.reccomOne}</a>
              </div>

              <div className="w-full p-6 bg-lightbg md:w-[calc(33%-16px)] min-w-[280px] relative">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text-primary text-xl md:text-xl font-medium">{triviaData.reccomByTwo}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomTwoURL}>{triviaData.reccomTwo}</a>
              </div>

              <div className="w-full p-6 bg-lightbg md:w-[calc(33%-16px)] min-w-[280px] relative">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text-primary text-xl md:text-xl font-medium">{triviaData.reccomByThree}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomThreeURL}>{triviaData.reccomThree}</a>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriviaSection;
