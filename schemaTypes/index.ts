import { hero } from "./heroType";
import { heroImage } from "./heroImageType";
import { about } from "./aboutType";
import { certificate } from "./certificateType";
import { trivia } from "./triviaType";
import { room } from "./roomType";
import { facility } from "./facilityType";
import { service } from "./servicesType";
import { contact } from "./contactType";
import { multipleContact } from "./multipleContactType";
import { testimony } from "./testimonyType";
import { testimonyVideo } from "./testimonyVideoType";
import { CTA } from "./ctaType";
import { faq } from "./faqType";
import { gallery } from "./gallery";
import { activities } from "./activitiesType";
import { otherActivities } from "./otherActivitiesType";
import { sectionMetadata } from "./sectionMetadataType";
import { modalPromoType } from "./modalPromoType";
import { siteSettings } from "./siteSettingsType";
import { platformAvailable } from "./platformAvailable";

export const schemaTypes = [
    sectionMetadata, 
    hero, 
    // heroImage, 
    about, 
    certificate, 
    trivia, 
    room, 
    // facility, 
    service,
    // contact, 
    multipleContact, 
    // testimony, 
    testimonyVideo, 
    faq, 
    gallery, 
    CTA, 
    activities,
    otherActivities, 
    modalPromoType,
    siteSettings,
    platformAvailable,
]
