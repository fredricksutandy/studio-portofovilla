'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { quickLinks } from "../../src/constant/link"; 

// Initialize image builder
const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// GROQ Query: Fetch all required data in one request
const QUERY = `{
  "siteSettings": *[_type == "siteSettings"][0],
  "contact": *[_type == "multipleContact"][0],
  "rooms": *[_type == "room"] {roomName,slug},
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
    <footer className="bg-[#254430] text-white px-6 pt-12 mdpt-20 pb-[112px] font-montserrat">
      <div className="max-w-[1296px] mx-auto">
        <div className="flex items-start md:items-end justify-between gap-6 flex-col sm:flex-row">
          <p className="text-4xl font-krona leading-[100%] order-2 sm:order-1">{siteSettings.title}</p>
            {siteSettings.logo && (
              <Image
                src={urlFor(siteSettings.logo).url()}
                alt="Logo"
                width={40}
                height={40}
                className="order-1 sm:order-2"
              />
            )}
        </div>

      <p className="text-start sm:text-center py-12 sm:py-20 md:py-[120px] lg:py-[176px] text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-medium sm:font-semibold italic max-w-[880px] mx-auto">{siteSettings.tagline}</p>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
        <div className="flex flex-col">
          <p className="font-krona mb-2">Quick Link</p>
          {quickLinks.map(({ name, href }) => (
            <a key={href} href={href} className="text-neutral-300 text-sm transition-all duration-500 w-fit hover:translate-x-2 cursor-pointer" aria-label={name}>
              {name}
            </a>
          ))}
        </div>
        <div className="flex flex-col">
          <p className="font-krona mb-2">Our Rooms</p>
          {rooms.map((room) => (
            <Link
            key={room.slug.current}
            href={`pages/${room.slug.current}`} 
            prefetch={true} 
            className="text-neutral-300 text-sm transition-all duration-500 w-fit hover:translate-x-2 cursor-pointer">
              {room.roomName}
              </Link>
            ))}
        </div>

        

        <div className="">
          <div className="mb-2">
          {contact.phoneInfo.map((phone) => (
            <div key={phone.phoneNumber} className="flex gap-2 justify-start md:justify-end text-neutral-300">
              <p className="text-sm">{phone.phoneName}</p> - 
              {phone.phoneUrl ? (
                <a className="text-sm" href={phone.phoneUrl} target="_blank" rel="noopener noreferrer">
                  {phone.phoneNumber}
                </a>
              ) : (
                <p>{phone.phoneNumber}</p>
              )}
            </div>
          ))}
          </div>
          <div className="mb-2 text-neutral-300">
            {/* Email Contacts */}
            {contact.emailInfo?.map((email) => (
              <div key={email.emailAddress} className="flex gap-2 justify-start md:justify-end">
                <a className="text-sm" href={`mailto:${email.emailAddress}`}>{email.emailAddress}</a>
              </div>
            ))}
          </div>
          <div className="mb-10 text-neutral-300">

            {/* Address */}
            {contact.addressInfo?.map((address) => (
              <div key={address.addressDetail} className="max-w-[480px] me-auto md:ms-auto">  
                <p className="text-start md:text-end text-sm">{address.addressDetail}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap justify-start md:justify-end">
          {contact.socialMedia.map((social: { link: string | undefined; icon: any; platform: any; }, index: Key | null | undefined) => (
            <a key={index} href={social.link} className="py-3 px-6 bg-white rounded-full flex gap-4 items-center text-primary justify-center w-fit h-fit transition-all duration-500 hover:-translate-x-2 cursor-pointer">
              {social.icon && <Image width={24} height={24} src={urlFor(social.icon).url()} alt={`${social.platform} icon`} className="w-5 h-5" />}
              {social.platform}
            </a>
          ))}
          </div>
        </div>

      </div>

      <div className="flex justify-between flex-wrap opacity-65">
          <p className="text-sm">
            Powered & partnered with Portofovilla
          </p>
          <p className="text-sm">
            {siteSettings.copyright ?? "© 2024 All Rights Reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
