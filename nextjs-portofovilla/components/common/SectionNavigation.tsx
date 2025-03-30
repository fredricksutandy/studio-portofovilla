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
    <section className="top-0 sticky w-full max-w-[1296px] h-fit z-40 mx-auto bg-white border-b border-graymuted overflow-auto">
      <div className="flex gap-6 p-4 ps-0 text-sm md:text-base">
      <a href="#kamar" className={activeSection === "kamar" ? "text-secondary font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-secondary"}>Tentang kamar</a>
      <a href="#fasilitas" className={activeSection === "fasilitas" ? "text-secondary font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-secondary"}>Fasilitas</a>
      <a href="#lokasi" className={activeSection === "lokasi" ? "text-secondary font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-secondary"}>Lokasi</a>
      <a href="#tambahan" className={activeSection === "tambahan" ? "text-secondary font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-secondary"}>Tambahan</a>
      <a href="#aturan" className={activeSection === "aturan" ? "text-secondary font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-secondary"}>Aturan</a>
      <a href="#kebijakan" className={activeSection === "kebijakan" ? "text-secondary font-semibold w-fit whitespace-nowrap" : "font-semibold w-fit whitespace-nowrap text-neutral-600 transition-all hover:text-secondary"}>Kebijakan</a>
      </div>
    </section>
  );
};

export default SectionNav;
