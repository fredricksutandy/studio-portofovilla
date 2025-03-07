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
    <section className="max-w-full mx-auto bg-white py-10 md:py-[144px] px-4 md:px-6 overflow-hidden relative" id="gallery">

      <div className="w-full px-4 flex justify-between items-end flex-wrap mx-auto max-w-[1296px] mb-10">
        <div className='mb-4 md:mb-0 mx-auto md:mx-0'>
          <h2 className="text-center md:text-start font-krona text-2xl lg:text-4xl text-primary font-semibold mb-2">
            {galleryData.title}
          </h2>
          <p className="text-center md:text-start text-lg text-gray-600 font-medium max-w-[460px]">
            {galleryData.subtitle}
          </p>
        </div>
        <ButtonWa 
          link={galleryData.galleryButtonUrl}
          text={galleryData.galleryButton}
          type="white" // or "green"
          iconType={InstagramIcon.src} radius={'lg'} width={'fit'} displayMobile={true} displayDesktop={true}/>
      </div>
      <SplideComponent data={swiperData1} autoScrollSpeed={0.3} />
      <SplideComponent data={swiperData2} autoScrollSpeed={0.3} reverse={true} />

    </section>
  );
};

export default GalleryPage;
