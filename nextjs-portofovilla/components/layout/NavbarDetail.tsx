"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import portofovillalogomono from '../../public/portofovilla logo mono.svg';
import WaLogo from '../../public/logos_whatsapp-icon.svg';
import { client } from "@/sanity/client"; 
import type { SanityDocument } from "next-sanity";

const Navbar = ({ isHomePage }: { isHomePage: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const navLinks = [
    { name: 'Room', href: '#room' },
    { name: 'About', href: '#about' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Activities', href: '#activities' },
    { name: 'Testimonies', href: '#testimonies' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const resolveHref = (href: string) => (isHomePage ? href : `/${href}`);

  return (
    <nav
      className="top-0 left-0 w-full z-50 transition-colors duration-300 bg-white text-black"
    >
      <div className="max-w-[1296px] mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <Image
            src={portofovillalogomono}
            alt="logo"
            width={80}
            className="invert"
          />
        </Link>

        {/* Burger Icon (visible on mobile) */}
        <button
          className={`lg:hidden text-xl focus:outline-none px-2 pb-1 rounded ${
            isMenuOpen ? 'bg-neutral-100' : 'bg-transparent'
          } `}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={resolveHref(link.href)}>
                <p className="hover:underline">{link.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={resolveHref('#contact')}
          className="hidden lg:flex font-semibold gap-2 p-3 
            isScrolled bg-[#047C36] text-white text-[14px] rounded items-center"
        >
          <Image src={WaLogo} alt="WAlogo" width={20} height={20} />
          Hubungi kami
        </Link>

        {/* Mobile Menu */}
        <div
          className={`fixed top-[64px] p-4 left-0 w-full flex flex-col justify-between h-[calc(100vh-64px)] bg-white text-black transition-transform duration-300 border-t border-[#d9d9d9] ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden z-50`}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                href={resolveHref(link.href)}
                key={link.name}
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="hover:underline">{link.name}</p>
              </Link>
            ))}
          </div>
          <Link
            href={resolveHref('#contact')}
            className="w-full flex font-semibold gap-2 p-4 text-center justify-center bg-[#047C36] text-white text-[14px] rounded items-center"
          >
            <Image src={WaLogo} alt="WAlogo" width={20} height={20} />
            Hubungi kami
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
