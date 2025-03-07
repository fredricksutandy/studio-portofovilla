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
      className={`fixed top-0 left-0 w-full z-50 ${
        isMenuOpen
          ? 'bg-white text-black border-b border-b-graymuted' // Menu open styles
          : isScrolled
          ? 'bg-white text-black border-b border-b-graymuted' // Scrolled styles
          : 'bg-transparent text-white' // Default styles
      }`}
    >
      <AnnouncementBanner />
      <div className={`max-w-[1296px] mx-auto flex items-center justify-between p-4 transition-colors duration-500 relative z-40 `}>
      <Link href="/">
          <Image src={portofovillalogomono} alt='logo' width={80} className={` ${
              isScrolled ? 'invert' : '' } ${
              isMenuOpen ? 'invert' : '' }`}/>
          </Link>

        {/* Burger Icon (visible on mobile) */}
        <button
          className={`lg:hidden focus:outline-none rounded transition-colors ${
            isMenuOpen ? 'bg-neutral-100' : 'bg-transparent'
          }`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? <Close className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          {/* <li>
            <Link href="#room">
              <p className="hover:underline">Room</p>
            </Link>
          </li>
          <li>
            <Link href="#about">
              <p className="hover:underline">About</p>
            </Link>
          </li>
          <li>
            <Link href="#services">
              <p className="hover:underline">Services</p>
            </Link>
          </li>
          <li>
            <Link href="#activities">
              <p className="hover:underline">Activities</p>
            </Link>
          </li>
          <li>
            <Link href="#testimonies">
              <p className="hover:underline">Testimonies</p>
            </Link>
          </li>
          <li>
            <Link href="#faq">
              <p className="hover:underline">FAQ</p>
            </Link>
          </li>
          <li>
            <Link href="#gallery">
              <p className="hover:underline">Gallery</p>
            </Link>
          </li>
          <li>
            <Link href="#contact">
              <p className="hover:underline">Contact</p>
            </Link>
          </li> */}
        </ul>
        <Link href="#contact" className={`hidden lg:flex font-semibold gap-2 p-3 ${ isScrolled ? `bg-secondary text-white` : `bg-white text-black` } text-[14px] rounded items-center`}>
          <Image src={WaLogo} alt='WAlogo' width={20} height={20}/>
          Hubungi kami
        </Link>
        
      </div>

      {/* Mobile Menu */}
      <div
          className={`p-4 left-0 w-full flex flex-col gap-4 shadow-2xl justify-between h-full bg-white/70 backdrop-blur-lg text-black transition-transform duration-700 border-t border-graymuted ${
            isMenuOpen ? 'flex' : 'hidden'
          } lg:hidden z-40`}
        >
          <div className="flex flex-col gap-4">
          {quickLinks.map(({ name, href }, index) => (
              <Link
                key={href}
                href={href}
                className="hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
          {/* <Link href="/">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Room
              </p>
            </Link>
            <Link href="#about">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                About
              </p>
            </Link>
            <Link href="#services">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>Services</p>
            </Link>
            <Link href="#activities">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Activities
              </p>
            </Link>
            <Link href="#testimonies">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
              Testimonies
              </p>
            </Link>
            <Link href="#faq">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </p>
            </Link>
            <Link href="#gallery">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Gallery
              </p>
            </Link>
            <Link href="#contact">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
              Contact
              </p>
            </Link> */}
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

