'use client';

import React, { useState, useEffect } from 'react';

const SectionNav = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollOffset = 120; // Adjust for sticky header height

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute("id");

        // Check if the section's top is near the viewport's top
        if (rect.top <= scrollOffset && rect.top + rect.height > scrollOffset) {
          setActiveSection(sectionId || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="top-0 sticky w-full max-w-[1296px] h-fit z-40 mx-auto bg-white border-b border-[#d9d9d9] overflow-auto">
      <div className="flex gap-6 p-4 text-sm md:text-base">
      <a href="#kamar" className={activeSection === "kamar" ? "text-[#047C36] font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-[#047c36]"}>Tentang kamar</a>
      <a href="#fasilitas" className={activeSection === "fasilitas" ? "text-[#047C36] font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-[#047c36]"}>Fasilitas</a>
      <a href="#lokasi" className={activeSection === "lokasi" ? "text-[#047C36] font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-[#047c36]"}>Lokasi</a>
      <a href="#aturan" className={activeSection === "aturan" ? "text-[#047C36] font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-[#047c36]"}>Aturan</a>
      <a href="#tambahan" className={activeSection === "tambahan" ? "text-[#047C36] font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-[#047c36]"}>Tambahan</a>
      </div>
    </section>
  );
};

export default SectionNav;
