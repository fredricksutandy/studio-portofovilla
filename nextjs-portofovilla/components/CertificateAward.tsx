'use client';

import { useEffect, useState } from "react";
import { client } from "@/sanity/client"; // Adjust the import as per your file structure
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";

// Initialize image builder
const builder = imageUrlBuilder(client);

// Helper to generate optimized image URLs
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// Sanity query to fetch the 'about' document
const CERTIFICATE_AWARD_QUERY = `*[_type == "certificate"][0]{
  title,
  subtitle,
  slug,
  certificates[]{
    certificateName,
    "certificateImage": certificateImage.asset->url
  }
}`;


const CertificateAwardSection = () => {
  const [certifAwardData, setCertifAwardData] = useState<any>(null);

  useEffect(() => {
    const fetchCTAData = async () => {
      const data = await client.fetch<SanityDocument>(CERTIFICATE_AWARD_QUERY);
      setCertifAwardData(data);
    };

    fetchCTAData();
  }, []);

  if (!certifAwardData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section className="flex justify-between flex-col lg:flex-row max-w-[1296px] mx-auto bg-white px-4 py-[144px] gap-4 lg:gap-8">
      <div className="flex flex-col lg:flex-row  items-center gap-10">
      <div className="w-full lg:w-[calc(60%-12px)]">
      <h2 className="font-krona text-base text-primary font-medium mb-2">{certifAwardData.title}</h2>

      <h3 className="font-medium text-xl max-w-[600px]">
        {certifAwardData.subtitle}
      </h3>
      </div>

        <div className="flex gap-2 justify-center sm:justify-end flex-wrap w-full lg:w-[calc(40%-12px)] md:min-w-[470px]">
          {certifAwardData.certificates?.map((cert, index) => (
            <Image
              key={index}
              src={cert.certificateImage}
              alt={cert.certificateName}
              width={600}
              height={600}
              className="d-flex flex-1 min-w-[100px] md:min-w-[150px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateAwardSection;
