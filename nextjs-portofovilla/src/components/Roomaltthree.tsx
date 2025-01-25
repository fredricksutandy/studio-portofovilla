'use client';

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import roomsIco from '../../public/rooms-ico.svg'
import guestIco from '../../public/guest-ico.svg'
import bedIco from '../../public/bed-ico.svg'
import arrowRight from '../../public/carbon_arrow-right.svg'
import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url';
import { Krona_One } from 'next/font/google'; // Use the correct font import


// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

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
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>; // Loading state for both room data and section metadata
  }

  return (
    <section className="justify-between mx-auto bg-[#fff] px-5 py-10 lg:py-[160px] relative" id="room">
      <div className="max-w-[1296px] block m-auto">
      <Image src={roomsIco} alt="Asterisk icon" width={80} height={80} className="mb-8 flex mr-auto lg:mx-auto"/>

      <h2 className="font-krona text-center text-2xl lg:text-4xl text-[#1A520F] font-semibold mb-4">
      {sectionMetadata.title}
      </h2>
      <h3 className="text-lg text-center  text-gray-600 font-medium mb-10 max-w-[460px] m-auto">
      {sectionMetadata.subtitle}</h3>

      <div className="flex flex-wrap gap-8">
        {roomData?.slice(0, 3).map((room: any, index: number) => (
          <div
            key={room.slug.current}
            className="w-full lg:w-[calc(33%-24px)] gap-4 lg:gap-10 flex flex-auto lg:flex-1 flex-col items-center group overflow-hidden"
          >
            {room.image && (
              <div className="relative w-full h-[300px] lg:h-[440px] overflow-hidden mb-2 rounded-t-xl lg:rounded-t-full">
                <Image
                  src={urlFor(room.image).url()}
                  alt={room.roomName}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all group-hover:scale-105 w-full rounded"
                />
              </div>
            )}

            <div className="w-full h-fit flex justify-start lg:justify-center flex-col gap-4 text-start lg:text-center">
              <h2 className="font-krona text-xl lg:text-2xl font-semibold text-black">{room.roomName}</h2>
              {/* <div className="flex gap-5 justify-start lg:justify-center">
                <p className={` text-black flex gap-2 font-medium items-center text-base`}><Image src={bedIco} alt="bedroom icon" width={28} height={28} className=""/> {room.bedroomsNumber} Bedrooms</p>
                <p className={` text-black flex gap-2 font-medium items-center text-base`}><Image src={guestIco} alt="guest icon" width={28} height={28} className=""/> {room.guestNumber} Guests</p>
              </div> */}
              <p className="font-montserrat text-neutral-600 font-semibold text-lg mb-4">IDR {room.price} / malam</p>

            <ul className="flex flex-wrap gap-2 items-center justify-center">
                      {room.specifications?.map((specification: any, index: number) => {
                          return (
                            <li key={index} className="w-fit rounded flex items-start gap-2 p-2 border border-[#d9d9d9]">
                              {specification.icon?.asset?.url && (
                                <img 
                                src={urlFor(specification.icon).url()} 
                                alt={specification.name} 
                                width={20} 
                                height={20} 
                                className="object-cover"
                              />
                              )}
                              <h3 className="text-[14px]">{specification.name}</h3>
                            </li>
                          );
                        })}
                      </ul>
              <div>
                <p className="text-neutral-500 text-base">{room.description}</p>
              </div>
                
              <Link
              href={`pages/${room.slug.current}`} prefetch={true}
                className="flex items-center mt-4 mx-auto transition-all hover:translate-x-1 gap-2 border border-[#1A520F] justify-center w-full lg:w-fit py-4 px-6">
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
