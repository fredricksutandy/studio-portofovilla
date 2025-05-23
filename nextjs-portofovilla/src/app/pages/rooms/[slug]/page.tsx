import { Metadata } from "next";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import SectionNav from "../../../../../components/common/SectionNavigation";
import FooterSectionalttwo from "../../../../../components/layout/Footeralttwo";
import FacilitiesRoomSection from "../../../../../components/common/RoomComponents/Facilities";
// import NavbarDetailSection from "../../../../components/layout/NavbarDetail";
import ExpandableSection from "../../../../../components/common/Expandable";
import NavbarDetailSectionaltone from "../../../../../components/layout/NavbarDetailaltone";
import { PortableText } from "@portabletext/react";
import CollapsibleCard from '../../../../../components/common/CollapsibleCard';

import RoomImage from "../../../../../components/common/roomDetailGallery";
import BookingSection from "../../../../../components/common/BookingSection";
import { Information } from "@carbon/icons-react";

// Initialize the image builder
const builder = imageUrlBuilder(client);

// Helper function to build image URLs
const urlFor = (source: any) => builder.image(source).fit("max").quality(80);

// Define interfaces
interface RoomData {
  roomName: string;
  guestsBooked?: number;
  description: string;
  price: string;
  priceRange: string;
  promotionDetails: string;
  priceDisclaimer: string;
  specifications?: { name: string; icon?: { url?: string; lqip?: string } }[];
  facilities?: {
    category: string;
    items: {
      name: string;
      icon?: {
        url?: string;
        lqip?: string;
      };
    }[];
  }[];
  address?: string;
  gmapUrl?: string;
  checkIn?: string;
  checkOut?: string;
  rulesList?: string[];
  policies?: {
    title: string;
    description: string;
  }[];
  extraAmenities?: {
    name: string;
    price: string;
  }[];
  bookingMethod?: {
    platform: string;
    link: string;
    advantage: string;
  }[];
  image?: {
    asset: {
      url: string;
      metadata: {
        lqip: string;
      };
    };
  };
  gallery?: {
    category: string;
    images: {
      asset: {
        url: string;
        metadata: {
          lqip: string;
        };
      };
    }[];
  }[];
}

interface Slug {
  slug: string;
}

// Fetch room data
async function getRoomData(slug: string): Promise<RoomData | null> {
  try {
    const query = `
  *[_type == "room" && slug.current == $slug][0] {
    roomName,
    guestsBooked,
    description,
    price,
    priceRange,
    promotionDetails,
    priceDisclaimer,
    specifications[]{
      name,
      icon {
        asset->{
          url,
          metadata {
            lqip
          }
        }
      }
    },
    facilities[] {
      category,
      items[] {
        name,
        icon {
          asset->{
            url,
            metadata {
              lqip
            }
          }
        }
      }
    },
    address,
    gmapUrl,
    checkIn,
    checkOut,
    rulesList,
    policies[] {
        title,
        description
      },
    extraAmenities[]{
      name,
      price
    },
    bookingMethod[]{
      platform,
      link,
      advantage
    },
    image {
      asset->{
        url,
        metadata {
          lqip
        }
      }
    },
    gallery[] {
      category,
      images[] {
        asset->{
          url,
          metadata {
            lqip
          }
        }
      }
    }
  }
`;

    const data = await client.fetch(query, { slug });
    return data || null;
  } catch (error) {
    console.error("Error fetching room data:", error);
    return null;
  }
}

// Fetch all room slugs
async function getAllRoomSlugs(): Promise<string[]> {
  try {
    const query = `*[_type == "room"] { "slug": slug.current }`;
    const slugs = await client.fetch(query);
    return slugs.map((item: Slug) => item.slug);
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}

// Metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const room = await getRoomData(params.slug);
  return {
    title: room?.roomName || "Room Details",
    description: room?.description?.substring(0, 160) || "Room details page",
  };
}

// Static Params generation
export async function generateStaticParams() {
  const slugs = await getAllRoomSlugs();
  if (slugs.length === 0) {
    console.warn("No slugs found for rooms.");
    return [];
  }
  return slugs.map((slug: string) => ({ slug }));
}


// Dynamic Room Details Page
export default async function RoomDetails({ params }: { params: { slug: string } }) {
  const { slug } = params; // Destructure slug from params
  const room = await getRoomData(slug);
  
  // Handle room not found
  if (!room) {
    return (
      <section className="p-10 text-center">
        <h1 className="text-3xl font-bold">Room Not Found</h1>
        <p className="mt-4 text-gray-600">The room you are looking for does not exist.</p>
      </section>
    );
  }

  return (
    <>
    {/* <NavbarDetailSection /> */}
    <NavbarDetailSectionaltone />

    {room.image && <RoomImage image={room.image} gallery={room.gallery || []} />}    
    <section className="bg-white relative max-w-[1296px] mx-auto font-montserrat px-4 pb-4">
    <SectionNav />

<div className="flex gap-8">
<section className="w-full md:w-[calc(68%-16px)]">
        <section id="kamar" className="flex flex-col gap-6 pt-8">
          <div>
          <p className="text-base font-semibold text-neutral-500 mb-2">{room.guestsBooked} tamu telah menginap disini</p>

          <h1 className="font-krona text-2xl md:text-4xl font-bold">{room.roomName}</h1>

          </div>
          {room.promotionDetails && (
          <CollapsibleCard
            title="Promo Terbatas!"
            content={room.promotionDetails}
            bgColor="text-primary "
            textSize="text-base"
            fontWeight="font-semibold"
            defaultState={true}
            hideOnDesktop={true}
          />
          )}


          <ul className="flex flex-wrap gap-6">
          {room.specifications?.map((specification: any, index: number) => {
              return (
                <li key={index} className="w-fit rounded flex items-center gap-2">
                  {specification.icon?.asset?.url && (
                    <img 
                    src={urlFor(specification.icon).url()} 
                    alt={specification.name} 
                    width={24} 
                    height={24} 
                    className="object-cover"
                  />
                  )}
                  <h3 className="text-sm md:text-base">{specification.name}</h3>
                </li>
              );
            })}
          </ul>
          <ExpandableSection maxHeight="200px">
            <p className="text-sm leading-relaxed text-neutral-500 whitespace-pre-line">{room.description}</p>
            
          </ExpandableSection>

        </section>

        <FacilitiesRoomSection facilities={room.facilities} />
{/* Facilities */}
        {/* <section id="fasilitas" className="pt-14 pb-14 border-b border-graymuted">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">Fasilitas</h2>

          <div className="space-y-6">
            {room.facilities?.map((categoryItem, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-3">{categoryItem.category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {categoryItem.items?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      {item.icon && (
                        <img
                          src={item.icon.asset?.url}
                          alt={item.name}
                          className="w-6 h-6 object-contain"
                        />
                      )}
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </section> */}

        <section id="lokasi" className="space-y-2 pt-14 pb-14 border-b border-graymuted">
          <h2 className="text-lg md:text-2xl font-semibold mb-4">Lokasi</h2>
          <p className="text-sm md:text-base">{room.address}</p>
          <iframe src={room.gmapUrl} className="w-full border-0 h-[300px] md:h-[440px] lg:h-fill outline-hidden rounded" loading="lazy"></iframe>
        </section>

        {/* Extra Amenities Section */}
        <section id="tambahan" className="pt-14 pb-14 border-b border-graymuted">
          <h2 className="text-lg md:text-2xl font-semibold mb-4">Tambahan</h2>
          <ul>
            {room.extraAmenities?.map((amenity: any, index: number) => (
              <li 
              key={index} 
              className={`flex justify-between p-4 ${
                index % 2 !== 0 ? "" : "bg-neutral-100"
              }`}
            >
              <span>
                {amenity.name} 
              </span>
              <span>
                {amenity.price}
              </span>
            </li>
            
            ))}
          </ul>
        </section>

        {/* Rules and Disclaimer Sections */}
        <section id="aturan" className="pt-14 pb-0">
          <h2 className="text-lg md:text-2xl font-semibold mb-4">Aturan & info penting</h2>
            <div className="flex gap-6 flex-wrap mb-6 text-sm md:text-base">
              <p>Check-In : <span className="font-semibold">{room.checkIn} WIB</span> </p>
              -
              <p>Check-Out : <span className="font-semibold">{room.checkOut} WIB</span> </p>
            </div>
          
          <ul className="list-decimal ps-8 mb-6">
            {room.rulesList?.map((rule: string, index: number) => (
              <li className="font-semibold text-base md:text-lg text-black" key={index}>{rule}</li>
            ))}
          </ul>

        </section>


        
      </section>

      <BookingSection 
        price={room.price}
        priceRange={room.priceRange}
        priceDisclaimer={room.priceDisclaimer}
        limitedOfferText={room.promotionDetails}
        whatsappURL={"contactData.whatsappURL"}
        bookingMethods={room.bookingMethod}
      />
</div>
  </section>
  
  <section className="pt-14 pb-20 max-w-[1296px] mx-auto px-4 font-montserrat" id="kebijakan">
    <div className="flex items-center gap-2 mb-6">
      <Information width={32} height={32} className="text-amber-500 mt-[1px]"/><h2 className="text-lg md:text-2xl font-semibold leading-[100%] text-amber-500">Penting untuk dibaca</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-16  relative font-montserrat">
      {room.policies?.map((policy, index) => (
        <div key={index} className="">
          <h3 className="text-lg font-semibold mb-2 text-black">{index + 1}. {policy.title}</h3>
          <PortableText className="whitespace-pre-line text-neutral-600 text-sm leading-relaxed" value={policy.description} />
        </div>
      ))}
    </div>
  </section>

  {room.priceDisclaimer && (
  <CollapsibleCard
  title="Disclaimer"
  content={room.priceDisclaimer}
  bgColor="bg-orange-50"
  textSize="text-base"
  fontWeight="font-semibold"
  defaultState={true}
  hideOnDesktop={true}
/>
  )}
  
  <FooterSectionalttwo />

    </>
  
  );
}

