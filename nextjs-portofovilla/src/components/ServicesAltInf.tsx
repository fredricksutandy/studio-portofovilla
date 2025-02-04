'use client'
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import serviceIco from "../../public/service-ico.svg";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import ButtonWa from '../../components/common/ButtonWa';
import WaLogo from '../../public/logos_whatsapp-icon.svg'

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
  },
  serviceContact
}`;

const ServiceSection = () => {
  const [serviceData, setServiceData] = useState<any>(null);

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

  const services = serviceData.services;

  return (
    <main className="bg-[#fff] font-montserrat" id="services">
      <section className="max-w-[1296px] mx-auto bg-[#Fff] px-4 py-24 relative gap-8">
        <Image src={serviceIco} alt="Asterisk icon" width={100} height={64} className="mb-8 flex" />
        <h2 className="font-krona text-2xl lg:text-4xl text-[#1A520F] font-semibold mb-4">
          {serviceData.title}
        </h2>
        <h3 className="text-lg text-gray-600 font-medium mb-0 max-w-[460px]">{serviceData.subtitle}</h3>
        <div className="flex flex-wrap gap-4 lg:gap-8">
        {/* Render services */}
        {services.map((service, idx) => {
          // Check the index for dynamic width
          const widthClass = (idx % 3 === 0 || idx === services.length - 1) ? 'w-full' : 'lg:w-[calc(50%-16px)]';

          return (
            <div key={idx} className={`flex flex-col ${widthClass} mt-6`}>
              <Image
                src={urlFor(service.serviceImage)}  // Correctly accessing the image
                alt={service.serviceTitle}
                width={1320}
                height={640}
                className="w-full h-[240px] lg:h-[460px] object-cover"
              />
              <div className="mt-4">
                <h3 className="tracking-wider text-lg lg:text-2xl font-semibold text-neutral-400 mb-2">
                  {service.serviceTitle}
                </h3>
                <p className="font-krona text-xl lg:text-3xl mb-3">{service.serviceTagline}</p>
                <p className="text-start text-base max-w-[580px]">{service.serviceDescription}</p>
              </div>
            </div>
          );
        })}
        </div>
        <div className="mt-10">
          <ButtonWa 
            link={serviceData.serviceContact}
            text="Booking servis kami"
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

export default ServiceSection;
