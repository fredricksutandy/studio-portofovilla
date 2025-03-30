'use client';

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import roomsIco from '../public/rooms-ico.svg';
import { ArrowRight } from '@carbon/icons-react';
import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url';
import { summarizeText } from "../components/common/summarizeText";

const builder = imageUrlBuilder(client);
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
    return <div>Loading...</div>;
  }

  const firstRoom = roomData[0]; // Get only the first room

  return (
    <section className="justify-between mx-auto px-5 py-16 md:py-[120px] relative" id="room">
      <div className="max-w-[1296px] block m-auto">
        {firstRoom && (
          // <Link href={`/room/${firstRoom.slug.current}`} passHref className="w-full md:w-[calc(50%-12px)] relative group overflow-hidden">
          <div className="flex md:flex-row flex-col gap-6">
            {firstRoom.image && (
                <Image
                  src={urlFor(firstRoom.image).url()}
                  alt={firstRoom.roomName}
                  width={680}
                  height={680}
                  className="h-[270px] md:h-[500px] object-cover w-full md:w-[calc(50%)] rounded-xl"
                />
            )}
            <div className="w-full md:w-[calc(50%)] p-0 md:p-16 flex flex-col justify-center">
              <div className="flex flex-row  items-end gap-2 mb-6">
                <Image src={roomsIco} alt="Asterisk icon" width={40} height={40} className="flex items-center" />
                <h2 className="font-krona text-base md:text-lg text-primary font-medium leading-[100%!important]">
                {sectionMetadata.title}
                </h2>
              </div>
              <h3 className={`font-montserrat text-2xl md:text-4xl font-bold text-black mb-2`}>{firstRoom.roomName}</h3>
              {/* <p className={`font-montserrat text-base text-black mb-6`}>{firstRoom.description}</p> */}
              <p className="text-gray-700 text-base max-w-[560px] mb-6">
                    {summarizeText(firstRoom.description)}
                  </p>
              {/* <ul className="flex flex-wrap gap-2 items-center justify-start my-4">
                {firstRoom.specifications?.slice(0, 4).map((specification: any, index: number) => (
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
                    <h3 className="text-[14px] text-black">{specification.name}</h3>
                  </li>
                ))}
              </ul> */}
               <Link
                  href={`pages/${firstRoom.slug.current}`} prefetch={true}
                  className="flex items-center mt-6 transition-all hover:translate-x-1 gap-2 border border-primary justify-center w-full lg:w-fit py-4 px-6">
                  <p className="block m-0 text-primary hover:underline">
                    View Details
                  </p>
                  <ArrowRight width={16} height={16} className="text-primary mt-[1px]"/>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomSection;
