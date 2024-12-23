'use client';

import React, { useEffect, useState, useRef } from "react";
import { client } from "@/sanity/client";
import Image from 'next/image';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import imageUrlBuilder from "@sanity/image-url";

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

interface RoomImageProps {
  image: any; // Main image for the room
  gallery: any[]; // List of other images for the room
}

const RoomImage: React.FC<RoomImageProps> = ({ image, gallery }) => {
  const [room, setRoom] = useState<any>(null); // State to hold room data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const splideRef = useRef<Splide | null>(null); // Reference for Splide

  // Initialize Splide carousel for gallery
  useEffect(() => {
    if (!room?.gallery || splideRef.current) return; // Only run if gallery exists and Splide isn't initialized

    const splide = new Splide('.splide-gallery', {
      type       : 'fade',   // Use fade for smooth transitions
      heightRatio: 0.5,       // Adjust height ratio
      pagination: false,      // Disable pagination
      arrows    : false,      // Disable default arrows
      autoplay : true,        // Enable autoplay
      interval : 3000,        // Set interval for auto-slide
    }).mount();

    splideRef.current = splide;

    return () => {
      splide.destroy();  // Clean up on unmount
    };
  }, [room?.gallery]);

  const openModal = () => setIsModalOpen(true); // Open modal
  const closeModal = () => setIsModalOpen(false); // Close modal

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative max-w-[1296px] mx-auto w-full h-fit">
      {/* Main image for the room */}
      <div onClick={openModal} className="cursor-pointer flex gap-4 p-4 h-fit">
        <Image
          src={urlFor(room.image).url()}
          alt="Room Main Image"
          width={760}
          height={450}
          objectFit="cover"
          placeholder="blur"
          blurDataURL={room.image.asset.metadata.lqip} // Use LQIP as the placeholder
          className="rounded-0 md:rounded-lg md:max-w-[760px] h-full object-cover"
        />
      </div>

      {/* Gallery images below the main image */}
      <div className="splide splide-gallery mt-4">
        <div className="splide__track">
          <ul className="splide__list">
            {room.gallery.map((img: any, index: number) => (
              <li className="splide__slide" key={index}>
                <Image
                  src={urlFor(img).url()}
                  alt={`Gallery Image ${index + 1}`}
                  width={760}
                  height={450}
                  objectFit="cover"
                  className="rounded-0 md:rounded-lg h-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal to display clicked image in full screen */}
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 p-2 text-white bg-gray-800 rounded-full"
            >
              X
            </button>
            <Image
              src={urlFor(room.image).url()}
              alt="Room Main Image Modal"
              width={960}
              height={600}
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default RoomImage;
