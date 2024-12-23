'use client';

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import roomsIco from '../public/rooms-ico.svg'
import guestIco from '../public/guest-ico.svg'
import bedIco from '../public/bed-ico.svg'
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
    <section className="justify-between mx-auto bg-[#F9FFEB] px-5 py-10 md:py-[80px] relative" id="room">
      <div className="max-w-[1440px] block m-auto">
      <Image src={roomsIco} alt="Asterisk icon" width={100} height={64} className="mb-8 flex"/>

      <h2 className="text-3xl lg:text-3xl text-black font-semibold mb-0">
      {sectionMetadata.title}
      </h2>
      <h3 className="text-2xl lg:text-3xl text-black font-medium mb-10">
      {sectionMetadata.subtitle}</h3>

      <div className="flex flex-wrap gap-8">
        {/* Room Data */}
        {roomData.map((room: any) => (
          <div key={room.slug.current} className="w-[calc(50%-16px)]">
            {room.image && (
                <div className="relative w-full h-auto md:h-[400px] mb-2">
                  <Image
                    src={urlFor(room.image).url()}
                    alt={room.roomName}
                    layout="fill"
                    objectFit="cover"
                    className=""
                  />
                </div>
              )}
              <h2 className={`${kronaOne.className} text-2xl font-semibold text-black mb-3`}>{room.roomName}</h2>
              <p className={`${kronaOne.className} text-black font-bold text-base mb-2`}>IDR {room.price} / malam</p>
              <div className="flex gap-5">
                <p className="text-black flex gap-2 font-medium items-center"><Image src={bedIco} alt="bedroom icon" width={32} height={32} className=""/> {room.bedroomsNumber} Bedrooms</p>
                <p className="text-black flex gap-2 font-medium items-center"><Image src={guestIco} alt="guest icon" width={32} height={32} className=""/> {room.guestNumber} Guests</p>
              </div>
              {/* <ul className="mt-2 text-gray-500 text-sm">
                {room.facilities?.map((facility: string, index: number) => (
                  <li key={index}>• {facility}</li>
                ))}
              </ul> */}
              {/* Displaying room image */}
              
              <Link href={`/room/${room.slug.current}`} passHref>
                <p className="mt-2 block text-blue-500 hover:underline">
                  View Details
                </p>
              </Link>
          </div>
        ))}
        </div>
        </div>
    </section>
  );
};

export default RoomSection;
