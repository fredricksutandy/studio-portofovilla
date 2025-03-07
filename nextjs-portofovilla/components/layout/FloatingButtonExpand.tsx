'use client';

import { useEffect, useState, Key } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WaLogo from '../../public/logos_whatsapp-icon.svg';
import { client } from "@/sanity/client"; 
import type { SanityDocument } from "next-sanity";
import { Phone, Close } from '@carbon/icons-react';

// Sanity query to fetch the 'multipleContact' document
const CONTACT_QUERY = `*[_type == "multipleContact"][0]{ phoneInfo }`;

const FloatingButton = () => {
  const [contactData, setContactData] = useState<{ phoneInfo?: { phoneNumber?: string; phoneName?: string; phoneUrl?: string }[] } | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Track whether the button is expanded

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

  if (!contactData || !contactData.phoneInfo) {
    return null; // Prevent rendering until data is loaded
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 z-30">
      {/* If isOpen, show all contact options */}
      {isOpen && (
        <div className="bg-white shadow-md rounded-lg flex flex-col transition-all overflow-hidden">
          {contactData.phoneInfo.map((phone, index) => (
  <Link
    key={index}
    href={phone.phoneUrl || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-2 p-4 hover:bg-green-100 transition-all ${
      index !== contactData.phoneInfo.length - 1 ? "border-b border-graymuted" : ""
    }`}
  >
    <Phone /> <span className="text-black text-sm">{phone.phoneName} - {phone.phoneNumber}</span>
  </Link>
))}
        </div>
      )}

      {/* Floating Button (Toggles the Menu) */}
      <button
        onClick={() => setIsOpen(!isOpen)} // Toggle the menu
        className="rounded-lg bg-[#06C755] flex items-center justify-center p-4 md:p-6 hover:scale-90 transition-all"
      >
        {isOpen ? <Close size={24} color="white" /> : <Image src={WaLogo} alt="logo" width={24} />}
      </button>
    </div>
  );
};

export default FloatingButton;
