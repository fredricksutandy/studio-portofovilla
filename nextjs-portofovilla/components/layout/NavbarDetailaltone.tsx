'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/client"; 
import imageUrlBuilder from '@sanity/image-url';
// import type { SanityDocument } from "next-sanity";
import gsap from "gsap";
import { Close, Menu, ChevronDown, ArrowRight } from '@carbon/icons-react';

import portofovillalogomono from '../../public/portofovilla logo mono.svg';
import leafroom from '../../public/leaf-room-placeholder.png'
import WaLogo from '../../public/logos_whatsapp-icon.svg'

import { quickLinks } from "../../src/constant/link"; 

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// ---------------------------
// Queries
// ---------------------------
const ROOM_QUERY = `*[_type == "room"] {
  roomName,
  slug,
  image
}`;

const CONTACT_QUERY = `*[_type == "multipleContact"][0]{ phoneInfo }`;

const Navbar = () => {
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hoveredImage, setHoveredImage] = useState(leafroom);
  const [currentImage, setCurrentImage] = useState(leafroom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contact, setContact] = useState<string>("");

  const imgRef = useRef<HTMLImageElement>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // ---------------------------
  // Scroll & Outside Click Effects
  // ---------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsRoomsOpen(false); // Close the dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------------------
  // Image Transition (GSAP)
  // ---------------------------
  useEffect(() => {
  if (!hoveredImage || hoveredImage === currentImage || !imgRef.current) return;
    gsap.to(imgRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentImage(hoveredImage);
        gsap.to(imgRef.current, { opacity: 1, duration: 0.4 });
      },
    });
  }, [hoveredImage, currentImage]); 

  // ---------------------------
  // Fetch data from Sanity
  // ---------------------------
  const fetchData = useCallback(async () => {
    try {
      const [contactData, roomsData] = await Promise.all([
        client.fetch<ContactType>(CONTACT_QUERY),
        client.fetch<Room[]>(ROOM_QUERY),
      ]);
  
      setContact(contactData?.phoneInfo?.[0]?.phoneUrl ?? "");
      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
    if (!contact) {
      return <div>Loading...</div>; // Loading state
    }

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <nav
      ref={navRef}
      className="w-full z-[60] 
       bg-white text-black font-montserrat"
    >
    <div className="max-w-[1296px] mx-auto flex items-center justify-between p-4">

      <Link href="/">
        <Image src={portofovillalogomono} alt='logo' width={80} className="invert" />
      </Link>


      <button
        className="lg:hidden focus:outline-none rounded transition-colors"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
      >
        {isMenuOpen ? <Close className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex space-x-6">
        {quickLinks.map(({ name, href }) => (
          name === "Rooms" ? (
            <li key={href} className="relative">
              <button
                onClick={() => setIsRoomsOpen((prev) => !prev)}
                className="hover:underline flex items-center gap-2"
              >
                Rooms <ChevronDown className={`w-4 h-4 transition-transform ${isRoomsOpen ? 'rotate-180' : ''}`} />
              </button>
            </li>
          ) : (
            <li key={href}>
              <Link href={href} className="hover:underline">{name}</Link>
            </li>
          )
        ))}
      </ul>

      {/* Contact Button */}
      <Link href={contact} className="hidden lg:flex font-semibold gap-2 p-3 bg-secondary text-white
      text-[14px] rounded items-center">
        <Image src={WaLogo} alt='WAlogo' width={20} height={20} />
        Hubungi kami
      </Link>

      


    </div>
    {/* Mobile Menu */}
    <div
          className={`p-4 left-0 w-full absolute top-[61px] flex flex-col gap-4 shadow-2xl justify-between bg-white/70 backdrop-blur-lg text-black transition-transform duration-700 border-t border-graymuted z-50 h-fit ${
            isMenuOpen ? 'flex' : 'hidden'
          } lg:hidden z-[60]`}
        >
          <div className="flex flex-col gap-6">
            {quickLinks.map(({ name, href }) => (
              name === "Rooms" ? (
                <div key={href}>
                  <button onClick={() => setIsRoomsOpen((prev) => !prev)} className="text-lg flex items-center gap-2 w-full">
                    Rooms <ChevronDown className={`w-4 h-4 transition-transform ${isRoomsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Accordion Dropdown */}
                  <div className={`overflow-hidden flex justify-between gap-4 flex-col  border-b border-[#d9d9d9] transition-all duration-300 ${
                    isRoomsOpen ? 'max-h-fit opacity-100 pb-6 mt-4' : 'max-h-0 opacity-0 pb-0 mt-0'
                  }`}>
                    {rooms.map((room) => (
                      <Link className='flex gap-4 items-center' key={room.slug?.current || room._id} href={`/pages/${room.slug?.current}`}>
                      {room.roomName}
                      <ArrowRight width={16} height={16} className="transition-all mt-[2px]"/>
                    </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={href} href={href} className="hover:underline text-lg" onClick={() => setIsMenuOpen(false)}>
                  {name}
                </Link>
              )
            ))}
          </div>

          <Link href={contact} className={`w-full flex font-semibold gap-2 p-4 text-center justify-center bg-secondary text-white text-[14px] rounded items-center`}>
              <Image src={WaLogo} alt='WAlogo' width={20} height={20}/>
              Hubungi kami
            </Link>
        </div>

    {/* dropdown */}
    <div
      className={`w-full absolute top-[61px] border-b hidden bg-white mx-auto z-50
        ${isRoomsOpen ? "lg:block" : "hidden"}`}
    >

<div className="max-w-[1296px] mx-auto flex gap-10 justify-center px-4 py-6 mt-2">
<div className="flex w-[calc(50%-20px)] flex-col gap-6 overflow-hidden">
      <a href="#room" className="text-xl font-semibold font-krona text-primary underline">Kamar kami</a>
        <div className='flex flex-wrap gap-x-6 gap-y-4'>
          <div className='w-[calc(50%-12px)] border-t border-graymuted'></div>
          <div className='w-[calc(50%-12px)] border-t border-graymuted'></div>
        {rooms.map((room) => (
            <Link
              key={room.slug?.current || room._id}
              href={`/pages/${room.slug?.current}`}
              className="text-black flex group items-center rounded gap-2 transition-all duration-500 hover:translate-x-2 w-[calc(50%-12px)] group"
              onMouseEnter={() =>
                setHoveredImage(room.image ? urlFor(room.image).width(500).height(300).url() : "")
              }
            >

              {room.roomName}
              <ArrowRight width={16} height={16} className="transition-all duration-500 -translate-x-3 mt-[1px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0"/>
              

            </Link>
        ))}
  </div>
      {/* Right Side - Room Image */}
      
      </div>
        <div className="relative w-[calc(50%-20px)] h-[300px] overflow-hidden bg-primary/70 rounded-lg">
          <Image
            ref={imgRef}
            src={currentImage ?? leafroom}
            alt="Room Image"
            width={700}
            height={460}
            className="rounded-lg w-full h-full object-cover"
          />
      </div>
</div>
      
    </div>
  </nav>
  );
};

export default Navbar;

