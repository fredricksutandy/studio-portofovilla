'use client';

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import roomsIco from '../public/rooms-ico.svg'
import guestIco from '../public/guest-ico.svg'
import bedIco from '../public/bed-ico.svg'
import arrowRight from '../public/carbon_arrow-right.svg'
import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url';
import { Krona_One } from 'next/font/google'; // Use the correct font import


// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

const kronaOne = Krona_One({
  weight: '400', // Specify the weights you need
  subsets: ['latin'], // Ensure the font supports the required subset
  display: 'swap',
});

// Define queries for room data and section metadata
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
    <section className="justify-between mx-auto px-5 py-10 md:py-[80px] relative" id="room">
      <div className="max-w-[1296px] block m-auto">
      <Image src={roomsIco} alt="Asterisk icon" width={80} height={80} className="mb-8 flex"/>

      <h2 className="text-2xl lg:text-3xl text-black font-semibold mb-0">
      {sectionMetadata.title}
      </h2>
      <h3 className="text-2xl lg:text-3xl text-black font-semibold mb-10">
      {sectionMetadata.subtitle}</h3>

      <div className="flex flex-wrap gap-6">
        {/* Room Data */}
        {roomData.map((room: any) => (
          <Link href={`/room/${room.slug.current}`} passHref key={room.slug.current} className="w-full md:w-[calc(50%-12px)] relative group overflow-hidden">
            {room.image && (
                <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden mb-2 ">
                  <Image
                    src={urlFor(room.image).url()}
                    alt={room.roomName}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all group-hover:scale-105"
                  />
                  <div className="absolute transition-all w-full h-full bg-black/[0.35]"></div>
                </div>
              )}
              <div className="absolute top-0 left-0 w-full p-4">
              <h2 className={`${kronaOne.className} text-2xl font-semibold text-white mb-3`}>{room.roomName}</h2>
              {/* <p className={`${kronaOne.className} text-white font-bold text-base mb-2`}>IDR {room.price} / malam</p> */}
<ul className="flex flex-wrap gap-2 items-center justify-start my-4">
                {room.specifications?.slice(0, 4).map((specification: any, index: number) => {
                    return (
                      <li key={index} className="w-fit rounded flex items-start gap-2 p-2 border border-[#d9d9d9]">
                        {specification.icon?.asset?.url && (
                          <img 
                          src={urlFor(specification.icon).url()} 
                          alt={specification.name} 
                          width={20} 
                          height={20} 
                          className="object-cover invert"
                        />
                        )}
                        <h3 className="text-[14px] text-white">{specification.name}</h3>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* <ul className="mt-2 text-gray-500 text-sm">
                {room.facilities?.map((facility: string, index: number) => (
                  <li key={index}>• {facility}</li>
                ))}
              </ul> */}
              {/* Displaying room image */}
              
              <div className="absolute gap-2  right-4 bottom-4 flex items-center transition-all hover:translate-x-1">
                <p className="block m-0 text-white hover:underline">
                  View Details
                </p>
                <Image src={arrowRight} alt="guest icon" width={16} height={16} className=""/>
              </div>
            </Link>

        ))}
        </div>
        </div>
    </section>
  );
};

export default RoomSection;
