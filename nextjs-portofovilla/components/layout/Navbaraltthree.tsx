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
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

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
          setRooms(roomsData);
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
      isMenuOpen || isRoomsOpen || isScrolled ? 'bg-white text-black border-b border-graymuted' : 'bg-transparent text-white'
    }`}
  >
    <AnnouncementBanner />
    <div className="max-w-[1296px] mx-auto flex items-center justify-between p-4">
      {/* Logo */}
      <Link href="/">
        <Image src={portofovillalogomono} alt='logo' width={80} className={`${isScrolled || isRoomsOpen || isRoomsOpen || isMenuOpen ? 'invert' : ''}`} />
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
      <Link href="#contact" className={`hidden lg:flex font-semibold gap-2 p-3 ${
         isMenuOpen || isRoomsOpen || isScrolled ? 'bg-secondary text-white' : 'bg-white text-black'
      } text-[14px] rounded items-center`}>
        <Image src={WaLogo} alt='WAlogo' width={20} height={20} />
        Hubungi kami
      </Link>

      {/* Mobile Menu */}
      <div
          className={`fixed top-0 right-0 p-4 w-10/12 flex flex-col justify-between h-full bg-white text-black transition-all duration-700 border-t border-graymuted ${
            isMenuOpen ? 'translate-x-0 shadow-[-200px_0_50px_rgba(0,0,0,0.30)]' : 'translate-x-full shadow-[-20px_0_60px_rgba(0,0,0,0)]'
          } lg:hidden z-40`}
        >

          <div className="flex flex-col">
          <Close 
              className={`lg:hidden text-lg ms-auto focus:outline-none rounded opacity-50 mb-4 cursor-pointer`}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Toggle Menu"
              width={24} 
              height={24}
            />
            {quickLinks.map(({ name, href }, index) => (
              name === "Rooms" ? (
                <div key={href}>
                  <button onClick={() => setIsRoomsOpen((prev) => !prev)} className="text-lg flex items-center gap-2 w-full py-4">
                    Rooms <ChevronDown className={`w-4 h-4 transition-transform ${isRoomsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Accordion Dropdown */}
                  <div className={`overflow-hidden flex gap-4 flex-col transition-all duration-300 ${
                    isRoomsOpen ? 'max-h-fit opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0 mt-0'
                  }`}>
                    {rooms.map((room) => (
                      <Link className='flex gap-4 items-center' 
                        key={room.slug?.current || room._id}
                        href={`/room/${room.slug?.current}`}>
                      {room.roomName}
                      <ArrowRight width={16} height={16} className="transition-all mt-[2px]"/>
                    </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={href} href={href} 
                  className={`hover:underline py-4 ${
                    index !== 0 ? "border-t border-graymuted" : ""
                  }`} 
                  onClick={() => setIsMenuOpen(false)}>
                  {name}
                </Link>
              )
            ))}
          </div>
            <Link href="#contact" className={`w-full flex font-semibold gap-2 px-4 py-6 text-center justify-center rounded bg-secondary text-white text-[14px] items-center`}>
              <Image src={WaLogo} alt='WAlogo' width={20} height={20}/>
              Hubungi kami
            </Link>
        </div>


    </div>

    {/* dropdown */}
    <div
      className={`w-full hidden max-w-fit rounded-md bg-white mx-auto justify-center gap-6 transition-all duration-300 p-6
        ${isRoomsOpen ? "md:flex" : "hidden"}`}
    >

        {/* Left Side - Room Links */}
      <div className="flex w-66 flex-col gap-4 overflow-hidden">
      <a href="#room" className="text-2xl font-semibold font-krona text-primary underline">Kamar kami</a>

        {rooms.map((room) => (
          <div key={room.slug?.current || room._id}>
            <Link
              href={`/pages/${room.slug?.current}`}
              className="text-black flex group items-center rounded gap-2 -translate-x-6 transition-all duration-500 hover:translate-x-0"
              onMouseEnter={() =>
                setHoveredImage(room.image ? urlFor(room.image).width(500).height(300).url() : "")
              }
            >

          <ArrowRight width={16} height={16} className="transition-all mt-[1px]"/>
              {room.roomName}
              

            </Link>
          </div>
        ))}

      {/* Right Side - Room Image */}
      
      </div>
      <div className="flex flex-1 max-w-lg">
      <Image
        src={hoveredImage || leafroom} // ✅ Show hovered image, fallback to default
        alt="Room Image"
        width={500}
        height={360}
        className="rounded-lg w-full max-w-[500px] h-50 transition-all object-cover"
      />
      </div>
    </div>
  </nav>
  );
};

export default Navbar;

