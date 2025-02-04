'use client';

import { Key, useEffect, useState } from "react";
import { client } from "@/sanity/client"; 
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import { Krona_One } from 'next/font/google';
import Image from "next/image";
import ButtonWa from './common/ButtonWa';
import WaLogo from '../public/logos_whatsapp-icon.svg'

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// Sanity query to fetch the 'contact' document
const CONTACT_QUERY = `*[_type == "multipleContact"][0]`;

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
    <section className="max-w-full gap-6 lg:gap-10 flex h-fit flex-col align-middle bg-[#Fff] px-4 py-10 lg:py-[120px] bg-contact-bg-2 bg-no-repeat bg-fixed bg-cover bg-top" id="contact">
      <div className="flex items-start gap-6 flex-wrap justify-center max-w-[1296px] m-auto w-full flex-col lg:flex-row">
        <div className="h-fit p-5 w-full rounded">
          <div className="flex justify-between flex-wrap mb-16 ">
            <div>
              <h2 className="font-krona text-2xl lg:text-4xl  text-white font-semibold mb-2" >{contactData.title}</h2>
              <p className="text-base text-gray-300 max-w-[520px]">{contactData.subTitle}</p>
            </div>
            <div className="flex gap-4">
              {contactData.socialMedia.map((social: { link: string | undefined; icon: any; platform: any; }, index: Key | null | undefined) => (
                <a key={index} href={social.link} className="p-4 bg-white rounded-full flex items-center  justify-center w-16 h-16">
                  {social.icon && <Image width={24} height={24} src={urlFor(social.icon).url()} alt={`${social.platform} icon`} className="w-6 h-6" />}
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap mb-10">
          <div className="mb-6 flex gap-0 flex-col flex-1">
            {contactData.phoneInfo.map((phone: { phoneNumber: string | undefined; phoneName: string | undefined; phoneUrl: string | undefined;  }, index: Key | null | undefined) => (
                <div className="mb-1">
                  <p className="block text-sm font-krona w-fit text-white">{phone.phoneName}</p>
                  <a href={phone.phoneNumber} className="mb-0 break-all lg:mb-2 block text-xl hover:underline w-fit text-neutral-200">{phone.phoneNumber}</a>
                </div>
              ))}
          </div>

          <div className="mb-6 flex gap-0 flex-col flex-1">
            {contactData.emailInfo.map((email: { emailName: string | undefined; emailAddress: string | undefined;}, index: Key | null | undefined) => (
                <div className="mb-1">
                  <p className="block text-sm font-krona w-fit text-white">{email.emailName}</p>
                  <a href={email.emailAddress} className="mb-0 break-all lg:mb-2 block text-xl hover:underline w-fit text-neutral-200">{email.emailAddress}</a>
                </div>
                
              ))}
          </div>

          <div className="flex gap-0 flex-col flex-1">
            {contactData.addressInfo.map((address: { addressName: string | undefined; addressDetail: string | undefined; addressUrl: string | undefined; }, index: Key | null | undefined) => (
                <div className="mb-1">
                  <p className="block text-sm font-krona w-fit text-white">{address.addressName}</p>
                  <a href={address.addressUrl} className="mb-0 break-all lg:mb-2 block text-xl hover:underline w-fit text-neutral-200">{address.addressDetail}</a>
                </div>
                
              ))}
          </div>
          
          </div>

          <iframe src={contactData.mapEmbedLink} className="w-full border-0 h-[320px] md:h-[480px] lg:h-fill outline-none rounded" loading="lazy"></iframe>

          {/* <ButtonWa 
            link={contactData.whatsappURL}
            text="Tanya jalur lebih jelas"
            type="white" // or "white"
            iconType={WaLogo.src}
            radius={"lg"} 
            width={"fit"} 
            displayMobile={true} 
            displayDesktop={true}
          /> */}
        </div>
        

      </div>
    </section>
  );
};

export default ContactSection;
