'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WaLogo from '../../public/logos_whatsapp-icon.svg'
import { client } from "@/sanity/client"; 
import type { SanityDocument } from "next-sanity";

const FloatingButton = () => {
  // Sanity query to fetch the 'contact' document
  const CONTACT_QUERY = `*[_type == "contact"][0]{ whatsappURL }`;

  const [contactData, setContactData] = useState<{ whatsappURL?: string } | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await client.fetch<SanityDocument>(CONTACT_QUERY);
        setContactData(data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContactData();
  }, []);

  if (!contactData || !contactData.whatsappURL) {
    return null; // Prevent rendering until data is loaded
  }

  return (
    <Link
        href={contactData.whatsappURL} 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 rounded-lg bg-[#06C755] flex items-center justify-center p-4 md:p-6 z-30 hover:scale-90 transition-all"
    >
        <Image src={WaLogo} alt="logo" width={24} className="" />
    </Link>
  );
};

export default FloatingButton;
