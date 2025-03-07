'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import serviceIco from "../public/service-ico.svg";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import ButtonWa from './common/ButtonWa';
import WaLogo from '../public/logos_whatsapp-icon.svg'

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
    serviceContact,
    serviceImage
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

        {/* First Service */}
        <div className="w-full px-0 mt-8">
          {/* <div>
              <h3 className="tracking-[2px] text-lg lg:text-2xl font-semibold mb-4">
                {serviceData.services[0].serviceTitle}
              </h3>
              <p className="font-krona text-xl lg:text-3xl">{serviceData.services[0].serviceTagline}</p>
            </div> */}
          <Image
            src={urlFor(serviceData.services[0].serviceImage)}
            alt={serviceData.services[0].serviceTitle}
            width={1320}
            height={640}
            className="w-full h-[540px] object-cover"
          />

          <div className="flex justify-between gap-4 mt-4">
              <h3 className="tracking-[2px] text-2xl lg:text-5xl font-krona font-semibold mb-4">
                {serviceData.services[0].serviceTitle}
              </h3>
            <div className="flex flex-col gap-4 items-end">
            <p className="text-end ms-auto text-base max-w-[560px]">{serviceData.services[0].serviceDescription}</p>
            
            </div>
          </div>
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
