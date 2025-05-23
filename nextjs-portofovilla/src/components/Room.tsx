'use client';

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import roomsIco from '../../public/rooms-ico.svg'
import roomKV from '../../public/room-bg.jpg'
import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url';
import '../../src/styles/arrow-animation.css';
import { ArrowRight } from '@carbon/icons-react';
import { summarizeText } from "../../components/common/summarizeText";


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
    <section className="justify-between mx-auto relative" id="room">
              <div className="relative">
              <Image src={roomKV} alt="Room KV" width={1920} height={600} className="max-h-[680px] w-full relative z-0 h-96 md:h-full object-cover object-top" />
              <div className="bg-[linear-gradient(to_top,_white_0%,_white_15%,_transparent_85%,_transparent_100%)] z-10 w-full h-full absolute top-0"></div>
              </div>

      <div className="max-w-[1296px] px-4 pb-20 md:pb-60 block m-auto -mt-14 md:-mt-32 relative z-30">

        <div className="flex flex-row md:flex-col items-end md:items-center gap-2 md:gap-4 mb-6">
          <Image src={roomsIco} alt="Asterisk icon" width={32} height={32} className="flex items-center" />
          <h2 className="font-montserrat text-base md:text-lg text-primary font-medium leading-[100%!important] text-center">
          {sectionMetadata.title}
          </h2>
          
        </div>

        <h3 className="font-libre text-2xl md:text-4xl font-bold text-neutral-800 mb-6 md:mb-10 max-w-[680px] md:text-center md:mx-auto">
          {sectionMetadata.subtitle}
        </h3>
        

      <div className="flex flex-wrap gap-7">
        {roomData.map((room: any, index: number) => (
          <div key={index} className="w-full lg:w-[calc(50%-16px)]">
            {room.image && (
                <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] overflow-hidden rounded">
                  <Image
                    src={urlFor(room.image).url()}
                    alt={room.roomName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded transition-all duration-700 ease-in-out hover:scale-105 "
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
                        <h3 className="text-sm">{specification.name}</h3>
                      </li>
                    );
                  })}
                </ul>
              <h2 className={`font-libre text-2xl md:text-3xl font-bold text-neutral-800 mb-2 under`}>{room.roomName}</h2>
              <p className={`text-primary text-lg font-medium mb-4 leading-relaxed`}>IDR {room.price} / malam</p>
              
              <p className="text-gray-700 text-sm max-w-[560px] mb-6 leading-relaxed">
                    {summarizeText(room.description)}
                  </p>
              
              <Link
                href={`/pages/${room.slug.current}`}
                passHref className="bg-primary flex text-white items-center justify-center transition-all duration-500 ease-in-out hover:translate-x-1 gap-2 w-full md:w-fit px-6 py-4 mb-4 rounded hover:underline hover-rtw group">
                <p className="block m-0 text-sm font-medium">
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
