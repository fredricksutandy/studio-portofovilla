'use client';

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import roomsIco from '../public/rooms-ico.svg'
import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url';
import '../src/styles/arrow-animation.css';
import { ArrowRight } from '@carbon/icons-react';
import { summarizeText } from "../components/common/summarizeText";


const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

const ROOM_QUERY = `
  *[_type == "room"] {
    roomName,
    slug,
specifications[]{
      name,
      icon {
        asset->{
          url,
          metadata {
            lqip // Include lqip here
          }
        }
      }
    },
    description,
    price,
    bedroomsNumber,
    guestNumber,
    facilities,
    image
  }
`;

const SECTION_METADATA_QUERY = `
  *[_type == "sectionMetadata" && sectionName == "Room Section"][0] {
    title,
    subtitle,
    description
  }
`;

const RoomSection = () => {
  const [roomData, setRoomData] = useState<any>(null);
  const [sectionMetadata, setSectionMetadata] = useState<any>(null);

  // Fetch room data and section metadata
  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomDataResponse = await client.fetch(ROOM_QUERY);
        setRoomData(roomDataResponse);

        const sectionMetadataResponse = await client.fetch(SECTION_METADATA_QUERY);
        setSectionMetadata(sectionMetadataResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!roomData || !sectionMetadata) {
    return <div>Loading...</div>; // Loading state for both room data and section metadata
  }

  return (
    <section className="justify-between mx-auto px-4 py-16 md:py-[120px] relative" id="room">
      <div className="max-w-[1296px] block m-auto">
      {/* <Image src={roomsIco} alt="Asterisk icon" width={100} height={64} className="mb-8 flex"/>

      <h2 className="text-2xl lg:text-3xl text-black font-semibold mb-0">
      {sectionMetadata.title}
      </h2>
      <h3 className="text-2xl lg:text-3xl text-black font-semibold mb-10">
      {sectionMetadata.subtitle}</h3> */}

            <div className="flex flex-row items-end gap-2 mb-4 md:mb-6">
                <Image src={roomsIco} alt="Asterisk icon" width={40} height={40} className="flex items-center" />
                <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">
                {sectionMetadata.title}
                </h2>
                
              </div>
              <h3 className="font-montserrat text-2xl md:text-4xl font-bold text-neutral-800 mb-6 md:mb-10 max-w-[768px]">
      {sectionMetadata.subtitle}</h3>

      <div className="flex flex-wrap gap-7">
        {roomData.map((room: any, index: number) => (
          <div key={index} className="w-full lg:w-[calc(50%-16px)]">
            {room.image && (
                <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] overflow-hidden rounded-lg">
                  <Image
                    src={urlFor(room.image).url()}
                    alt={room.roomName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg transition-all duration-700 ease-in-out hover:scale-105 "
                  />
                </div>
              )}
                <ul className="flex flex-wrap gap-2 items-center justify-start my-4">
                  {room.specifications?.slice(0, 4).map((specification: any, index: number) => {
                    return (
                      <li key={index} className="w-fit rounded flex items-start gap-2 p-2 border border-graymuted">
                        {specification.icon?.asset?.url && (
                          <img 
                          src={urlFor(specification.icon).url()} 
                          alt={specification.name} 
                          width={20} 
                          height={20} 
                          className="object-cover"
                        />
                        )}
                        <h3 className="text-sm md:text-[14px]">{specification.name}</h3>
                      </li>
                    );
                  })}
                </ul>
              <h2 className={`font-krona text-xl md:text-2xl font-semibold text-neutral-800 mb-2 under`}>{room.roomName}</h2>
              <p className={`text-neutral-500 text-xl font-semibold mb-4`}>IDR {room.price} / malam</p>
              
              <p className="text-gray-700 text-base max-w-[560px] mb-6">
                    {summarizeText(room.description)}
                  </p>
              
              <Link
                href={`/pages/${room.slug.current}`}
                passHref className="bg-primary flex text-white items-center justify-center transition-all duration-500 ease-in-out hover:translate-x-1 gap-2 w-full md:w-fit px-6 py-4 mb-4 rounded-lg hover:underline hover-rtw group">
                <p className="block m-0 text-base font-medium">
                  View Details
                </p>
                
                <div className="overflow-hidden w-fit rtw-container">
                  <ArrowRight width={18} height={18} className="mt-[1px] hover-rtw-anim opacity-100 transition-all duration-700 translate-x-0 relative" />
                </div>
              </Link>
          </div>
        ))}
        </div>
        </div>
    </section>
  );
};

export default RoomSection;
