'use client';

import { useEffect, useState } from 'react';
import SplideComponent from '../../components/common/GallerySwiperltr'; // Import the Splide component
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import ButtonWa from '../../components/common/ButtonWa';
import InstagramIcon from '../../public/instagram-ico.svg'

const builder = imageUrlBuilder(client);

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
    return <div>Loading...</div>;
  }

  const swiperData1 = galleryData.galleryImages.slice(0, 5);
  const swiperData2 = galleryData.galleryImages.slice(5, 10);

  return (
    <section className="max-w-full mx-auto bg-[#fff] py-24 px-4 overflow-hidden relative" id="gallery">

      <SplideComponent data={swiperData1} autoScrollSpeed={0.3} />
      <SplideComponent data={swiperData2} autoScrollSpeed={0.3} reverse={true} />

      <div className=" w-fit flex justify-center flex-col flex-wrap mt-6 items-center mx-auto">
      <h2 className="font-krona text-2xl lg:text-4xl text-[#1A520F] font-semibold mb-4">
          {galleryData.title}
        </h2>
        <h2 className="text-lg text-gray-600 font-medium mb-10 max-w-[460px]">
          {galleryData.subtitle}
        </h2>
        <ButtonWa 
          link={galleryData.galleryButtonUrl}
          text={galleryData.galleryButton}
          type="white" // or "green"
          iconType={InstagramIcon.src} radius={'lg'} width={'fit'} displayMobile={true} displayDesktop={true}/>
      </div>
    </section>
  );
};

export default GalleryPage;
