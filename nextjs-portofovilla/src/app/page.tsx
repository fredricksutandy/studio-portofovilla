import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Hero from "../../components/Hero";
import Heroaltone from "../../components/Heroaltone";
import { Montserrat } from 'next/font/google'; // Import Montserrat
import AboutSection from "../../components/About";
import AboutSectionaltone from "../../components/Aboutaltone";
import CTASection from "../../components/CTA";
import FaqSection from "../../components/Faq";
import Contact from "../../components/Contact";
import TriviaSection from "../../components/Trivia";
import FacilitySection from "../../components/Facility";
import AttractionSection from "../../components/Attractions";
import AttractionSectionaltone from "../../components/Attractionsaltone";
import RoomSection from "../../components/Room";
import RoomSectionalt from "../../components/Roomaltone";
import RoomSectionalttwo from "../../components/Roomalttwo";
import FooterSection from "../../components/layout/Footer";

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default async function IndexPage() {
  return (
    <main className={`${montserrat.className} bg-[#fff]`}>
      {/* <Hero /> */}
      <Heroaltone />
      {/* <AboutSection /> */}
      <AboutSectionaltone />
      <TriviaSection />
      {/* <RoomSection /> */}
      {/* <RoomSectionalt /> */}
      <RoomSectionalttwo />
      <FacilitySection />
      <AttractionSection />
      <AttractionSectionaltone />
      <Contact />
      <FaqSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}