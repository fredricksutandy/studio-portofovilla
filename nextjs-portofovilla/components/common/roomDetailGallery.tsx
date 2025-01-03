'use client';

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto("format").fit("max");

interface RoomImageProps {
  image: any; // Main image for the room
  gallery: any[]; // List of other images for the room
}

const RoomImage: React.FC<RoomImageProps> = ({ image, gallery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null); // To track the selected image

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openFullScreenModal = (img: any) => {
    setSelectedImage(img); // Set the clicked image to show in full screen
    setIsFullScreenModalOpen(true); // Open the full-screen modal
  };

  const closeFullScreenModal = () => {
    setIsFullScreenModalOpen(false);
    setSelectedImage(null); // Reset selected image
  };

  // Initialize Splide only on mobile screens
  useEffect(() => {
    const splideInstance = new Splide(".splide", {
      type: "fade",
      heightRatio: 0.5,
      pagination: false,
      arrows: true,
      autoplay: true,
      interval: 3000,
    }).mount();

    return () => splideInstance.destroy(); // Cleanup on unmount
  }, []);

  return (
    <section
      className="relative max-w-[1296px] mx-auto w-full h-fit cursor-pointer"
      onClick={openModal}
    >
      {/* Gallery images (desktop) */}
      <div className="flex flex-wrap gap-4 p-0 md:p-4 h-[460px] md:flex-row">
        <div className="splide splide-gallery md:hidden">
          <div className="splide__track">
            <ul className="splide__list">
              {gallery.map((img, index) => (
                <li key={index} className="splide__slide">
                  <Image
                    src={urlFor(img).url()}
                    alt={`Room Image ${index + 1}`}
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
        <Image
          src={urlFor(image).url()}
          alt="Room Main Image"
          width={760}
          height={450}
          objectFit="cover"
          placeholder="blur"
          blurDataURL={image.asset.metadata.lqip}
          className="rounded-0 md:rounded-lg w-full flex-1 md:max-w-[760px] h-full object-cover hidden md:flex"
        />
        <div className="hidden md:flex max-w-[540px] flex-wrap gap-4">
          {gallery.slice(0, 4).map((img, index) => (
            <Image
              key={index}
              src={urlFor(img).url()}
              alt={`Room Image ${index + 1}`}
              width={280}
              height={240}
              objectFit="cover"
              className="rounded-lg w-[calc(50%-8px)] object-cover h-[206px]"
            />
          ))}
        </div>
      </div>

      {/* Modal for full gallery */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-[999] flex items-start justify-center overflow-auto py-4"
      >
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogPanel className="relative bg-white p-8 w-full max-w-[1296px] mx-auto rounded-lg">
        <button
            onClick={closeModal}
            className="text-neutral-700 rounded mb-4 p-2 hover:bg-neutral-200 transition-all bg-white sticky -top-[20px] z-[999]"
          >
            Kembali
          </button>
          <DialogTitle className="text-5xl font-semibold mb-6">Foto kamar</DialogTitle>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  src={urlFor(img).url()}
                  alt={`Room Image ${index + 1}`}
                  width={500}
                  height={300}
                  loading="lazy"
                  objectFit="cover"
                  className="rounded-lg w-full h-full object-cover cursor-pointer transition-all hover:opacity-80"
                  blurDataURL={image.asset.metadata.lqip}
                  placeholder="blur"
                  onClick={() => openFullScreenModal(img)} // Open full-screen modal
                />
              </div>
            ))}
          </div>
        </DialogPanel>
      </Dialog>

      {/* Full-Screen Modal */}
      <Dialog
        open={isFullScreenModalOpen}
        onClose={closeFullScreenModal}
        className="fixed inset-0 z-[1000] flex items-start justify-center"
      >
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-70" />
        <DialogPanel className="relative bg-neutral-600 p-6 w-full h-full mx-auto rounded-lg flex justify-center items-center flex-col">
          <button
            onClick={closeFullScreenModal}
            className="text-white rounded-full text-xl absolute left-6 top-6 px-6 pt-2 pb-3 hover:bg-neutral-700 transition-all flex justify-center items-center"
          >
            &times; Tutup
          </button>
          {selectedImage && (
            <div className="relative">
              <Image
                src={urlFor(selectedImage).url()}
                alt="Full-Screen Room Image"
                width={1200} // or whatever is appropriate for full-screen
                height={800}
                objectFit="contain" // Use contain to ensure the image is fully visible
                className="rounded-lg w-auto h-auto max-h-[75 vh]"
                loading="lazy"
                blurDataURL={image.asset.metadata.lqip}
                placeholder="blur"
              />
            </div>
          )}
        </DialogPanel>
      </Dialog>
    </section>
  );
};

export default RoomImage;
