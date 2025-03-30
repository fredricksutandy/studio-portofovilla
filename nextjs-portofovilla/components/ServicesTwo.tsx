'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import serviceIco from "../public/service-ico.svg";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import ButtonWa from './common/ButtonWa';
import WaLogo from '../public/logos_whatsapp-icon.svg'
import Link from "next/link";
import { ArrowRight } from "@carbon/icons-react";
 

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
    serviceLink,
    servicePrice,
  }
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
    <main className="bg-white font-montserrat" id="services">
      <section className="max-w-[1296px] mx-auto bg-white px-4 md:px-6 py-10 md:py-[120px] relative gap-8">
      <div className="flex flex-row items-end gap-2 mb-6">
          <Image src={serviceIco} alt="Asterisk icon" width={44} height={44} className=""/>
          <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{serviceData.title}</h2>
        </div>          
        <h3 className="font-montserrat text-2xl md:text-4xl font-bold text-black mb-10 max-w-[990px]">{serviceData.subtitle}</h3>
        
        <div className="flex flex-col relative">
        {serviceData.services.map((service, index) => (
          <div
            key={index}
            className={`w-full px-0 bg-white sticky top-0 z-[${index}] ${
              index === serviceData.services.length - 1 ? "pb-4" : "pb-[184px]"
            }`}
          >
            

            <div className="relative">
              <Image
                src={urlFor(service.serviceImage)}
                alt={service.serviceTitle}
                width={1320}
                height={620}
                className="w-full h-[400px] md:h-[540px] object-cover rounded"
              />
              <p className={`px-3 py-2 rounded text-lg font-semibold w-fit absolute bottom-4 left-4
                  ${service.servicePrice && service.servicePrice.trim() !== "" 
                    ? "bg-gray-200 text-gray-800" 
                    : "bg-green-200 text-green-800"}
                `}>
                             {service.servicePrice && service.servicePrice.trim() !== "" 
                  ? "+ " + service.servicePrice 
                  : "Gratis!"}
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-2 mt-4 md:mt-6">
              <div>
                <h3 className="tracking-[2px] text-2xl lg:text-5xl font-krona font-semibold">
                  {service.serviceTitle}
                </h3>
              </div>
              <div className="flex items-end flex-col gap-2">
              <p className="text-start md:text-end ms-0 me-auto md:ms-auto text-base max-w-[560px]">{service.serviceDescription}</p>
              {service.serviceLink && service.serviceLink.trim() !== "" && (
                <Link
                  href={service.serviceLink}
                  passHref
                  className="flex items-center justify-center transition-all duration-700 ease-in-out hover:-translate-x-2 gap-2 w-full md:w-fit mt-2 rounded border border-primary md:border-0 p-3 md:p-0 underline group"
                >
                  <p className="block m-0 text-base font-medium">View Details</p>
                  <div className="w-0 group-hover:w-4 overflow-hidden transition-all duration-700">
                  <ArrowRight width={16} height={16} className="mt-[2px] transition-all duration-700 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0"/>
                  
                  </div>
                </Link>
              )}
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="mt-10">
        <ButtonWa 
              link={serviceData.serviceContact}
              text="Booking restaurant"
              type="green" // or "white"
              iconType={WaLogo.src}
              radius={"lg"} 
              width={"full"} 
              displayMobile={true} 
              displayDesktop={true}
            />
        </div>
      </section>
    </main>
  );
};

// export async function getStaticProps() {
//   try {
//     const serviceData = await client.fetch(SERVICE_QUERY);
//     console.log("Service Data:", serviceData); // This should log the fetched data
//     return {
//       props: {
//         serviceData: serviceData || null, // Pass `null` if no data
//       },
//       revalidate: 10, // Enable ISR
//     };
//   } catch (error) {
//     console.error("Error fetching service data:", error);
//     return {
//       props: {
//         serviceData: null, // Return `null` if fetching fails
//       },
//       revalidate: 10, // Enable ISR
//     };
//   }
// }


export default ServicesSection;
