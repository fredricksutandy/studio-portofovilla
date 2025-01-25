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
  services[]{
    serviceTitle,
    serviceTagline,
    serviceDescription,
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
    <main className="bg-[#fff] font-montserrat" id="services">
      <section className="max-w-[1296px] mx-auto bg-[#Fff] px-4 py-24 relative gap-8">
        <Image src={serviceIco} alt="Asterisk icon" width={100} height={64} className="mb-8 flex" />

        {/* Title of the section */}
        <h2 className="text-2xl lg:text-3xl text-start text-black font-semibold max-w-[380px] mb-8">
          {serviceData.title}
        </h2>
        <div className="flex flex-col gap-8 lg:gap-[80px]">
          {serviceData.services.map((service, index) => (
          <div key={index} className="w-full px-0">
            <Image
              src={urlFor(service.serviceImage)}
              alt={service.serviceTitle}
              width={1320}
              height={640}
              className="w-full h-[540px] object-cover"
            />

            <div className="flex justify-end gap-4 mt-4">
              <div>
                <h3 className="tracking-[2px] text-2xl lg:text-5xl font-krona font-semibold mb-4">
                  {service.serviceTitle}
                </h3>
                {/* <p className="font-krona text-xl lg:text-3xl">{service.serviceTagline}</p> */}
              </div>
              <p className="text-end ms-auto text-base max-w-[560px]">{service.serviceDescription}</p>
            </div>
          </div>
          ))}
        </div>
        {/* <div className="w-full px-0 mt-10 lg:mt-[64px]">
          <Image
            src={urlFor(serviceData.services[1].serviceImage)}
            alt={serviceData.services[1].serviceTitle}
            width={1320}
            height={640}
            className="w-full h-[540px] object-cover"
          />

          <div className="flex justify-end gap-4 mt-4">
            <div>
              <h3 className="tracking-[2px] text-2xl lg:text-5xl font-krona font-semibold mb-4">
                {serviceData.services[1].serviceTitle}
              </h3>
            </div>
            <p className="text-end ms-auto text-base max-w-[560px]">{serviceData.services[1].serviceDescription}</p>
          </div>
        </div> */}
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
