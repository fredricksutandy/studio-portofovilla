'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import portofovillalogomono from '../../public/portofovilla logo mono.svg'
import WaLogo from '../../public/logos_whatsapp-icon.svg'
import { client } from "@/sanity/client"; 
import type { SanityDocument } from "next-sanity";
import AnnouncementBanner from "../../components/common/AnnouncementBanner";
import { quickLinks } from "../../src/constant/link"; 
import { Close, Menu } from '@carbon/icons-react';

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
    const CONTACT_QUERY = `*[_type == "contact"][0]`;
  
    const [contactData, setContactData] = useState<any>(null);
  
    useEffect(() => {
      const fetchContactData = async () => {
        const data = await client.fetch<SanityDocument>(CONTACT_QUERY);
        setContactData(data);
      };
  
      fetchContactData();
    }, []);
  
    if (!contactData) {
      return <div>Loading...</div>; // Loading state
    }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-700 ${
        isMenuOpen
          ? 'bg-white text-black border-b border-b-graymuted' // Menu open styles
          : isScrolled
          ? 'bg-white text-black border-b border-b-graymuted' // Scrolled styles
          : 'bg-transparent text-white' // Default styles
      }`}
    >
      <AnnouncementBanner />
      <div className="max-w-[1296px] mx-auto flex items-center justify-between p-4">
      <Link href="/">
          <Image src={portofovillalogomono} alt='logo' width={80} className={` ${
              isScrolled ? 'invert' : '' } ${
              isMenuOpen ? 'invert' : '' }`}/>
          </Link>

          <button
          className={`lg:hidden focus:outline-none rounded transition-colors ${
            isMenuOpen ? 'bg-neutral-100' : 'bg-transparent'
          }`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label='Open Menu'
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6">
        {quickLinks.map(({ name, href }, index) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:underline"
              >
                {name}
              </Link>
              
            </li>
          ))}
        </ul>
        <Link href="#contact" className={`hidden lg:flex font-semibold gap-2 p-3 ${ isScrolled ? `bg-secondary text-white` : `bg-white text-black` } text-[14px] rounded items-center`}>
          <Image src={WaLogo} alt='WAlogo' width={20} height={20}/>
          Hubungi kami
        </Link>

        {/* Mobile Menu */}
        <div
          className={`fixed p-4 left-0 w-full flex flex-col top-0 justify-between h-[100vh] bg-white text-black transition-transform duration-700 border-t border-graymuted ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden z-40`}
        >
          <div>
          <div className="mx-auto flex items-center justify-between w-full mb-10">
            <Link href="/">
                <Image src={portofovillalogomono} alt='logo' width={80} className={` ${
                    isScrolled ? 'invert' : '' } ${
                    isMenuOpen ? 'invert' : '' }`}/>
                </Link>

            <button
              className={`lg:hidden focus:outline-none rounded`}
              aria-label='Close Menu'
              onClick={() => setIsMenuOpen(false)}
            >
              <Close className="w-6 h-6" /> 
            </button>
          </div>

          <div className="flex flex-col gap-6">
          {quickLinks.map(({ name, href }, index) => (
              <Link
                key={href}
                href={href}
                className="hover:underline text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
          </div>
          </div>
          
          {/* Mobile Menu */}
        {/* <div
          className={`fixed top-[61px] p-4 left-0 w-full flex flex-col shadow-2xl justify-between h-[calc(100vh-61px)] bg-white text-black transition-transform duration-700 border-t border-graymuted ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden z-40`}
        >
          <div className="flex flex-col gap-4">
          {quickLinks.map(({ name, href }, index) => (
              <Link
                key={href}
                href={href}
                className="hover:underline text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))} */}
            <Link href="#contact" className={`w-full flex font-semibold gap-2 p-4 text-center justify-center bg-secondary text-white text-[14px] rounded items-center`}>
              <Image src={WaLogo} alt='WAlogo' width={20} height={20}/>
              Hubungi kami
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

