'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import serviceIco from "../../public/service-ico.svg";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import ButtonWa from '../../components/common/ButtonWa';
import WaLogo from '../../public/logos_whatsapp-icon.svg'
import Link from "next/link";
import { ArrowRight } from '@carbon/icons-react';

 

// Initialize image builder for fetching image URLs
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

// Query to fetch service data from Sanity
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

  const [serviceData, setServiceData] = useState(null);
  
    useEffect(() => {
      const fetchFacilityData = async () => {
        const data = await client.fetch<SanityDocument>(SERVICE_QUERY);
        setServiceData(data);
      };
  
      fetchFacilityData();
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
      <section className="max-w-[1296px] mx-auto bg-white px-4 md:px-6 py-10 md:py-[120px] relative gap-8" id="services">

        <div className="flex flex-row items-end gap-2 mb-6">
          <Image src={serviceIco} alt="Asterisk icon" width={44} height={44} className=""/>
          <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{serviceData.title}</h2>
        </div>          
        <h3 className="font-montserrat text-2xl md:text-4xl font-bold text-black mb-10 max-w-[990px]">{serviceData.subtitle}</h3>


        <div className="flex flex-wrap gap-8">
          {serviceData.services.map((service, index) => (
            <div key={index} className="w-full px-0 md:w-[calc(50%-20px)]">
              <Image
                src={urlFor(service.serviceImage)}
                alt={service.serviceTitle}
                width={1320}
                height={640}
                className="w-full h-[260px] sm:h-[320px] object-cover mb-4 rounded"
              />

              <div className="flex flex-col md:flex-row gap-2 md:gap-4 flex-wrap items-start md:items-center">
                <h3 className="tracking-[2px] text-xl max-w-md lg:text-2xl font-krona font-semibold mb-0 md:mb-2">
                  {service.serviceTitle}
                </h3>
                <p className={`px-3 py-2 rounded-lg w-fit text-sm font-medium h-fit mb-4 md:mb-2
                  ${service.servicePrice && service.servicePrice.trim() !== "" 
                    ? "bg-gray-200 text-gray-800" 
                    : "bg-green-200 text-green-800"}
                `}>
                            {service.servicePrice && service.servicePrice.trim() !== "" 
                  ? "+ " + service.servicePrice 
                  : "Gratis!"}
                </p>
              </div>
              <p className="text-base mb-4">{service.serviceDescription}</p>

              {service.serviceLink && service.serviceLink.trim() !== "" && (
                <Link
                  href={service.serviceLink}
                  passHref
                  className="flex items-center justify-center transition-all duration-500 ease-in-out hover:translate-x-2 gap-2 w-full md:w-fit mb-4 rounded border border-primary md:border-0 p-3 md:p-0 underline group"
                >
                  <p className="block m-0 text-base font-medium">View Details</p>
                  <div className="w-fit overflow-hidden">
                  <ArrowRight width={16} height={16} className="mt-[2px] transition-all duration-500 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0"/>
                  
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
        <ButtonWa 
              link={serviceData.serviceContact}
              text="Tanya lebih lanjut"
              type="green" // or "white"
              iconType={WaLogo.src}
              radius={"lg"} 
              width={"full"} 
              displayMobile={true} 
              displayDesktop={true}
            />
        </div>
      </section>
  );
};


export default ServicesSection;
