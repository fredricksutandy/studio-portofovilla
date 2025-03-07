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
         // Menu open styles
          isScrolled
          ? 'bg-white text-black border-b border-b-graymuted' // Scrolled styles
          : 'bg-transparent text-white' // Default styles
      }`}
    >
      <AnnouncementBanner />
      <div className="max-w-[1296px] mx-auto flex items-center justify-between p-4">
      <Link href="/">
          <Image src={portofovillalogomono} alt='logo' width={80} className={` ${
              isScrolled ? 'invert' : '' } `}/>
          </Link>

          <Menu 
            className="lg:hidden focus:outline-none rounded cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle Menu" 
            width={24} 
            height={24}
          />

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
            <Link href="#facilities">
              <p className="hover:underline">Facilities</p>
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
        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 p-4 w-10/12 flex flex-col justify-between h-full bg-white text-black transition-all duration-700 border-t border-graymuted ${
            isMenuOpen ? 'translate-x-0 shadow-[-200px_0_50px_rgba(0,0,0,0.30)]' : 'translate-x-full shadow-[-20px_0_60px_rgba(0,0,0,0)]'
          } lg:hidden z-40`}
        >
          
          <div className="flex flex-col">
          {/* <Link href="/">
          <Image src={portofovillalogomono} alt='logo' width={80} className="invert"/>
          </Link> */}
         <Close 
            className={`lg:hidden text-lg ms-auto focus:outline-none rounded opacity-50 mb-4`}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Toggle Menu"
            width={24} 
            height={24}
          />
        <div className="flex flex-col">
            {quickLinks.map(({ name, href }, index) => (
              <Link
                key={href}
                href={href}
                className={`hover:underline py-4 ${
                  index !== 0 ? "border-t border-graymuted" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
          </div>
          {/* <Link href="/">
              <p className="hover:underline pb-4" onClick={() => setIsMenuOpen(false)}>
                Room
              </p>
            </Link>
            <Link href="#about">
              <p className="hover:underline border-t border-graymuted py-4" onClick={() => setIsMenuOpen(false)}>
                About
              </p>
            </Link>
            <Link href="#facilities">
              <p className="hover:underline border-t border-graymuted py-4" onClick={() => setIsMenuOpen(false)}>
                Facilities
              </p>
            </Link>
            <Link href="#services">
              <p className="hover:underline border-t border-graymuted py-4" onClick={() => setIsMenuOpen(false)}>Services</p>
            </Link>
            <Link href="#activities">
              <p className="hover:underline border-t border-graymuted py-4" onClick={() => setIsMenuOpen(false)}>
                Activities
              </p>
            </Link>
            <Link href="#testimonies">
              <p className="hover:underline border-t border-graymuted py-4" onClick={() => setIsMenuOpen(false)}>
              Testimonies
              </p>
            </Link>
            <Link href="#faq">
              <p className="hover:underline border-t border-graymuted py-4" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </p>
            </Link>
            <Link href="#gallery">
              <p className="hover:underline border-t border-graymuted py-4" onClick={() => setIsMenuOpen(false)}>
                Gallery
              </p>
            </Link>
            <Link href="#contact">
              <p className="hover:underline border-t border-graymuted py-4" onClick={() => setIsMenuOpen(false)}>
              Contact
              </p>
            </Link> */}
          </div>
          <Link href="#contact" className={`w-full flex font-semibold gap-2 px-4 py-6 text-center justify-center rounded bg-secondary text-white text-[14px] items-center`}>
              <Image src={WaLogo} alt='WAlogo' width={20} height={20}/>
              Hubungi kami
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

