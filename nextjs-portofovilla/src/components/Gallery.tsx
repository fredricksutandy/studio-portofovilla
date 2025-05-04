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

  const totalImages = galleryData.galleryImages.length;
  const midPoint = Math.ceil(totalImages / 2); // Using ceil to handle odd numbers
  const swiperData1 = galleryData.galleryImages.slice(0, midPoint);
  const swiperData2 = galleryData.galleryImages.slice(midPoint, totalImages);

  return (
    <section className="max-w-full mx-auto bg-white py-20 md:py-[120px] px-4 md:px-6 overflow-hidden relative" id="gallery">

      
      <SplideComponent data={swiperData1} autoScrollSpeed={0.3} />
      <SplideComponent data={swiperData2} autoScrollSpeed={0.3} reverse={true} />
<div className="w-full px-4 flex justify-between items-end flex-wrap mx-auto max-w-[1296px] mt-10">
        <div className='mb-4 md:mb-0 mx-auto md:mx-0'>
          <h2 className="text-center md:text-start font-krona text-2xl lg:text-3xl text-primary font-medium mb-2">
            {galleryData.title}
          </h2>
          <p className="text-center md:text-start text-base text-gray-700 max-w-[460px]">
            {galleryData.subtitle}
          </p>
        </div>
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
