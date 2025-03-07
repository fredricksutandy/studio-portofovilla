'use client';

import { Key, useEffect, useState } from "react";
import { client } from "@/sanity/client"; 
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import copy from 'copy-to-clipboard';
import { Copy } from '@carbon/icons-react';

const builder = imageUrlBuilder(client);

const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

const CONTACT_QUERY = `*[_type == "multipleContact"][0]`;

const ContactSection = () => {
  const [contactData, setContactData] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      const data = await client.fetch<SanityDocument>(CONTACT_QUERY);
      setContactData(data);
    };

    fetchContactData();
  }, []);

    const handleCopy = (text: string) => {
      copy(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 3000);
    };

  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-full gap-6 lg:gap-10 flex h-fit flex-col align-middle bg-white px-4 py-20 lg:py-[120px] bg-contact-bg-2 bg-no-repeat bg-fixed bg-cover bg-top" id="contact">
      <div className="flex items-start gap-6 flex-wrap justify-center max-w-[1296px] m-auto w-full flex-col lg:flex-row">
        <div className="h-fit w-full rounded">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20">
            <div>
              <h2 className="font-krona text-3xl lg:text-4xl  text-white font-semibold mb-2" >{contactData.title}</h2>
              <p className="text-base text-gray-300 max-w-[520px]">{contactData.subTitle}</p>
            </div>
            <div className="flex gap-4 mt-10 md:mt-0">
              {contactData.socialMedia.map((social: { link: string | undefined; icon: any; platform: any; }, index: Key | null | undefined) => (
                <a key={index} href={social.link} className="p-4 bg-white rounded-full flex items-center  justify-center w-14 h-14">
                  {social.icon && <Image width={24} height={24} src={urlFor(social.icon).url()} alt={`${social.platform} icon`} className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row flex-wrap mb-10 gap-4">
            <div className="mb-10 md:mb-6 flex gap-1 flex-col flex-1 min-w-[180px] max-w-[25%]">
              {contactData.phoneInfo.map((phone: { phoneNumber: string | undefined; phoneName: string | undefined; phoneUrl: string | undefined;  }, index: Key | null | undefined) => (
                  <div key={index} className="mb-1">
                    <p className="block text-sm font-krona w-fit text-white">{phone.phoneName}</p>
                    <div className="flex gap-3">
                      <a href={phone.phoneNumber} className="mb-0 break-all lg:mb-2 block text-xl hover:underline w-fit text-neutral-200">{phone.phoneNumber}</a>
                      <Copy onClick={() => handleCopy(phone.phoneNumber ?? '')} size={20} className="text-white cursor-pointer mt-1"/>
                    </div>

                  </div>
                ))}
            </div>

            <div className="mb-10 md:mb-6 flex gap-1 flex-col flex-1 min-w-[180px]">
              {contactData.emailInfo.map((email: { emailName: string | undefined; emailAddress: string | undefined;}, index: Key | null | undefined) => (
                  <div key={index} className="mb-1">
                    <p className="block text-sm font-krona w-fit text-white">{email.emailName}</p>
                    <div className="flex gap-3">
                      <a href={email.emailAddress} className="mb-0 break-all lg:mb-2 block text-xl hover:underline w-fit text-neutral-200">{email.emailAddress}</a>
                      <Copy onClick={() => handleCopy(email.emailAddress ?? '')} size={20} className="text-white cursor-pointer mt-1"/>
                    </div>
                    
                  </div>
                  
                ))}
            </div>

            <div className="flex gap-1 flex-col flex-1 min-w-[180px]">
              {contactData.addressInfo.map((address: { addressName: string | undefined; addressDetail: string | undefined; addressUrl: string | undefined; }, index: Key | null | undefined) => (
                  <div key={index} className="mb-1">
                    <p className="block text-sm font-krona w-fit text-white">{address.addressName}</p>
                    <div className="flex gap-3">
                    <a href={address.addressUrl} className="mb-0 break-all lg:mb-2 block text-xl hover:underline w-fit text-neutral-200">{address.addressDetail}</a>
                    <Copy onClick={() => handleCopy(address.addressDetail ?? '')} size={20} className="text-white cursor-pointer mt-1"/>
                    </div>
                  </div>
                  
                ))}
            </div>
          
          </div>

          <iframe src={contactData.mapEmbedLink} className="w-full border-0 h-[320px] md:h-[480px] lg:h-fill outline-none rounded" loading="lazy"></iframe>
        
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
