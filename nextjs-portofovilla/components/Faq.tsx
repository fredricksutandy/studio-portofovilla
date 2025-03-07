'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import AccordionRow from "./common/Accordion";
import { Help } from "@carbon/icons-react";

// Sanity query to fetch the 'faq' document
const FAQ_QUERY = `*[_type == "faq"][0]`;

const FaqSection = () => {
  const [faqData, setFaqData] = useState<SanityDocument | null>(null);

  useEffect(() => {
    const fetchFaqData = async () => {
      const data = await client.fetch<SanityDocument>(FAQ_QUERY);
      setFaqData(data);
      console.log(data);
    };

    fetchFaqData();
  }, []);

  if (!faqData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="flex justify-between max-w-[1296px] mx-auto bg-white px-4 md:px-6 py-20 md:py-[200px]" id="faq">
      <div className="flex flex-col w-full h-auto">
        <Help size={36} className="text-primary" />
        <div className="flex flex-wrap justify-between w-full gap-10">
          <h2 className="font-krona text-2xl lg:text-3xl text-primary w-full md:w-[calc(50%-20px)] font-semibold mt-4">
            {faqData.title}
          </h2>
          <div className="w-full md:w-[calc(50%-20px)]">
            {faqData.faqs && faqData.faqs.length > 0 ? (
              faqData.faqs.map((faq: { question: string; answer: string }, index: number) => (
                <AccordionRow key={index} question={faq.question} answer={faq.answer} />
              ))
            ) : (
              <p>Tidak ada pertanyaan yang tersedia saat ini.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
