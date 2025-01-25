'use client';

import { useEffect, useState } from "react";
import type { SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const ANNOUNCEMENT_QUERY = `*[_type == "announcementBanner"][0]`;

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [announcementData, setAnnouncementData] = useState(null);
    
      useEffect(() => {
        const fetchAnnouncementData = async () => {
          const data = await client.fetch<SanityDocument>(ANNOUNCEMENT_QUERY);
          setAnnouncementData(data);
        };
    
        fetchAnnouncementData();
      }, []);
  
    if (!announcementData) {
      return (
      <div className="p-4">
        <div className="h-80 bg-neutral-200 rounded flex items-center justify-center">Loading...</div>
      </div>
      );
    }

  if (!isVisible) return null;

  return (
    <div
      className="w-full z-50 bg-[#7cc097] text-black flex items-center justify-center py-3 px-4 pe-8 bg-announcement-bg"
    >
      <div className="flex items-center gap-4">
        <p className="text-sm text-white font-normal text-center">{announcementData.announcementTitle} available until  <span className="text-sm font-semibold"> {announcementData.date}</span></p>
        <p className="text-sm font-semibold"> </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 text-lg font-bold text-white hover:text-neutral-200 focus:outline-none"
      >
        ×
      </button>
    </div>
  );
};

export default AnnouncementBanner;
