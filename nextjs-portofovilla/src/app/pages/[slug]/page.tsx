import { Metadata } from "next";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import ButtonWa from "../../../../components/common/ButtonWa";
import WaLogo from '../../../../public/logos_whatsapp-icon.svg'
import SectionNav from "../../../../components/common/SectionNavigation";
import FooterSection from "../../../../components/layout/Footer";
import RoomImage from "../../../../components/common/roomDetailGallery";
import BookingSection from "../../../../components/common/BookingSection";

// Initialize the image builder
const builder = imageUrlBuilder(client);

// Helper function to build image URLs
const urlFor = (source: any) => builder.image(source).fit("max").quality(80);

// Define interfaces
interface RoomData {
  roomName: string;
  guestsBooked?: number;
  description: string;
  price?: number;
  specifications?: { name: string; icon?: { url: string; lqip: string } }[];
  facilities?: { name: string; icon?: { url: string; lqip: string } }[];
  address?: string;
  gmapUrl?: string;
  checkIn?: string;
  checkOut?: string;
  rulesList?: string[];
  disclaimer?: string;
  extraAmenities?: string[];
  bookingMethod?: string[];
  image?: {
    asset: any;
    url: string;
    lqip: string;
  };
  gallery?: { url: string; lqip: string }[];
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
    specifications[]{
      name,
      icon {
        asset->{
          url,
          metadata {
            lqip // Include lqip here
          }
        }
      }
    },
    facilities[]{
      name,
      icon {
        asset->{
          url,
          metadata {
            lqip // Include lqip here
          }
        }
      }
    },
    address,
    gmapUrl,
    checkIn,
    checkOut,
    rulesList,
    disclaimer,
    extraAmenities[]{
      name,
      price
    },
    bookingMethod[]{
      platform,
      link
    },
    image {
      asset->{
        url,
        metadata {
          lqip // Include lqip here
        }
      }
    },
    gallery[] {
      asset->{
        url,
        metadata {
          lqip // Include lqip here
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
    {room.image && <RoomImage image={room.image} gallery={room.gallery || []} />}    <SectionNav />
    <section className="bg-white flex gap-8 relative max-w-[1296px] mx-auto font-montserrat p-4">

      <section className="w-full md:w-[calc(68%-16px)]">
        <section id="kamar" className="flex flex-col gap-6 pt-8">
          <div>
          <p className="text-base font-semibold text-neutral-500 mb-2">{room.guestsBooked} tamu telah menginap disini</p>

          <h1 className="font-krona text-2xl md:text-4xl font-bold mb-2">{room.roomName}</h1>

          </div>

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
          <p className="text-sm md:text-base leading-relaxed text-neutral-500">{room.description}</p>

        </section>

        <section id="fasilitas" className="pt-14 pb-14 border-b border-[#d9d9d9]">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">Fasilitas</h2>
          <ul className="flex flex-wrap gap-4">
          {room.facilities?.map((facility: any, index: number) => {
              return (
                <li key={index} className="p-4 border border-[#d9d9d9] w-fit rounded flex items-center gap-2">
                  <h3 className="text-sm md:text-base">{facility.name}</h3>
                  {facility.icon?.asset?.url && (
                    <img 
                    src={urlFor(facility.icon).url()} 
                    alt={facility.name} 
                    width={26} 
                    height={26} 
                    className="object-cover"
                  />
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="lokasi" className="space-y-2 text-gray-700 pt-14 pb-14 border-b border-[#d9d9d9]">
          <h2 className="text-lg md:text-2xl font-semibold mb-4">Lokasi</h2>
          <p className="text-sm md:text-base">{room.address}</p>
          <iframe src={room.gmapUrl} className="w-full border-0 h-[300px] md:h-[440px] lg:h-fill outline-hidden rounded" loading="lazy"></iframe>
        </section>

        {/* Rules and Disclaimer Sections */}
        <section id="aturan" className="text-gray-700 pt-14 pb-14 border-b border-[#d9d9d9]">
          <h2 className="text-lg md:text-2xl font-semibold mb-4">Aturan & info penting</h2>
            <div className="flex gap-6 flex-wrap mb-6 text-sm md:text-base">
              <p>Check-In: {room.checkIn} WIB</p>
              -
              <p>Check-Out: {room.checkOut} WIB</p>
            </div>
          
          <ul className="list-decimal ps-10 mb-6">
            {room.rulesList?.map((rule: string, index: number) => (
              <li className="font-semibold text-sm md:text-lg text-black" key={index}>{rule}</li>
            ))}
          </ul>

          <p className="text-red-700 text-sm md:text-base">{room.disclaimer}</p>
        </section>


        {/* Extra Amenities Section */}
        <section id="tambahan" className="pt-14 pb-14">
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
      </section>

      <BookingSection 
        price={room.price}
        cancellationPolicy={{
          freeCancellationText: 'Free cancellation',
          cancellationDeadline: 'Sebelum Senin, 23 Oct',
        }}
        guestsOptions={[1, 2, 3, 4, 5]}
        nightsOptions={[1, 2, 3, 4, 5]}
        totalPrice="3.400.000"
        limitedOfferText="Penawaran terbatas : potongan 10% untuk reservasi 3 malam"
        whatsappURL={"contactData.whatsappURL"}
        bookingMethods={room.bookingMethod}
      />

      {/* <section className="bg-white rounded-0 mb-0 w-full left-0 fixed bottom-0 top-auto md:bottom-auto md:w-[calc(32%-16px)] md:sticky md:top-[80px] h-fit mt-8 p-4 md:p-6 border border-[#d9d9d9] md:rounded-xl md:mb-4">
        <div className="">
          <p className="text-lg md:text-xl text-center md:text-start font-bold pb-4 border-0 md:border-b border-[#d9d9d9] mb-0 md:mb-4 font-krona">Rp.{room.price} <span className="text-sm font-normal"> per malam</span></p>
          
          <div className="mb-4 hidden md:block">
            <p className="text-green-700 text-semibold">Free cancellation</p>
            <p className="text-neutral-700">Sebelum Senin, 23 Oct</p>
          </div>

          <div className="hidden md:flex gap-4 mb-6">
          <div className="flex flex-col flex-1">
            <p className="mb-2 font-semibold">Tamu</p>
            <select name="" id="" className="w-full p-3 text-sm bg-white rounded-md border border-[#000]">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="hidden md:flex flex-col flex-1">
            <p className="mb-2 font-semibold">Malam</p>
            <select name="" id="" className="w-full p-3 text-sm bg-white rounded-md border border-[#000]">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          </div>

          <div className="total hidden md:flex w-full justify-between mb-8">
            <p className="font-semibold text-base">
              Total
            </p>
            <p className="font-semibold text-base">
              3.400.000
            </p>
          </div>

          <p className="hidden md:block text-sm text-center text-gray-600 mt-2 bg-amber-100 p-4 rounded-lg mx-auto mb-6">Penawaran terbatas : potongan 10% untuk reservasi 3 malam</p>

          <ButtonWa 
            link="{contactData.whatsappURL}"
            text="Book melalui WA"
            type="green" // or "white"
            iconType={WaLogo.src}
            width="full"
            radius="full"
            displayMobile={true}
            displayDesktop={false}
          />

        </div>
      </section> */}
  </section>
  <FooterSection />

    </>
  
  );
}

