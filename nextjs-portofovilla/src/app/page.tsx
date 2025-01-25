import Heroaltone from "../../components/Heroaltone";
import { Montserrat } from "next/font/google";
import AboutSectionaltone from "../../components/Aboutaltone";
import CTASection from "../../components/CTA";
import CTASectionaltone from "../../components/CTAaltone";
import FaqSection from "../../components/Faq";
import Contact from "../../components/Contact";
import TriviaSectionaltone from "../../components/Triviaaltone";
import FacilitySectionaltone from "../../components/Facilityaltone";
import ActivitiesSectionaltone from "../components/Activitiesaltone";
import TestimonyVideo from "../components/TestimonialVideo";
import TestimonyVideoAltone from "../components/TestimonialVideoAltone";
import RoomSectionaltthree from "../components/Roomaltthree";
import FooterSection from "../../components/layout/Footer";
import NavbarSectionaltone from "../../components/layout/Navbaraltone";
import Modal from "../../components/common/Modal";
import FloatingButton from "../../components/layout/FloatingButton";
import Gallery from "../components/Gallery";
import ServicesSectioninf from "@/components/ServicesAltInf";
import ServicesSection from "@/components/Services";
import ServicesOneSection from "../../components/ServicesOne";
import ServicesTwoSection from "../../components/ServicesTwo";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function IndexPage() {

  return (
    <main className={`${montserrat.className} bg-[#fff] relative`}>
      <NavbarSectionaltone />
      <FloatingButton />
      <Heroaltone />
      <RoomSectionaltthree />
      <AboutSectionaltone />
      <TriviaSectionaltone />
      <FacilitySectionaltone />
      <ServicesSectioninf />
      {/* <ServicesSection />
      <ServicesOneSection />
      <ServicesTwoSection /> */}
      <ActivitiesSectionaltone />
      {/* <TestimonyVideo /> */}
      <TestimonyVideoAltone />
      <FaqSection />
      <Gallery />
      {/* <CTASection /> */}
      <CTASectionaltone />
      <Contact />
      <FooterSection />
      <Modal />
    </main>
  );
}
