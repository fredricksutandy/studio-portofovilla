"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { client } from "@/sanity/client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from '@carbon/icons-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Initialize image builder for fetching image URLs
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

interface HorizontalScrollProps {
  items?: Array<{
    id: number;
    serviceTitle: string;
    serviceDescription: string;
  }>;
}

const HorizontalScroll = ({ items = [] }: HorizontalScrollProps) => {
  if (items.length === 0) return null;
  console.log("Received items in HorizontalScroll:", JSON.stringify(items, null, 2));

  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [cardWidth, setCardWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /** ✅ Get actual card width */
  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.getBoundingClientRect().width);
    }

    const handleResize = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.getBoundingClientRect().width);
      }
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** ✅ Observe when the section is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInitialized) {
          setIsInitialized(true);
        }
      },
      { threshold: 0.2 }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current);
    };
  }, [isInitialized]);

  /** ✅ Initialize GSAP animation when scrolled */
  useEffect(() => {
    if (!isInitialized) return;

    const handleFirstScroll = () => {
      if (!isScrolled) {
        setIsScrolled(true);
        setupGSAP();
      }
    };

    window.addEventListener("scroll", handleFirstScroll, { once: true });

    return () => {
      window.removeEventListener("scroll", handleFirstScroll);
    };
  }, [isInitialized, isScrolled]);

  /** ✅ Setup GSAP animation */
  const setupGSAP = () => {
    if (!triggerRef.current || !sectionRef.current || cardWidth === 0) return;

    const totalWidth = (items.length + 1) * cardWidth;
    const totalDistance = totalWidth - window.innerWidth;
    sectionRef.current.style.width = `${totalWidth}px`;

    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${(items.length + 1) * cardWidth}px`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(sectionRef.current, {
        x: -totalDistance,
        ease: "none",
        duration: 1,
      });

      scrollTriggerRef.current = ScrollTrigger.getAll().pop() || null;
    });

    return () => ctx.revert();
  };

  return (
    <section className="overflow-hidden flex items-center" ref={triggerRef} style={{ height: "100vh" }}>
      <div ref={sectionRef} className="flex h-fit w-fit items-start">
        {items.map((item, index) => (
          <div key={index} ref={index === 0 ? cardRef : null} className="w-screen md:w-full max-w-[600px] md:px-8 px-4 h-fit flex-shrink-0 flex flex-col">
              <Image
                src={urlFor(item.serviceImage)}
                alt={item.serviceTitle}
                width={1320}
                height={640}
                className="w-full h-[260px] sm:h-[380px] object-cover mb-4 rounded"
              />

              <div className="flex flex-col md:flex-row gap-2 md:gap-4 flex-wrap items-start md:items-center">
                <h3 className="tracking-[2px] text-xl max-w-md lg:text-2xl font-krona font-semibold mb-0 md:mb-2">
                  {item.serviceTitle}
                </h3>
                <p className={`px-3 py-2 rounded-lg w-fit text-sm font-medium h-fit mb-4 md:mb-2
                  ${item.servicePrice && item.servicePrice.trim() !== "" 
                    ? "bg-gray-200 text-gray-800" 
                    : "bg-green-200 text-green-800"}
                `}>
                            {item.servicePrice && item.servicePrice.trim() !== "" 
                  ? "+ " + item.servicePrice 
                  : "Gratis!"}
                </p>
              </div>
              <p className="text-base mb-4">{item.serviceDescription}</p>

              {item.serviceLink && item.serviceLink.trim() !== "" && (
                <Link
                  href={item.serviceLink}
                  passHref
                  className="flex items-center justify-center transition-all duration-500 ease-in-out hover:translate-x-2 gap-2 w-full md:w-fit mb-4 rounded border border-primary md:border-0 p-3 md:p-0 underline group"
                >
                  <p className="block m-0 text-base font-medium">View Details</p>
                  <div className="w-fit overflow-hidden">
                  <ArrowRight width={16} height={16} className="mt-[2px] transition-all duration-500 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0"/>
                  
                  </div>
                </Link>
              )}
            </div>
        ))}
        <div className="w-screen md:w-full max-w-[600px] md:px-8 px-4 flex-shrink-0 flex flex-col rounded-lg self-stretch bg-primary text-white cursor-pointer">
          <div className="flex items-center justify-center h-full">
            <p className="text-lg font-medium">Explore More</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
