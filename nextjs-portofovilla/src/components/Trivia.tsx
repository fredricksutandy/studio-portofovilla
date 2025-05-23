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
    <section className="justify-between mx-auto bg-white relative flex p-0 md:p-4">
      <div className="w-full block m-auto max-w-[1840px] bg-trivia md:rounded-t-[120px] rounded bg-no-repeat bg-cover p-6 pb-10 md:py-0">
      <h1 className="leading-relaxed md:text-center text-white font-bold text-4xl sm:text-5xl md:text-6xl font-libre max-w-full lg:max-w-[560px] mx-auto pt-10 md:pt-[160px] mb-14 md:mb-[120px] ">{triviaData.title}</h1>
      
      <div className="flex flex-col sm:flex-row w-full gap-14 md:gap-0 max-w-[800px] justify-between mx-auto pb-[160px]">
  {/* Left Column (0-1) */}
  <div className="flex flex-col gap-14 md:gap-[120px] w-fit">
    {triviaData.triviaSection.slice(0, 2).map((trivia, index) => (
      <div key={index} className="w-full flex flex-col rounded min-w-[260px] sm:max-w-[320px]">
        <Image className="w-4 h-4 p-2 border mb-4 border-white rounded-full box-content" src={urlFor(trivia.triviaImage)} alt={trivia.title} width={36} height={36} />

        <p className="font-libre text-white text-3xl md:text-5xl text-start font-bold mb-2">{trivia.number}</p>
        <p className="text-white text-lg md:text-2xl text-start font-medium mb-1">{trivia.title}</p>
        <p className="text-neutral-300 text-base text-start">{trivia.description}</p>
      </div>
    ))}
  </div>

  {/* Right Column (2-3) */}
  <div className="flex flex-col gap-14 md:gap-[120px] md:pt-[136px] w-fit">
    {triviaData.triviaSection.slice(2, 4).map((trivia, index) => (
      <div key={index + 2} className="w-full flex flex-col rounded min-w-[260px] sm:max-w-[320px]">
        <Image className="w-4 h-4 p-2 border mb-4 border-white rounded-full box-content" src={urlFor(trivia.triviaImage)} alt={trivia.title} width={36} height={36} />

        <p className="font-libre text-white text-3xl md:text-5xl text-start font-bold mb-2">{trivia.number}</p>
        <p className="text-white text-lg md:text-2xl text-start font-medium mb-1">{trivia.title}</p>
        <p className="text-neutral-300 text-base text-start">{trivia.description}</p>
      </div>
    ))}
  </div>
</div>


        <div className="w-full z-10 relative p-0 md:p-12">
          <p className="text-base font-libre text-neutral-200 md:text-white font-medium mb-8 md:text-center">Direkomendasikan oleh</p>
          <div className="flex w-full flex-wrap gap-8 md:gap-16">
            {triviaData.recommendationSection.map((rec, index) => (
              <div key={index} className="w-full flex-1 min-w-[280px] relative md:text-center">
                {/* <ArrowUpRight width={20} height={20} className="absolute right-4 top-4 text-white" /> */}
                <p className="text-white text-lg md:text-2xl font-medium">{rec.recommendedBy}</p>
                <a className="text-neutral-200 md:text-white underline md:font-medium hover:text-blue-300 transition-all cursor-pointer text-sm" href={rec.url}>{rec.recommendation}</a>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default TriviaSection;
