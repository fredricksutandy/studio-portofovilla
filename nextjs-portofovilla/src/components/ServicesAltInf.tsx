'use client'
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
    serviceLink,
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
    <section className="max-w-[1296px] mx-auto bg-white px-4 md:px-6 py-10 md:py-[120px] relative gap-8" id="services">
      
      {/* <div className=" pb-[80px]"> */}
        {/* <div className="flex flex-row  items-end gap-2 mb-6">
          <Image src={serviceIco} alt="Asterisk icon" width={44} height={44} className=""/>
          <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{serviceData.title}</h2>
        </div> */}
        {/* <div className="border b-graymuted flex md:flex-row flex-col items-center rounded"> */}
        {/* <div className="flex flex-row  items-end gap-2 mb-2">
            <Image src={serviceIco} alt="Asterisk icon" width={44} height={44} className=""/>
            <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{serviceData.title}</h2>
          </div> */}
        {/* <h3 className="font-semibold text-xl p-8 flex flex-1">Diakui dengan berbagai penghargaan dan sertifikasi, villa kami menjamin standar kualitas tinggi dan layanan terbaik untuk pengalaman menginap yang tak terlupakan.</h3>
        
          <div className="flex gap-2 w-fit justify-end p-8 border-s b-graymuted">
          <Image src={bookingCertif} alt="Asterisk icon" width={340} height={340} className="max-w-[200px]"/>
          <Image src={agodaCertif} alt="Asterisk icon" width={340} height={340} className="max-w-[200px]"/>
          </div>
        </div>
      </div> */}

      {/* <div className="flex md:flex-row flex-col items-center pb-[144px] gap-8">
        <h3 className="font-semibold text-lg md:text-2xl w-full md:max-w-[calc(60%-12px)]">Diakui dengan penghargaan dan sertifikasi, villa kami menjamin kualitas dan layanan terbaik untuk pengalaman menginap tak terlupakan.</h3>
        
        <div className="flex gap-2 justify-center sm:justify-end md:justify-end w-full md:max-w-[calc(40%-12px)]">
        <Image src={bookingCertif} alt="Asterisk icon" width={600} height={600} className="w-full sm:w-[160px] md:w-[200px]"/>
        <Image src={agodaCertif} alt="Asterisk icon" width={600} height={600} className="w-full sm:w-[160px] md:w-[200px]"/>
        </div>

        </div> */}
        {/* <Image src={serviceIco} alt="Asterisk icon" width={100} height={64} className="mb-8 flex" />
        <h2 className="font-krona text-2xl lg:text-4xl text-primary font-semibold mb-4">
          {serviceData.title}
        </h2>
        <h3 className="text-lg text-gray-600 font-medium mb-0 max-w-[460px]">{serviceData.subtitle}</h3> */}
          <div className="flex flex-row items-end gap-2 mb-6">
            <Image src={serviceIco} alt="Asterisk icon" width={44} height={44} className=""/>
            <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">{serviceData.title}</h2>
          </div>
        {/* <h2 className="font-krona text-base md:text-lg text-primary leading-[100%!important] mb-4"> */}
          
        <h3 className="font-montserrat text-2xl md:text-4xl font-bold text-black mb-2 max-w-[990px]">{serviceData.subtitle}</h3>

        <div className="flex flex-wrap gap-4 lg:gap-8">
        {/* Render services */}
        {services.map((service, idx) => {
          // Check the index for dynamic width
          const widthClass = (idx % 3 === 0 || idx === services.length - 1) ? 'w-full' : 'w-full sm:flex-1 min-w-none sm:min-w-[380px]';
          const imageHeightClass = (idx % 3 === 0 || idx === services.length - 1) ? 'h-[260px] md:h-[380px] lg:h-[480px]' : 'h-[260px] md:h-[360px] lg:h-[360px]';
          
          return (
            <div key={idx} className={`flex flex-col ${widthClass} mt-6`}>
              <Image
                src={urlFor(service.serviceImage)}  // Correctly accessing the image
                alt={service.serviceTitle}
                width={1320}
                height={640}
                className={`w-full ${imageHeightClass} object-cover`}
              />
              <div className="mt-4">
                <h3 className="tracking-wider text-lg lg:text-xl font-semibold text-neutral-400 mb-2">
                  {service.serviceTitle}
                </h3>
                <p className="font-krona text-xl lg:text-2xl mb-2">{service.serviceTagline}</p>
                <p className="text-start text-sm md:text-base max-w-[580px] mb-4">{service.serviceDescription}</p>
                {service.serviceLink && service.serviceLink.trim() !== "" && (
                <Link
                  href={service.serviceLink}
                  passHref
                  className="flex items-center justify-center transition-all duration-500 ease-in-out hover:translate-x-2 gap-2 w-full md:w-fit mb-4 rounded border border-primary md:border-0 p-3 md:p-0 underline group"
                >
                  <p className="block m-0 text-base font-medium">View Details</p>
                  <div className="w-fit overflow-hidden">
                  <ArrowRight width={16} height={16} className="text-black mt-[2px] transition-all duration-500 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0"/>
                  </div>
                </Link>
              )}
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
  );
};

export default ServiceSection;
