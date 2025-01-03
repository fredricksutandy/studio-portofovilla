import Heroaltone from "../../components/Heroaltone";
import { Montserrat } from "next/font/google";
import AboutSectionaltone from "../../components/Aboutaltone";
import CTASection from "../../components/CTA";
import FaqSection from "../../components/Faq";
import Contact from "../../components/Contact";
import TriviaSectionaltone from "../../components/Triviaaltone";
import FacilitySectionaltone from "../../components/Facilityaltone";
import ActivitiesSectionaltone from "../components/Activitiesaltone";
import TestimonyVideo from "../components/TestimonialVideo";
import RoomSectionaltthree from "../components/Roomaltthree";
import FooterSection from "../../components/layout/Footer";
import NavbarSectionaltone from "../../components/layout/Navbaraltone";
import FloatingButton from "../../components/layout/FloatingButton";
import Gallery from "../components/Gallery";

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
      <ActivitiesSectionaltone />
      <TestimonyVideo />
      <FaqSection />
      <Gallery />
      <CTASection />
      <Contact />
      <FooterSection />
    </main>
  );
}
