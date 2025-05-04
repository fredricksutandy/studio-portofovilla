"use client"
import React, { useState } from 'react';
import WaLogo from '../../public/logos_whatsapp-icon.svg';
import airbnbLogo from '../../public/logos_airbnb-icon.svg';
import tiketComLogo from '../../public/logos_tiket-com-icon.svg';
import bookingComLogo from '../../public/logos_booking-com-icon.svg';
import agodaLogo from '../../public/Agoda-logo-WhiteText-01.svg';
import tripComLogo from '../../public/logos_trip-com-icon.svg';
import travelokaLogo from '../../public/Traveloka-logo-icon.svg';
import CollapsibleCard from '../../components/common/CollapsibleCard';
import Image from "next/image";
import { Information, ChevronDown } from "@carbon/icons-react";


const platformImages: Record<string, string> = {
  Whatsapp: WaLogo,
  Airbnb: airbnbLogo,
  'Tiket.com': tiketComLogo,
  'Booking.com': bookingComLogo,
  Agoda: agodaLogo,
  'Trip.com': tripComLogo,
  Traveloka: travelokaLogo
};

const BookingSection: React.FC<BookingSectionProps> = ({
  price,
  priceRange,
  priceDisclaimer, 
  limitedOfferText,
  bookingMethods,
}) => {
  // State to control the visibility of additional booking methods
  const [showAllMethods, setShowAllMethods] = useState(false);
  // const [promoIsOpen, setPromoIsOpen] = useState(true);
  // const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);

  // Function to toggle the visibility of additional booking methods
  const toggleShowMethods = () => {
    setShowAllMethods(!showAllMethods);
  };

  return (
    <section className="bg-white flex flex-col gap-3 mb-0 w-full left-0 fixed bottom-0 top-auto md:bottom-auto md:w-[calc(32%-16px)] md:sticky md:top-[72px] h-fit mt-8 md:mb-4 z-40">

{limitedOfferText && (
<CollapsibleCard
  title="Promo Terbatas!"
  content={limitedOfferText}
  bgColor="bg-gradient-to-r from-[#4caf50] to-[#1b691f] text-white"
  textSize="text-base"
  fontWeight="font-semibold"
  defaultState={true}
  hideOnMobile={true}
/>
)}
<div className="flex gap-2">
{priceDisclaimer && (
<CollapsibleCard
  title="Disclaimer"
  content={priceDisclaimer}
  icon={Information} // Pass the Information icon component
  bgColor="bg-orange-50 w-full h-fit"
  defaultState={true}
  hideOnMobile={true}
/>
)}
{priceDisclaimer && (
<CollapsibleCard
  title="Disclaimer"
  content={priceDisclaimer}
  icon={Information} // Pass the Information icon component
  bgColor="bg-orange-50 w-full h-fit"
  defaultState={true}
  hideOnMobile={true}
/>
)}
</div>


      <div className='rounded-0 border border-graymuted md:rounded-xl p-4 md:p-5'>
        {/* <p className="font-semibold mb-1 text-center md:text-start text-sm md:text-base">Estimasi harga:</p> */}
        <p className="text-lg md:text-2xl text-primary text-center md:text-start font-bold mb-2 font-krona">
          {price} <span className="text-sm font-normal"> per malam</span>
        </p>
        <p className="text-gray-500 italic text-center md:text-start text-xs border-b-0 md:border-b border-graymuted pb-3 md:mb-2">(Harga merupakan estimasi dari berbagai platform)</p>

        

        <div className="text-sm hidden md:flex flex-wrap gap-2 font-medium mb-2 text-neutral-600">
        <p className="">Range harga: </p> <p className="text-sm font-medium">{priceRange}</p>
        </div>
        <a href="#kebijakan" className='underline hidden md:block text-sm'>Lihat kebijakan pembatalan</a>
        
        <div className="flex flex-wrap gap-2">
          {/* Display only the first method on mobile */}
          {bookingMethods?.slice(0, 1).map((method) => (
            <a
              key={method.platform}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 md:p-4 text-sm flex md:hidden items-center justify-center font-bold rounded-md w-full text-center ${
                method.platform === 'Whatsapp' ? 'bg-[#25d366] text-white' :
                method.platform === 'Airbnb' ? 'bg-[#ff5A60] text-white' :
                method.platform === 'Tiket.com' ? 'bg-bluelink text-white' :
                method.platform === 'Booking.com' ? 'bg-[#003580] text-white' :
                method.platform === 'Agoda' ? 'bg-[#003580] text-white' :
                  method.platform === 'Trip.com' ? 'bg-white text-black border-1 border-graymuted' :
                  method.platform === 'Traveloka' ? 'bg-[#0A9AF2] text-white' :
                'bg-gray-300 text-black'
              }`}
            >
              {platformImages[method.platform] && (
                <Image
                  src={platformImages[method.platform]}
                  alt={method.platform}
                  width={24}
                  height={24}
                  className="inline mr-2"
                />
              )}
              <p className='text-xs font-medium'>Book via {method.platform}</p>
              <p className='text-xs font-normal'>{method.advantage}</p>
            </a>
          ))}
        </div>

        {/* Button to show/hide additional methods on Mobile */}
        <button
          onClick={toggleShowMethods}
          className="w-full text-sm text-blue-600 justify-center font-semibold mt-4 flex items-center gap-2 md:hidden"
        >
          {showAllMethods ? 'Sembunyikan metode booking lain' : 'Lihat metode booking lain'}

          <ChevronDown
            className={`transition-transform duration-300 ${
              showAllMethods ? 'rotate-180' : ''
            }`}
            size={16}
          />
        </button>

        {/* Show the rest of the methods when 'lihat metode booking lain' is clicked */}
        {showAllMethods && (
          <div className="flex flex-wrap gap-2 mt-4">
            {bookingMethods?.slice(1).map((method) => (
              <a
                key={method.platform}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 md:p-4 text-sm flex items-center justify-center rounded-md w-full text-center ${
                  method.platform === 'Whatsapp' ? 'bg-[#25d366] text-white' :
                  method.platform === 'Airbnb' ? 'bg-[#ff5A60] text-white' :
                  method.platform === 'Tiket.com' ? 'bg-bluelink text-white' :
                  method.platform === 'Booking.com' ? 'bg-[#003580] text-white' :
                  method.platform === 'Agoda' ? 'bg-[#003580] text-white' :
                  method.platform === 'Trip.com' ? 'bg-white text-black border-1 border-graymuted' :
                  method.platform === 'Traveloka' ? 'bg-[#0A9AF2] text-white' :
                  'bg-secondary text-white'
                }`}
              >
                {platformImages[method.platform] && (
                  <Image
                    src={platformImages[method.platform]}
                    alt={method.platform}
                    width={24}
                    height={24}
                    className="inline mr-2"
                  />
                )}
                <p className='text-xs font-medium'>Book via {method.platform}</p>
                <p className='text-xs font-normal'>{method.advantage}</p>
              </a>
            ))}
          </div>
        )}

        {/* On PC (desktop view), display all methods */}
        <div className="hidden md:flex flex-wrap gap-2 mt-4">
          {bookingMethods?.map((method) => (
            <a
              key={method.platform}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 md:p-4 text-sm flex items-center justify-center font-semibold rounded-md w-full ${
                 method.platform === 'Whatsapp' ? 'bg-[#25d366] text-white' :
                  method.platform === 'Airbnb' ? 'bg-[#ff5A60] text-white' :
                  method.platform === 'Tiket.com' ? 'bg-bluelink text-white' :
                  method.platform === 'Booking.com' ? 'bg-[#003580] text-white' :
                  method.platform === 'Agoda' ? 'bg-black text-white' :
                  method.platform === 'Trip.com' ? 'bg-white text-black border border-graymuted' :
                  method.platform === 'Traveloka' ? 'bg-[#0A9AF2] text-white' :
                'bg-secondary text-white'
              }`}
            >
              {platformImages[method.platform] && (
                <Image
                  src={platformImages[method.platform]}
                  alt={method.platform}
                  width={24}
                  height={24}
                  className="inline mr-2"
                />
              )}
              {/* <div className='flex flex-col justify-start'> */}
                <p className='text-sm font-semibold'>Pesan di {method.platform} <span className='text-xs font-normal italic'> {method.advantage}</span></p>
                
              {/* </div> */}
            </a>
          ))}
        </div>
      </div>
      


      
    </section>
  );
};

export default BookingSection;
