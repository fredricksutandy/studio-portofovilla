'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/client"; 
import imageUrlBuilder from '@sanity/image-url';
import gsap from "gsap";
import { Close, Menu, ChevronDown, ArrowRight } from '@carbon/icons-react';
import { usePathname } from 'next/navigation';


import portofovillalogomono from '../../public/portofovilla logo mono.svg';
import leafroom from '../../public/leaf-room-placeholder.png';
import WaLogo from '../../public/logos_whatsapp-icon.svg';

import AnnouncementBanner from "../common/AnnouncementBanner";
import { quickLinks } from "../../src/constant/link";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

// ---------------------------
// Queries
// ---------------------------
const ROOM_QUERY = `*[_type == "room"] {
  _id,
  roomName,
  slug,
  image
}`;



const CONTACT_QUERY = `*[_type == "multipleContact"][0]{ phoneInfo }`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [contact, setContact] = useState<string>("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hoveredImage, setHoveredImage] = useState(leafroom);
  const [currentImage, setCurrentImage] = useState(leafroom);

  const imgRef = useRef<HTMLImageElement>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';
  // ---------------------------
  // Scroll & Outside Click Effects
  // ---------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsRoomsOpen(false);
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 0);
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
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
        gsap.to(imgRef.current!, { opacity: 1, duration: 0.4 });
      },
    });
  }, [hoveredImage, currentImage]);

  // ---------------------------
  // hash removal function and 
  // ---------------------------
  useEffect(() => {
    if (isHome && window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
  
      setTimeout(() => {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }, 800); // Delay to match scroll timing
    }
  }, [isHome]);
  

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

  // ---------------------------
  // Render
  // ---------------------------
  function removeHashFromUrl(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      setTimeout(() => {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }, 500); // Adjust to match your scroll duration
    }
  }
  

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isMenuOpen || isRoomsOpen || isScrolled ? 'bg-white text-black border-b border-graymuted' : 'bg-transparent text-white'
      }`}
    >
      <AnnouncementBanner />
      <div className={`max-w-[1296px] relative mx-auto flex items-center justify-between p-4 z-[80] `}>
        {/* Logo */}
        <Link href="/">
          <Image
            src={portofovillalogomono}
            alt="logo"
            width={80}
            className={`${isScrolled || isRoomsOpen || isMenuOpen ? 'invert' : ''}`}
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden focus:outline-none rounded transition-colors"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <Close className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6">
        {quickLinks.map(({ name, href }) => {
  const isHashLink = href.includes('#');
  const adjustedHref = isHome && isHashLink && href.startsWith('/#') ? href.replace('/', '') : href;

  return name === "Rooms" ? (
    <li key={href} className="relative">
      <button
        onClick={() => setIsRoomsOpen(prev => !prev)}
        className="hover:underline flex items-center gap-2"
      >
        Rooms <ChevronDown className={`w-4 h-4 transition-transform ${isRoomsOpen ? 'rotate-180' : ''}`} />
      </button>
    </li>
  ) : (
    <li key={href}>
      {isHashLink && isHome ? (
        <a
          href={adjustedHref}
          className="hover:underline"
          onClick={removeHashFromUrl}
        >
          {name}
        </a>
      ) : (
        <Link href={adjustedHref} className="hover:underline">
          {name}
        </Link>
      )}
    </li>
  );
})}

        </ul>

        {/* Contact Button (Desktop) */}
        {contact && (
          <Link
            href={contact}
            className={`hidden lg:flex font-semibold gap-2 p-3 ${
              isMenuOpen || isRoomsOpen || isScrolled ? 'bg-secondary text-white' : 'bg-white text-black'
            } text-sm rounded items-center`}
          >
            <Image src={WaLogo} alt="WAlogo" width={20} height={20} />
            Hubungi kami
          </Link>
        )}
      </div>

      <div
  className={`
     w-full flex-col gap-4 shadow-2xl justify-between 
    bg-white/70 backdrop-blur-lg text-black z-[60] h-fit
    transition-all duration-500 ease-in-out
    transform ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible max-h-[900px]' : 'opacity-0 -translate-y-2 pointer-events-none invisible max-h-0'}
    lg:hidden
  `}
  style={{ transitionProperty: 'opacity, transform' }}
>
        <div className="flex flex-col gap-6 p-4">
        {quickLinks.map(({ name, href }) => {
  const isHashLink = href.includes('#');
  const adjustedHref = isHome && isHashLink && href.startsWith('/#') ? href.replace('/', '') : href;

  return name === "Rooms" ? (
    <div key={href}>
      <button
        onClick={() => setIsRoomsOpen(prev => !prev)}
        className="text-lg flex items-center gap-2 w-full"
      >
        Rooms <ChevronDown className={`w-4 h-4 transition-transform ${isRoomsOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`transition-all overflow-hidden flex flex-col gap-4 border-b border-[#d9d9d9] ${
          isRoomsOpen ? 'max-h-fit opacity-100 pb-6 mt-4' : 'max-h-0 opacity-0 pb-0 mt-0'
        }`}
      >
        {rooms.map((room) => (
          <Link
            key={room.slug.current}
            href={`/pages/${room.slug.current}`}
            className="flex items-center gap-4"
            onClick={() => setIsMenuOpen(false)}
          >
            {room.roomName}
            <ArrowRight className="w-4 h-4 mt-[2px]" />
          </Link>
        ))}
      </div>
    </div>
  ) : isHashLink && isHome ? (
    <a
      key={href}
      href={adjustedHref}
      className="text-lg hover:underline"
      onClick={(e) => {
        removeHashFromUrl(e);
        setIsMenuOpen(false);
      }}
    >
      {name}
    </a>
  ) : (
    <Link
      key={href}
      href={adjustedHref}
      className="text-lg hover:underline"
      onClick={() => setIsMenuOpen(false)}
    >
      {name}
    </Link>
  );
})}

        </div>

        {/* Mobile Contact */}
        <div className="p-4">
        {contact && (
          <Link
            href={contact}
            className="w-full flex font-semibold gap-2 p-4 justify-center bg-secondary text-white text-sm rounded items-center"
          >
            <Image src={WaLogo} alt="WAlogo" width={20} height={20} />
            Hubungi kami
          </Link>
        )}
        </div>
      </div>

      {/* Dropdown Menu (Desktop) */}
      <div
        className={`
          w-full gap-10 bg-white overflow-hidden
          absolute left-0 right-0 z-50
          transition-all duration-500 ease-in-out border-b border-[#d9d9d9]
          ${isRoomsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={{
          transitionProperty: 'opacity, transform',
        }}
      >
        <div className="max-w-[1296px] flex justify-center mx-auto gap-8 px-4 pb-6 pt-8">
        <div className="flex flex-col gap-6 w-[calc(50%-20px)]">
          <a href="#room" className="text-xl font-semibold font-krona text-primary underline">Kamar kami</a>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            <div className="w-[calc(50%-12px)] border-t border-graymuted" />
            <div className="w-[calc(50%-12px)] border-t border-graymuted" />
            {rooms.map((room) => (
              <Link
                key={room.slug.current}
                href={`/pages/${room.slug.current}`}
                className="w-[calc(50%-12px)] text-black flex items-center gap-2 group hover:translate-x-2 transition-all duration-500"
                onMouseEnter={() =>
                  setHoveredImage(room.image ? urlFor(room.image).width(500).height(300).url() : "")
                }
              >
                {room.roomName}
                <ArrowRight className="w-4 h-4 mt-[1px] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Image Preview */}
        <div className="relative w-[calc(50%-20px)] h-[300px] overflow-hidden bg-primary/70 rounded-lg">
          <Image
            ref={imgRef}
            src={currentImage}
            alt="Room Preview"
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
