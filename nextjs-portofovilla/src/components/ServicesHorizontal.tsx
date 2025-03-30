'use client';

import { useEffect, useState, useRef } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import serviceIco from "../../public/service-ico.svg";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import ButtonWa from '../../components/common/ButtonWa';
import WaLogo from '../../public/logos_whatsapp-icon.svg';
import Link from "next/link";
import { ArrowRight } from '@carbon/icons-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    const fetchServiceData = async () => {
      const data = await client.fetch<SanityDocument>(SERVICE_QUERY);
      setServiceData(data);
    };
    fetchServiceData();
  }, []);

  useEffect(() => {
    if (serviceData?.services) {
      setServiceCount(serviceData.services.length);
    }
  }, [serviceData]);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current || serviceCount === 0) return;

    const sectionWidth = serviceCount * 420; // Each service takes 400px + margin
    sectionRef.current.style.width = `${sectionWidth}px`; // Set width dynamically

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: `-${sectionWidth - window.innerWidth}px`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${sectionWidth}px`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, [serviceCount]);

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
    <section className="overflow-hidden bg-gray-200" ref={triggerRef}>
      <div ref={sectionRef} className="flex items-center h-screen gap-4">
        {serviceData.services.map((service, index) => (
          <div key={index} className="w-[400px] flex-shrink-0 px-4">
            <Image
              src={urlFor(service.serviceImage)}
              alt={service.serviceTitle}
              width={400}
              height={260}
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
      {/* <div className="mt-10">
        <ButtonWa 
          link={serviceData.serviceContact}
          text="Tanya lebih lanjut"
          type="green"
          iconType={WaLogo.src}
          radius={"lg"} 
          width={"full"} 
          displayMobile={true} 
          displayDesktop={true}
        />
      </div> */}
    </section>
  );
};

export default ServicesSection;
