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
      <div className="w-full block m-auto px-5 pt-0 md:pb-[64px] max-w-[1296px] -translate-y-10">
        <div className="flex gap-3 w-full items-stretch flex-col md:flex-row mx-auto flex-wrap mb-10 md:mb-16">
          {triviaData.triviaSection.map((trivia, index) => (
            <div key={index} className="w-full flex flex-col p-4 md:p-6 bg-white rounded-md items-stretch flex-1 min-w-[270px]">
              <div className="p-2 bg-green-800 w-fit h-fit rounded mb-4 md:mb-8">
                <Image className="w-4 h-4 md:w-5 md:h-5" src={urlFor(trivia.triviaImage)} alt={trivia.title} width={40} height={40} />
              </div>
              <p className={`font-krona text-black text-2xl md:text-4xl text-start font-medium`}>{trivia.number}</p>
              <p className={`text-black text-base md:text-lg text-start font-medium`}>{trivia.title}</p>
              <p className={`text-neutral-500 text-sm text-start`}>{trivia.description}</p>
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
