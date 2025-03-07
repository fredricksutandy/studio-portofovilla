import Heroaltone from "../../components/Heroaltone";
import { Montserrat } from "next/font/google";

import AboutSectionaltone from "../../components/Aboutaltone";
import AboutSectionalttwo from "../../components/Aboutalttwo";
import AboutSectionaltthree from "../../components/Aboutaltthree";

import CertificateAward from "../../components/CertificateAward";

import CTASection from "../../components/CTA";
import CTASectionaltone from "../../components/CTAaltone";

import FaqSection from "../../components/Faq";

import Contact from "../../components/Contact";
import MultipleContact from "../../components/MultipleContact";

import TriviaSectionaltone from "../../components/Triviaaltone";
import TriviaSectionalttwo from "../../components/Triviaalttwo";
import TriviaSectionaltthree from "../../components/Triviaaltthree";

import FacilitySectionaltone from "../../components/Facilityaltone";

import ActivitiesSection from "../../components/Activities";
import ActivitiesSectionaltone from "../components/Activitiesaltone";
import ActivitiesSectionalttwo from "../../components/Activitiesalttwo";

import TestimonyVideo from "../components/TestimonialVideo";
import TestimonyVideoAltone from "../components/TestimonialVideoAltone";
import TestimonyVideoAltthree from "../components/TestimonialVideoAltthree";

import RoomSectionaltthree from "../components/Roomaltthree";
import RoomSectionaltfour from "../components/Roomaltfour";
import RoomSectionalttwo from "../../components/Roomalttwo";
import RoomSectionaltone from "../../components/Roomaltone";
import Room from "../../components/Room";

import FooterSection from "../../components/layout/Footer";
import FooterSectionaltone from "../../components/layout/Footeraltone";
import FooterSectionalttwo from "../../components/layout/Footeralttwo";
import FooterSectionaltthree from "../../components/layout/Footeraltthree";

import NavbarSectionaltone from "../../components/layout/Navbaraltone";
import NavbarSectionalttwo from "../../components/layout/Navbaralttwo";
import NavbarSectionaltthree from "../../components/layout/Navbaraltthree";

import Modal from "../../components/common/Modal";

import FloatingButton from "../../components/layout/FloatingButton";
import FloatingButtonExpand from "../../components/layout/FloatingButtonExpand";

import Gallery from "../components/Gallery";

import ServicesSectioninf from "@/components/ServicesAltInf";
import ServicesSection from "@/components/Services";
import ServicesOneSection from "../../components/ServicesOne";
import ServicesTwoSection from "../../components/ServicesTwo";

export default function IndexPage() {

  return (
    <main className={` bg-white relative font-montserrat`}>
      <NavbarSectionaltone />
      {/* <NavbarSectionalttwo /> */}
      {/* <NavbarSectionaltthree /> */}

      {/* <FloatingButton /> */}
      <FloatingButtonExpand />

      <Heroaltone />

      {/* <RoomSectionaltfour /> GAUSA PAKE< DESAIN JELEKKKKKK*/}
      <RoomSectionaltthree />
      <RoomSectionalttwo />
      <RoomSectionaltone />
      <Room />

      {/* <AboutSectionaltone /> */}
      <AboutSectionalttwo />
      {/* <AboutSectionaltthree /> */}

      {/* <TriviaSectionaltone /> kyny ga pake, jelek juga */}
      <TriviaSectionalttwo />
      {/* <TriviaSectionaltthree /> */}

      <CertificateAward />

      {/* <FacilitySectionaltone /> */}

      <ServicesSectioninf />
      <ServicesSection />
      <ServicesOneSection />
      <ServicesTwoSection />

      {/* <ActivitiesSection jelek uga /> */}
      <ActivitiesSectionaltone />
      <ActivitiesSectionalttwo />

      {/* <TestimonyVideo /> */}
      {/* <TestimonyVideoAltone /> */}
      <TestimonyVideoAltthree />

      <FaqSection />

      <Gallery />

      {/* <CTASection /> */}
      <CTASectionaltone />

      {/* <Contact /> */}
      <MultipleContact />

      {/* <FooterSection /> */}
      {/* <FooterSectionaltone /> */}
      <FooterSectionalttwo />
      <FooterSectionaltthree />

      <Modal />
    </main>
  );
}
