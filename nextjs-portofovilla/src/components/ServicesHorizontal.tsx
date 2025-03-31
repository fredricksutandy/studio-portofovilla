'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import serviceIco from "../../public/service-ico.svg";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import HorizontalScroll from "../../components/common/HorizontalScroll"; // Import new component

// Initialize image builder
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

// Sanity query
const SERVICE_QUERY = `*[_type == "service"][0]{
  title,
  subtitle,
  services[]{
    serviceTitle,
    serviceTagline,
    serviceDescription,
    serviceImage,
    servicePrice,
    serviceLink,
  },
  serviceContact
}`;

const ServicesSection = () => {
  const [serviceData, setServiceData] = useState<SanityDocument | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      const data = await client.fetch<SanityDocument>(SERVICE_QUERY);
      setServiceData(data);
    };
    fetchServiceData();
  }, []);

  if (!serviceData) {
    return (
      <div className="p-4">
        <div className="h-80 bg-neutral-200 rounded flex items-center justify-center">Loading...</div>
      </div>
    );
  }

  if (!serviceData.services || !serviceData.title) {
    return <div>Service data is incomplete.</div>;
  }

  return (
    <section className="mx-auto bg-white py-10 md:py-[120px] relative gap-8" id="services">
      <div className="px-4 md:px-6 absolute left-0">
      <div className="flex flex-row items-end gap-2 mb-6">
        <Image src={serviceIco} alt="Asterisk icon" width={44} height={44} />
        <h2 className="font-krona text-base md:text-lg text-primary font-medium">{serviceData.title}</h2>
      </div>          
      <h3 className="font-montserrat text-2xl md:text-4xl font-bold text-black mb-10 max-w-[990px]">
        {serviceData.subtitle}
      </h3>
      </div>

      <HorizontalScroll items={serviceData.services} />
    </section>
  );
};

export default ServicesSection;
