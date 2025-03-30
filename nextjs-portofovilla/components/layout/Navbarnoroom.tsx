'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import portofovillalogomono from '../../public/portofovilla logo mono.svg'
import leafroom from '../../public/leaf-room-placeholder.png'
import WaLogo from '../../public/logos_whatsapp-icon.svg'
import { client } from "@/sanity/client"; 
import type { SanityDocument } from "next-sanity";
import AnnouncementBanner from "../../components/common/AnnouncementBanner";
import { quickLinks } from "../../src/constant/link"; 
import { Close, Menu, ChevronDown, ArrowRight } from '@carbon/icons-react';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).auto('format').fit('max');

const ROOM_QUERY = `*[_type == "room"] {
  roomName,
  slug,
  image
}`;

const CONTACT_QUERY = `*[_type == "contact"][0]`;


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sanity query to fetch the 'contact' document
  
    const [contactData, setContactData] = useState<any>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [contactData, roomsData] = await Promise.all([
            client.fetch<SanityDocument>(CONTACT_QUERY),
            client.fetch(ROOM_QUERY)
          ]);
          
          setContactData(contactData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);
  
    if (!contactData) {
      return <div>Loading...</div>; // Loading state
    }

  return (
    <nav
    className={`fixed top-0 left-0 w-full z-50 ${
      isMenuOpen || isScrolled ? 'bg-white text-black border-b border-graymuted' : 'bg-transparent text-white'
    }`}
  >
    <AnnouncementBanner />
    <div className="max-w-[1296px] mx-auto flex items-center justify-between p-4">
      {/* Logo */}
      <Link href="/">
        <Image src={portofovillalogomono} alt='logo' width={80} className={`${isScrolled || isMenuOpen ? 'invert' : ''}`} />
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden focus:outline-none rounded transition-colors"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label='Open Menu'
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex space-x-6">
        {quickLinks.map(({ name, href }) => (
            <li key={href}>
              <Link href={href} className="hover:underline">{name}</Link>
            </li>
        ))}
      </ul>

      {/* Contact Button */}
      <Link href="#contact" className={`hidden lg:flex font-semibold gap-2 p-3 ${
         isMenuOpen || isScrolled ? 'bg-secondary text-white' : 'bg-white text-black'
      } text-[14px] rounded items-center`}>
        <Image src={WaLogo} alt='WAlogo' width={20} height={20} />
        Hubungi kami
      </Link>

      


    </div>
    {/* Mobile Menu */}
    <div
          className={`p-4 left-0 w-full flex flex-col gap-4 shadow-2xl justify-between h-full bg-white/70 backdrop-blur-lg text-black transition-transform duration-700 border-t border-graymuted ${
            isMenuOpen ? 'flex' : 'hidden'
          } lg:hidden z-40`}
        >
          <div className="flex flex-col gap-6">
            {quickLinks.map(({ name, href }) => (
              
                <Link key={href} href={href} className="hover:underline text-lg" onClick={() => setIsMenuOpen(false)}>
                  {name}
                </Link>
              
            ))}
          </div>

          <Link href="#contact" className={`w-full flex font-semibold gap-2 p-4 text-center justify-center bg-secondary text-white text-[14px] rounded items-center`}>
              <Image src={WaLogo} alt='WAlogo' width={20} height={20}/>
              Hubungi kami
            </Link>
        </div>
  </nav>
  );
};

export default Navbar;

