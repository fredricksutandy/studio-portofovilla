'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { client } from '@/sanity/client';
import { platformData } from '../../src/constant/platforms';

// Expected Sanity schema result type
type PlatformSectionType = {
  platforms: { platformName: string; platformUrl?: string }[];
};

// Sanity query
const PLATFORM_QUERY = `*[_type == "platformAvailable"][0]{ platforms }`;

export default function PlatformAvailable() {
  const [platforms, setPlatforms] = useState<{ platformName: string; platformUrl?: string }[]>([]);

  const [angleOffset, setAngleOffset] = useState(0);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const requestRef = useRef<number>();

  // Fetch platforms from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: PlatformSectionType = await client.fetch(PLATFORM_QUERY);
        setPlatforms(data?.platforms ?? []);
      } catch (error) {
        console.error("Failed to fetch platforms:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) { // Only apply scroll effect on desktop
        const currentScrollY = window.scrollY;
        scrollVelocity.current = currentScrollY - lastScrollY.current;
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (window.innerWidth >= 768) { // Only animate on desktop
        const sensitivity = 0.00035;
        const damping = 0.85;
        setAngleOffset(prev => prev + scrollVelocity.current * sensitivity);
        scrollVelocity.current *= damping;
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <div className="relative flex py-20 md:py-[120px] md:pt-0 flex-col justify-center h-full md:h-screen w-[100%] mx-auto gap-6">
      {/* Center title */}

      <div className="text-center md:absolute inset-0 flex flex-col gap-2 items-center justify-center z-10 pointer-events-none">
      <h2 className="font-krona mb-2 text-base text-primary font-medium leading-[100%!important]">Platform Booking</h2>

        <h1 className="text-4xl font-semibold">
          Kami ada
          <br />
          di mana-mana!
        </h1>
        <p className="text-sm text-neutral-400">*klik salah satu platform</p>
      </div>

      {/* Buttons */}
      <div className="md:absolute inset-0 w-full h-fit md:h-full z-10">
        {/* Mobile layout */}
        <div className="md:hidden flex flex-wrap justify-center items-center gap-2 h-full px-4">
          {platforms.map((item, index) => {
            const platform = platformData[item.platformName];
            if (!platform) return null;

            // Calculate row position for z-index
            const row = Math.floor(index / 3);
            const isEvenRow = row % 2 === 0;
            // Alternate rotation between -4deg and 4deg
            const rotation = index % 2 === 0 ? 4 : -4;

            const button = (
              <button
                key={item.platformName}
                className={`pointer-events-auto hover:scale-110 transition-transform whitespace-nowrap flex items-center justify-center w-auto px-5 py-4 rounded-full shadow-md ${platform.border || ''}`}
                style={{
                  backgroundColor: platform.bgColor,
                  color: platform.textColor,
                  transform: `rotate(${rotation}deg)`,
                  zIndex: isEvenRow ? platforms.length - row : row,
                }}
              >
                {platform.logo ? (
                  <div className="w-fit h-6 flex items-center justify-center">
                    <Image 
                      src={platform.logo} 
                      alt={item.platformName} 
                      width={160} 
                      height={160} 
                      className="max-w-full max-h-full w-full h-auto object-contain" 
                    />
                  </div>
                ) : (
                  <span className="text-sm md:text-base">{item.platformName}</span>
                )}
              </button>
            );
            return item.platformUrl ? (
              <a key={item.platformName} href={item.platformUrl} target="_blank" rel="noopener noreferrer">
                {button}
              </a>
            ) : button;
          })}
        </div>

        {/* Desktop orbit layout */}
        <div className="hidden md:block">
          {platforms.map((item, index) => {
            const count = platforms.length;
            const baseAngle = (360 / count) * index;
            const totalAngle = baseAngle + angleOffset * 360;
            const radians = (totalAngle * Math.PI) / 180;
            const radius = 270;
            const x = Math.cos(radians) * radius;
            const y = Math.sin(radians) * radius;

            const platform = platformData[item.platformName];
            if (!platform) return null;

            const button = (
              <button
                key={item.platformName}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto hover:scale-110 transition-transform whitespace-nowrap flex items-center justify-center min-w-[120px] px-5 py-4 rounded-full shadow-[0_1px_6px_rgba(0,0,0,0.12)] ${platform.border || ''}`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  backgroundColor: platform.bgColor,
                  color: platform.textColor,
                }}
              >
                {platform.logo ? (
                  <div className="w-fit h-7 flex items-center justify-center">
                    <Image 
                      src={platform.logo} 
                      alt={item.platformName} 
                      width={160} 
                      height={160} 
                      className="max-w-full max-h-full w-full h-auto object-contain" 
                    />
                  </div>
                ) : (
                  <span className="text-sm md:text-base">{item.platformName}</span>
                )}
              </button>
            );
            return item.platformUrl ? (
              <a key={item.platformName} href={item.platformUrl} target="_blank" rel="noopener noreferrer">
                {button}
              </a>
            ) : button;
          })}
        </div>
      </div>
    </div>
  );
}
