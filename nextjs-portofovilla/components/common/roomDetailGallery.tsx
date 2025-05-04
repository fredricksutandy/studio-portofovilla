'use client';

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { ChevronLeft, ImageCopy, Close } from '@carbon/icons-react';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface GalleryImage {
  asset: {
    url: string;
    metadata?: {
      lqip: string;
    };
  };
}

interface GalleryGroup {
  category: string;
  images: GalleryImage[];
}

interface RoomImageProps {
  image: {
    asset: {
      url: string;
      metadata: {
        lqip: string;
      };
    };
  };
  gallery: GalleryGroup[];
}

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto("format").fit("max");

const RoomImage: React.FC<RoomImageProps> = ({ image, gallery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null); // To track the selected image
console.log(gallery);
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

  const allGalleryImages = gallery
  ?.flatMap(g => g.images)
  ?.filter(img => img?.asset?.url);

  // Initialize Splide only on mobile screens
  useEffect(() => {
    const splideInstance = new Splide(".splide", {
      type: "loop",
      heightRatio: 0.7,
      pagination: false,
      speed: 800,
      easing: 'ease-in-out',
      arrows: true,
      autoplay: true,
      interval: 3000,
    });
    
    splideInstance.mount();
    
    return () => {
      splideInstance.destroy();
    };
  }, []);

  return (
    <section
      className="relative max-w-[1296px] mx-auto w-full h-fit cursor-pointer"
    >
      <div className="flex flex-wrap gap-2 p-0 md:p-4 h-fit md:h-[460px] md:flex-row relative">

      <div className="px-5 py-2 bg-primary/80 text-white rounded-xl text-lg gap-2 font-montserrat font-semibold items-center hidden md:flex absolute bottom-6 right-6" onClick={openModal} >
        <ImageCopy width={20} height={20}/> {allGalleryImages.length}
      </div>

        <div className="splide splide-gallery md:hidden">
          <div className="splide__track">
            <ul className="splide__list" onClick={openModal}>
              {allGalleryImages.map((img: GalleryImage, index: number) => (
                <li key={index} className="splide__slide">
                  <Image
                    src={img.asset.url}
                    alt={`Room Image ${index + 1}`}
                    width={760}
                    height={450}
                    objectFit="cover"
                    className="rounded-0 md:rounded-md h-full object-cover"
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
          className="rounded-0 md:rounded-md w-full flex-1 md:max-w-[760px] h-full object-cover hidden md:flex"
          onClick={openModal}
        />
        <div className="hidden md:flex max-w-[540px] flex-wrap gap-2 flex-1 h-full items-stretch" onClick={openModal}>
          {allGalleryImages.slice(0, 4).map((img, index) => (
            <Image
              key={index}
              src={img.asset.url}
              alt={`Room Image ${index + 1}`}
              width={280}
              height={240}
              objectFit="cover"
              className="rounded-md w-[calc(50%-4px)] object-cover items-stretch h-[calc(50%-4px)]"
            />
          ))}
        </div>
      </div>

      {/* Modal for full gallery */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-[999] flex items-start justify-center overflow-auto pt-0 lg:pt-6"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <DialogPanel className="relative bg-white px-8 pb-8 w-full max-w-[1296px] mx-auto rounded-lg">
          <div className="flex gap-3 items-center sticky top-0 lg:-top-6 py-4 md:py-6 z-50 bg-white">
          <button
            onClick={closeModal}
            className="rounded p-2 h-fit hover:bg-neutral-200 bg-neutral-100 transition-all font-montserrat flex items-center gap-1"
          >
            <ChevronLeft  width={20} height={20} className=""/>
          </button>
          <DialogTitle className="text-xl md:text-3xl font-semibold font-krona">Foto kamar</DialogTitle>
          </div>
          
          {gallery?.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-xl md:text-2xl font-montserrat font-semibold mb-4">{group.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {group.images
                  ?.filter((img: GalleryImage) => img?.asset?.url)
                  .map((img: GalleryImage, imgIndex: number) => (
                    <div key={imgIndex} className="relative">
                      <Image
                        src={img.asset.url}
                        alt={`${group.category} image ${imgIndex + 1}`}
                        width={500}
                        height={300}
                        className="rounded-lg w-full h-[300px] object-cover cursor-pointer transition-all hover:opacity-80"
                        placeholder="blur"
                        blurDataURL={img.asset.metadata?.lqip || undefined}
                        onClick={() => openFullScreenModal(img.asset.url)} // If modal is grouped-aware
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </DialogPanel>
      </Dialog>

      {/* Full-Screen Modal */}
      <Dialog
        open={isFullScreenModalOpen}
        onClose={closeFullScreenModal}
        className="fixed inset-0 z-[1000] flex items-start justify-center"
      >
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-70" />
        <DialogPanel className="relative bg-neutral-600/80 p-6 w-full h-full mx-auto flex justify-center items-center flex-col" onClick={closeFullScreenModal}>
          <button
            onClick={closeFullScreenModal}
            className="text-white rounded-full text-base absolute left-1/2 -translate-x-1/2 top-auto bottom-6 md:bottom-auto md:top-6 p-2 bg-red-800 transition-all flex gap-1 items-center font-montserrat"
          >
            <Close width={20} height={20}/> 
          </button>
          {selectedImage && (
            <div className="relative">
              <Image
                src={selectedImage}
                alt="Full-Screen Room Image"
                width={1340}
                height={960}
                objectFit="contain" // Use contain to ensure the image is fully visible
                className="rounded-lg w-auto flex h-full max-h-[80vh]"
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
