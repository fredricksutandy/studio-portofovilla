'use client';

import { Key, useEffect, useState } from "react";
import { client } from "@/sanity/client"; 
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import { Krona_One } from 'next/font/google';
import Image from "next/image";
import ButtonWa from './common/ButtonWa';
import mapico from '../public/map-ico.png'
import WaLogo from '../public/logos_whatsapp-icon.svg'

// Initialize the Krona One font
const kronaOne = Krona_One({
  weight: '400', // Specify the weights you need
  subsets: ['latin'], // Ensure the font supports the required subset
  display: 'swap',
});

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// Sanity query to fetch the 'contact' document
const CONTACT_QUERY = `*[_type == "contact"][0]`;

const ContactSection = () => {
  const [contactData, setContactData] = useState<any>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      const data = await client.fetch<SanityDocument>(CONTACT_QUERY);
      setContactData(data);
    };

    fetchContactData();
  }, []);

  if (!contactData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="max-w-full gap-6 lg:gap-10 flex h-fit flex-col align-middle bg-[#Fff] px-4 py-10 lg:py-[80px] bg-contact-bg bg-no-repeat bg-fixed bg-cover bg-top">
      <div className="mb-6">
        {/* <Image src={mapico} alt="Logo" className="m-auto w-10 mb-8 h-auto"/> */}
      </div>

      <div className="flex items-center gap-6 flex-wrap justify-center max-w-[1440px] m-auto w-full flex-col lg:flex-row">
        <iframe src={contactData.mapEmbedLink} className="w-full lg:w-[calc(50%-24px)] border-0 h-[300px] md:h-[360px] lg:h-fill outline-none rounded" loading="lazy"></iframe>

        <div className="flex flex-col gap-8 h-fit p-5 w-full lg:w-1/2 rounded">
          <h2 className={`${kronaOne.className} text-3xl lg:text-4xl text-white w-fit rounded max-w-[380px]`} >{contactData.subTitle}</h2>
          <div className="flex gap-2">
            {contactData.socialMedia.map((social: { link: string | undefined; icon: any; platform: any; }, index: Key | null | undefined) => (
              <a key={index} href={social.link} className="p-5 bg-white rounded-full flex items-center">
                {social.icon && <Image width={24} height={24} src={urlFor(social.icon).url()} alt={`${social.platform} icon`} className="w-6 h-6" />}
              </a>
            ))}
          </div>
          <div>
            {/* <p className="font-medium text-base lg:text-lg text-[#757575]">Address</p> */}
            <a href={contactData.whatsappURL} className="mb-1 lg:mb-2 block text-lg lg:text-xl font-medium w-fit text-white">{contactData.whatsappNumber}</a>
            {/* <p className="font-medium text-base lg:text-lg text-[#757575]">Email</p> */}
            <a href={contactData.emailURL} className="mb-1 lg:mb-2 block text-lg lg:text-xl font-medium w-fit text-white">{contactData.email}</a>
            {/* <p className="font-medium text-base lg:text-lg text-[#757575]">Whatsapp</p> */}
            <a href={contactData.googleMapURL} className="mb-1 lg:mb-2 block text-lg lg:text-xl font-medium w-fit text-white">{contactData.address}</a>
          </div>
          <ButtonWa 
          link={contactData.whatsappURL}
          text="Tanya jalur lebih jelas"
          type="white" // or "white"
          iconType={WaLogo.src}
        />
        </div>
        
      </div>
    </section>
  );
};

export default ContactSection;
