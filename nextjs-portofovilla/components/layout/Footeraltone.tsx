'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";

// Initialize image builder
const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// GROQ Query: Fetch all required data in one request
const QUERY = `{
  "siteSettings": *[_type == "siteSettings"][0],
  "contact": *[_type == "multipleContact"][0],
  "rooms": *[_type == "room"][0],
}`;

const FooterSection = () => {
  const [data, setData] = useState<{
    siteSettings: SanityDocument | null;
    contact: SanityDocument | null;
    rooms: SanityDocument[] | null;
  }>({
    siteSettings: null,
    contact: null,
    rooms: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await client.fetch(QUERY);
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const { siteSettings, contact, rooms } = data;

  if (!siteSettings || !contact || !rooms) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <footer className="bg-[#254430] text-white px-4 py-20">
      <div className="max-w-[1296px] mx-auto">
      <div className="flex items-end justify-between gap-4">

        {siteSettings.logo && (
          <Image
            src={urlFor(siteSettings.logo).url()}
            alt="Logo"
            width={48}
            height={48}
          />
        )}
        {/* <span className="text-xl font-bold">{siteSettings.tagline}</span> */}
      <span className="text-6xl font-bold font-krona leading-[100%]">{siteSettings.title}</span>

      </div>

      {/* Contact Info */}
      <div className="pt-20 md:pt-[72px] flex flex-col gap-8">
        <div className="">
          <p className="font-krona font-semibold mb-2">Quick Link</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">About</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">Service</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">Activities</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">Testimonies</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">FAQ</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">Contact</p>
        </div>
        <div className="">
          <p className="font-krona font-semibold mb-2">Our Rooms</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">Bougenville Room</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">Monsterra Room</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">Chrysanthenum Room</p>
          <p className="transition-all duration-500 w-fit hover:ps-2 cursor-pointer">Marigold Room</p>
        </div>

        <div className="flex gap-5 mt-10 md:mt-0">
          {contact.socialMedia.map((social: { link: string | undefined; icon: any; platform: any; }, index: Key | null | undefined) => (
            <a key={index} href={social.link} className="py-3 px-6 bg-white rounded-full flex gap-4 items-center text-primary justify-center w-fit h-fit transition-all duration-500 hover:translate-x-2 cursor-pointer">
              {social.icon && <Image width={24} height={24} src={urlFor(social.icon).url()} alt={`${social.platform} icon`} className="w-5 h-5" />}
              {social.platform}
            </a>
          ))}
        </div>

        <div className="">
          <div className="mb-2">
          {contact.phoneInfo.map((phone) => (
            <div key={phone.phoneNumber} className="flex gap-2">
              <p>{phone.phoneName}</p> - 
              {phone.phoneUrl ? (
                <a href={phone.phoneUrl} target="_blank" rel="noopener noreferrer">
                  {phone.phoneNumber}
                </a>
              ) : (
                <p>{phone.phoneNumber}</p>
              )}
            </div>
          ))}
</div>
<div className="mb-2">
                      {/* Email Contacts */}
            {contact.emailInfo?.map((email) => (
              <div key={email.emailAddress}>
                <a href={`mailto:${email.emailAddress}`}>{email.emailAddress}</a>
              </div>
            ))}
</div>
<div className="mb-2">

            {/* Address */}
            {contact.addressInfo?.map((address) => (
              <div key={address.addressDetail} className="max-w-[480px]">  
                <p>{address.addressDetail}</p>
              </div>
            ))}
</div>

        </div>
        <div className="flex justify-between opacity-65">
        <p className="text-sm">
          Powered & partnered with Portofovilla
        </p>
        <p className="text-sm">
          {siteSettings.copyright ?? "© 2024 All Rights Reserved."}
        </p>
        </div>
      </div>
        
      </div>
    </footer>
  );
};

export default FooterSection;
