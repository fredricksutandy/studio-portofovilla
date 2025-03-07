'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from '@sanity/image-url';
import { ArrowUpRight } from '@carbon/icons-react';




const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source) => builder.image(source).url();

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
    <section className="justify-between mx-auto bg-lightbg relative flex">
      <div className="w-full block m-auto px-5 pt-0 pb-[80px] max-w-[1296px]">

        {/* <div className="bg-trivia bg-cover bg-no-repeat bg-center rounded-3xl">
          <div className="flex gap-10 w-full items-center max-w-[768px] px-6 py-20 md:py-[120px] mb-10 md:mb-16 flex-wrap z-10 mx-auto">
            <div className="ps-4 w-full md:w-[calc(50%-20px)]">
                <Image className="mb-6 w-7 h-7 md:w-10 md:h-10" src={happyCustomer} alt="happy customer" width={40} height={40}/>
                <p className={`text-white text-4xl text-center font-medium`}>{triviaData.triviaOneNumber}</p>    
                <p className={`text-white text-base md:text-lg text-center font-base`}>{triviaData.triviaOne}</p>    
                <p className={`text- text-base text-center`}>{triviaData.triviaOneDescription}</p>    
            </div>
            <div className="ps-4 w-full md:w-[calc(50%-20px)]">
                <Image className="mb-6" src={rateReview} alt="rating star" width={40} height={40}/>
                <p className={`text-white text-4xl text-center font-medium`}>{triviaData.triviaTwoNumber}</p>    
                <p className={`text-white text-base md:text-lg text-center font-base`}>{triviaData.triviaTwo}</p>    
                <p className={`text- text-base text-center`}>{triviaData.triviaTwoDescription}</p>    
            </div>
            <div className="ps-4 w-full md:w-[calc(50%-20px)]">
                <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/>
                <p className={`text-white text-4xl text-center font-medium`}>{triviaData.triviaThreeNumber}</p>    
                <p className={`text-white text-base md:text-lg text-center font-base`}>{triviaData.triviaThree}</p>    
                <p className={`text- text-base text-center`}>{triviaData.triviaThreeDescription}</p>    
            </div>
            <div className="ps-4 w-full md:w-[calc(50%-20px)]">
                <Image className="mb-6" src={moon} alt="cloudy night" width={40} height={40}/>
                <p className={`text-white text-4xl text-center font-medium`}>{triviaData.triviaFourNumber}</p>    
                <p className={`text-white text-base md:text-lg text-center font-base`}>{triviaData.triviaFour}</p>    
                <p className={`text- text-base text-center`}>{triviaData.triviaFourDescription}</p>    
            </div>
          </div>
        </div> */}

          {/* <div className="flex gap-3 w-full items-stretch flex-col md:flex-row mx-auto flex-wrap mb-10 md:mb-20">
            <div className="w-full flex flex-col p-4 md:p-6 bg-white rounded-md items-stretch flex-1 min-w-[270px]">
              <div className="p-2 bg-green-800 w-fit h-fit rounded mb-4 md:mb-8">
              <Image className="w-4 h-4 md:w-5 md:h-5" src={happyCustomer} alt="happy customer" width={40} height={40}/>
              </div>
                <p className={`text-black text-2xl md:text-4xl text-start font-medium`}>{triviaData.triviaOneNumber}</p>    
                <p className={`text-black text-base md:text-lg text-start font-base`}>{triviaData.triviaOne}</p>    
                <p className={`text-neutral-500 text-sm md:text-base text-start`}>{triviaData.triviaOneDescription}</p>    
            </div>
            <div className="w-full flex flex-col p-4 md:p-6 bg-white rounded-md items-stretch flex-1 min-w-[270px]">
            <div className="p-2 bg-green-800 w-fit h-fit rounded mb-4 md:mb-8">
            <Image className="w-4 h-4 md:w-5 md:h-5" src={rateReview} alt="rating star" width={40} height={40}/>
            </div>
                <p className={`text-black text-2xl md:text-4xl text-start font-medium`}>{triviaData.triviaTwoNumber}</p>    
                <p className={`text-black text-base md:text-lg text-start font-base`}>{triviaData.triviaTwo}</p>    
                <p className={`text-neutral-500 text-sm md:text-base text-start`}>{triviaData.triviaTwoDescription}</p>    
            </div>
            <div className="w-full flex flex-col p-4 md:p-6 bg-white rounded-md items-stretch flex-1 min-w-[270px]">
            <div className="p-2 bg-green-800 w-fit h-fit rounded mb-4 md:mb-8">
            <Image className="w-4 h-4 md:w-5 md:h-5" src={moon} alt="cloudy night" width={40} height={40}/>
            </div>
                <p className={`text-black text-2xl md:text-4xl text-start font-medium`}>{triviaData.triviaThreeNumber}</p>    
                <p className={`text-black text-base md:text-lg text-start font-base`}>{triviaData.triviaThree}</p>    
                <p className={`text-neutral-500 text-sm md:text-base text-start`}>{triviaData.triviaThreeDescription}</p>    
            </div>
            <div className="w-full flex flex-col p-4 md:p-6 bg-white rounded-md items-stretch flex-1 min-w-[270px]">
            <div className="p-2 bg-green-800 w-fit h-fit rounded mb-4 md:mb-8">
            <Image className="w-4 h-4 md:w-5 md:h-5" src={calendar} alt="calendar" width={40} height={40}/>
            </div>
                <p className={`text-black text-2xl md:text-4xl text-start font-medium`}>{triviaData.triviaFourNumber}</p>    
                <p className={`text-black text-base md:text-lg text-start font-base`}>{triviaData.triviaFour}</p>    
                <p className={`text-neutral-500 text-sm md:text-base text-start`}>{triviaData.triviaFourDescription}</p>    
            </div>
          </div>

        <div className="w-full z-10 relative">
          <p className="text-xl text-black mb-4 font-semibold text-start">Direkomendasikan oleh</p>

          <div className="flex gap-3 w-full flex-wrap">
              <div className="w-full p-4 md:p-6 bg-white flex-1 min-w-[280px] relative rounded-md">
                  <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>
                  <p className="text- text-md md:text-lg font-medium">{triviaData.reccomByOne}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomOneURL}>{triviaData.reccomOne}</a>
              </div>

              <div className="w-full p-4 md:p-6 bg-white flex-1 min-w-[280px] relative rounded-md">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text- text-md md:text-lg font-medium">{triviaData.reccomByTwo}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomTwoURL}>{triviaData.reccomTwo}</a>
              </div>

              <div className="w-full p-4 md:p-6 bg-white flex-1 min-w-[280px] relative rounded-md">
              <Image src={arrowLink} alt="palm-leaf" className="absolute right-4 top-4"/>

                  <p className="text- text-md md:text-lg font-medium">{triviaData.reccomByThree}</p>
                  <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={triviaData.reccomThreeURL}>{triviaData.reccomThree}</a>
              </div>
          </div>
        </div> */}

        <div className="flex gap-6 md:gap-12 w-full items-stretch flex-col md:flex-row mx-auto flex-wrap mb-10 md:mb-16">
          {triviaData.triviaSection.map((trivia, index) => (
            <div key={index} className="w-full flex flex-col items-stretch flex-1 min-w-[200px] border-l-2 border-graymuted ps-4">
              <div className="flex gap-2 items-center mb-3">
                <div className="p-2 bg-green-800 w-fit h-fit rounded">
                  <Image className="w-4 h-4 md:w-5 md:h-5" src={urlFor(trivia.triviaImage)} alt={trivia.title} width={36} height={36} />
                </div>
              <p className={`font-krona text-black text-2xl md:text-3xl text-start font-medium`}>{trivia.number}</p>
              </div>
              <p className="text-black text-base md:text-lg text-start font-semibold mb-2" >{trivia.title}</p>
              <p className={`text-neutral-600 text-sm text-start`}>{trivia.description}</p>
            </div>
          ))}
        </div>

        <div className="w-full z-10 relative">
          <p className="text-xl text-black mb-4 font-semibold text-start">Direkomendasikan oleh</p>
          <div className="flex gap-3 w-full flex-wrap">
            {triviaData.recommendationSection.map((rec, index) => (
              <div key={index} className="w-full p-4 md:p-6 bg-white flex-1 min-w-[280px] relative rounded-md">
                <ArrowUpRight width={20} height={20} className="absolute right-4 top-4 text-secondary" />
                <p className="text-secondary text-md md:text-lg font-medium">{rec.recommendedBy}</p>
                <a className="text-black underline hover:text-blue-600 transition-all cursor-pointer text-base" href={rec.url}>{rec.recommendation}</a>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default TriviaSection;
