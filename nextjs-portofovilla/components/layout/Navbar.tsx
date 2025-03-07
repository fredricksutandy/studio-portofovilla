'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import portofovillalogomono from '../../public/portofovilla logo mono.svg'

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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isMenuOpen
          ? 'bg-white text-black border-b border-b-graymuted' // Menu open styles
          : isScrolled
          ? 'bg-white text-black border-b border-b-graymuted' // Scrolled styles
          : 'bg-transparent text-white' // Default styles
      }`}
    >
      <div className="max-w-[1296px] mx-auto flex items-center justify-between p-4">
      <Link href="/">
        <Image src={portofovillalogomono} alt='logo' width={80} className={` ${
              isScrolled ? 'invert' : '' } ${
              isMenuOpen ? 'invert' : '' }`}/>
      </Link>

        {/* Burger Icon (visible on mobile) */}
        <button
          className={`md:hidden text-xl focus:outline-none px-2 pb-1 rounded ${
            isMenuOpen ? 'bg-neutral-100' : 'bg-transparent'
          } `}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
        <li>
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
          </li>
        </ul>

        {/* Mobile Menu */}
        <div
          className={`fixed top-[64px] left-0 w-full h-screen bg-white text-black transition-transform duration-300 border-t border-graymuted ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden z-40`}
        >
          <div className="p-4 flex flex-col space-y-6">
          <Link href="/">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Room
              </p>
            </Link>
            <Link href="#about">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                About
              </p>
            </Link>
            <Link href="#facilities">
              <p className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Facilities
              </p>
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
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

