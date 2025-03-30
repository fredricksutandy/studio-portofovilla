"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import Image from "next/image";
import ExpandableSection from "../../components/common/Expandable";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => {
  return source ? builder.image(source).auto("format").fit("max").url() : "";
};

const OTHER_ACTIVITIES_QUERY = `*[_type == "otherActivities"][0]`;

const ActivitiesSection = () => {
  const [activitiesData, setActivitiesData] = useState<SanityDocument | null>(
    null
  );

  useEffect(() => {
    const fetchActivitiesData = async () => {
      const data = await client.fetch<SanityDocument>(OTHER_ACTIVITIES_QUERY);
      setActivitiesData(data);
    };

    fetchActivitiesData();
  }, []);

  if (!activitiesData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-[1296px] mx-auto relative">
      <h2 className="text-2xl font-semibold text-start mb-8">
        Kegiatan sekitar lainnya
      </h2>

      <ExpandableSection maxHeight="300px">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {activitiesData.attractions.map((category: any, index: number) => (
            <div key={index} className="flex flex-col gap-4">
              {/* Kategori / Tema */}
              <div className="flex items-center gap-2">
                <Image
                  src={urlFor(category.icon)}
                  alt="Category Icon"
                  width={24}
                  height={24}
                  className="w-5 h-5 object-cover"
                />
                <h4 className="text-base font-medium">{category.category}</h4>
              </div>

              {/* Daftar Tempat di dalam kategori */}
              <div className="flex flex-col">
                {category.places.map((place: any, placeIndex: number) => (
                  <div
                    key={placeIndex}
                    className="flex justify-between items-center py-4 border-b border-graymuted"
                  >
                    <h3 className="text-sm">{place.name}</h3>
                    <span className="text-sm flex items-center gap-2">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ExpandableSection>
    </section>
  );
};

export default ActivitiesSection;
