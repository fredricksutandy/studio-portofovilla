'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

import ButtonWa from '../../components/common/ButtonWa';

import InstagramIcon from '../../public/instagram-ico.svg'

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => {
  return source ? builder.image(source).auto('format').fit('max').url() : '';
};

const GALLERY_QUERY = `*[_type == "gallery"][0]`;

const GalleryPage = () => {
  const [galleryData, setGalleryData] = useState<Gallery | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      const data = await client.fetch<Gallery>(GALLERY_QUERY);
      setGalleryData(data);
    };

    fetchGalleryData();
  }, []);

  if (!galleryData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="max-w-[1296px] mx-auto bg-[#fff] py-10 md:py-[80px] px-4" id="gallery">
      <div className="grid md:auto-rows-[1fr] grid-cols-2 md:grid-cols-3 gap-2 max-w-[1296px] mx-auto">
        {galleryData.galleryImage?.slice(0, 3).map((item, index) => (
          <Image
            loading="lazy"
            key={index}
            src={urlFor(item.galleryImage).toString()}
            alt={`gallery image` + index}
            width={540}
            height={330}
            className="row-span-1 group/bento hover:shadow-xl transition flex flex-col items rounded h-[180px] md:h-[310px] object-cover"
          />
        ))}

        {galleryData.galleryImage[4] && (
          <Image
            loading="lazy"
            src={urlFor(galleryData.galleryImage[4].galleryImage).toString()}
            alt={`Gallery image 5`}
            width={840}
            height={330}
            className="row-span-1 group/bento hover:shadow-xl flex flex-col space-y-4 md:col-span-2 rounded h-[180px] md:h-[310px] object-cover w-full"
          />
        )}
        {galleryData.galleryImage[5] && (
          <Image
            loading="lazy"
            src={urlFor(galleryData.galleryImage[5].galleryImage).toString()}
            alt={`Gallery image 6`}
            width={540}
            height={330}
            className="row-span-1 group/bento hover:shadow-xl transition flex flex-col items rounded h-[180px] md:h-[310px] object-cover"
          />
        )}

        {galleryData.galleryImage[6] && (
          <Image
            loading="lazy"
            src={urlFor(galleryData.galleryImage[6].galleryImage).toString()}
            alt={`Gallery image 6`}
            width={540}
            height={330}
            className="row-span-1 group/bento hover:shadow-xl transition flex flex-col items rounded h-[180px] md:h-[310px] object-cover"
          />
        )}

        {galleryData.galleryImage[7] && (
          <Image
            loading="lazy"
            src={urlFor(galleryData.galleryImage[7].galleryImage).toString()}
            alt={`Gallery image 5`}
            width={840}
            height={330}
            className="row-span-1 col-span-2 group/bento hover:shadow-xl flex flex-col space-y-4 md:col-span-2 rounded h-[180px] md:h-[310px] object-cover w-full"
          />
        )}
        
      </div>

      <div className="flex justify-end md:justify-between flex-wrap mt-6 items-start">
        <h2 className="text-xl md:text-3xl text-black font-medium flex w-full md:w-fit mb-6 md:mb-0">
          {galleryData.subtitle}
        </h2>
        <ButtonWa 
          link={galleryData.galleryUrl}
          text="See other story"
          type="white"
          iconType={InstagramIcon.src} 
          radius={"lg"} 
          width={"fit"} 
          displayMobile={true} 
          displayDesktop={true}          
          />
      </div>
    </section>
  );
};

export default GalleryPage;
