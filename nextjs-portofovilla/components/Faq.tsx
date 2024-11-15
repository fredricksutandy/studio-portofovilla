'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import AccordionRow from "./common/Accordion";

// Sanity query to fetch the 'about' document
const FAQ_QUERY = `*[_type == "faq"][0]`;

const FaqSection = () => {
  const [faqData, setFaqData] = useState<any>(null);

  useEffect(() => {
    const fetchFaqData = async () => {
      const data = await client.fetch<SanityDocument>(FAQ_QUERY);
      setFaqData(data);
      console.log(data)
    };

    fetchFaqData();
  }, []);

  if (!faqData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="flex justify-between max-w-[1440px] mx-auto bg-[#Fff] px-4 py-24">
      <div className="flex flex-col gap-8 w-full h-auto">
        <div className="text-lg font-semibold  px-6 py-4 bg-[#D6F6E3] text-[#047C36] w-fit rounded">?</div>
        <div className="flex flex-wrap justify-between w-full gap-4">
            <h2 className="text-3xl lg:text-5xl text-black max-w-[470px] font-medium">{faqData.subtitleone}</h2>
            <div className="max-w-full lg:max-w-full xl:max-w-[640px]">
            <AccordionRow question={faqData.faqs[0].question} answer={faqData.faqs[0].answer}/>
            <AccordionRow question={faqData.faqs[1].question} answer={faqData.faqs[1].answer}/>
            <AccordionRow question={faqData.faqs[0].question} answer={faqData.faqs[0].answer}/>
            <AccordionRow question={faqData.faqs[1].question} answer={faqData.faqs[1].answer}/>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
