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
    <section className="justify-between mx-auto bg-[#F9FFEB] px-5 py-10 md:py-[80px] relative">
      <div className="max-w-[1296px] block m-auto">
      <Image src={roomsIco} alt="Asterisk icon" width={80} height={80} className="mb-8 flex"/>

      <h2 className="text-2xl lg:text-4xl text-[#1D764A] font-semibold mb-0">
      {sectionMetadata.title}
      </h2>
      <h3 className="text-2xl lg:text-4xl text-[#1D764A] font-semibold mb-20">
      {sectionMetadata.subtitle}</h3>

      <div className="flex flex-wrap gap-10 md:gap-20">
        {/* Room Data */}
        {roomData.map((room: any, index: number) => (
  <div
    key={room.slug.current}
    className={`w-full gap-10 flex relative group overflow-hidden items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
  >
    {room.image && (
      <div className="relative w-full md:w-[calc(50%-20px)] h-[300px] md:h-[400px] overflow-hidden mb-2 rounded">
        <Image
          src={urlFor(room.image).url()}
          alt={room.roomName}
          layout="fill"
          objectFit="cover"
          className="transition-all group-hover:scale-105 w-full rounded"
        />
      </div>
    )}

    <div className="w-full md:w-[calc(50%-20px)] h-fit flex justify-center flex-col gap-6">
      <h2 className={`${kronaOne.className} text-xl md:text-3xl font-semibold text-black`}>{room.roomName}</h2>
      <div className="flex gap-5">
        <p className={`${kronaOne.className} text-black flex gap-2 font-medium items-center text-base`}><Image src={bedIco} alt="bedroom icon" width={28} height={28} className=""/> {room.bedroomsNumber} Bedrooms</p>
        <p className={`${kronaOne.className} text-black flex gap-2 font-medium items-center text-base`}><Image src={guestIco} alt="guest icon" width={28} height={28} className=""/> {room.guestNumber} Guests</p>
      </div>
      <div>
      <p className="text-gray-700 text-base max-w-[420px]">{room.description}</p>
      {/* <ul className="mt-2 text-gray-500 text-sm flex flex-wrap gap-2 max-w-[420px]">
                {room.facilities?.map((facility: string, index: number) => (
                  <li key={index}>• {facility}</li>
                ))}
              </ul> */}
      </div>
        
      <Link
      href={`/room/${room.slug.current}`}
        passHref className="flex items-center transition-all hover:translate-x-1 gap-2 border border-[#1A520F] w-fit py-4 px-6">
        <p className="block m-0 text-[#1A520F] hover:underline">
          View Details
        </p>
        <Image src={arrowRight} alt="guest icon" width={16} height={16} className="invert"/>
      </Link>
    </div>
  </div>
))}

        </div>
        </div>
    </section>
  );
};

export default RoomSection;
