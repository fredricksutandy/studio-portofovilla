'use client';

import { useEffect, useState } from 'react';
import SplideComponent from '../../components/common/GallerySwiperltr'; // Import the Splide component
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
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

  const swiperData1 = galleryData.galleryImage.slice(0, 5); // Data for first carousel
  const swiperData2 = galleryData.galleryImage.slice(5, 10); // Data for second carousel

  return (
    <section className="max-w-full mx-auto bg-[#fff] py-24 px-4 overflow-hidden relative" id="gallery">
      {/* First Splide Component */}
      <SplideComponent data={swiperData1} autoScrollSpeed={0.3} />

      {/* Second Splide Component with reverse direction */}
      <SplideComponent data={swiperData2} autoScrollSpeed={0.3} reverse={true} />

      {/* Button or additional content */}
      <div className=" w-fit flex justify-center flex-col flex-wrap mt-6 items-center mx-auto">
        <h2 className="text-xl md:text-4xl text-black font-medium flex w-fit mb-6">
          {galleryData.subtitle}
        </h2>
        <ButtonWa 
          link={galleryData.galleryUrl}
          text="See other story"
          type="white" // or "white"
          iconType={InstagramIcon.src} radius={'lg'} width={'fit'} displayMobile={true} displayDesktop={true}          />
      </div>
    </section>
  );
};

export default GalleryPage;
