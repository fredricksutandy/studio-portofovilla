'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import type { SanityDocument } from "next-sanity";

interface CTAType {
  title: string;
  subtitle: string;
  buttonName: string;
  image: any;
}


const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

const CTA_QUERY = `*[_type == "CTA"][0]{
  title,
  subtitle,
  buttonName,
  image
}`;

const CONTACT_QUERY = `*[_type == "multipleContact"][0]{ phoneInfo }`;

const CTASection = () => {
  const [ctaData, setCtaData] = useState<CTAType | null>(null);
  const [contact, setContact] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [cta, contactData] = await Promise.all([
        client.fetch<CTAType>(CTA_QUERY),
        client.fetch<SanityDocument>(CONTACT_QUERY)
      ]);
      setCtaData(cta);
      setContact(contactData?.phoneInfo?.[0]?.phoneUrl ?? "");
    };

    fetchData();
  }, []);

  if (!ctaData || !contact) return <div>Loading...</div>;

  const imageUrl = ctaData.image ? urlFor(ctaData.image).url() : null;

  return (
    <section className="bg-white px-4 py-20 md:py-[120px] overflow-hidden">
      <div className="max-w-[1296px] mx-auto flex flex-wrap items-center justify-between gap-8">
        <div className="flex flex-1 flex-col gap-2 md:gap-6 min-w-[280px] md:max-w-[50%]">
          <h2 className="text-3xl md:text-5xl text-center md:text-left text-primary font-libre font-bold w-full md:max-w-[520px]">
            {ctaData.title}
          </h2>

          <p className="text-base w-full md:max-w-[340px] text-neutral-600 font-montserrat text-center md:text-left">
            {ctaData.subtitle}
          </p>

          <a
            href={contact}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold transition-all bg-primary text-white hover:translate-y-[-4px] hover:opacity-80 rounded-md px-8 py-4 text-base text-center md:w-fit mt-8 mb-6 md:mb-0"
          >
            {ctaData.buttonName}
          </a>
        </div>
        
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="CTA Image"
            width={1200}
            height={1200}
            className="flex flex-1 md:max-w-[50%]"
          />
        )}
      </div>
    </section>
  );
};

export default CTASection;
