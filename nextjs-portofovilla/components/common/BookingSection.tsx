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
import { Information } from "@carbon/icons-react";

const platformImages: Record<string, string> = {
  Whatsapp: WaLogo,
  Airbnb: airbnbLogo,
  'Tiket-com': tiketComLogo,
  'Booking-com': bookingComLogo,
  Agoda: agodaLogo,
  'Trip-com': tripComLogo,
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
  const [promoIsOpen, setPromoIsOpen] = useState(true);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);

  // Function to toggle the visibility of additional booking methods
  const toggleShowMethods = () => {
    setShowAllMethods(!showAllMethods);
  };

  return (
    <section className="bg-white flex flex-col gap-3 mb-0 w-full left-0 fixed bottom-0 top-auto md:bottom-auto md:w-[calc(32%-16px)] md:sticky md:top-[80px] h-fit mt-8 md:mb-4 z-40">
      {/* <div className="hidden w-full md:block text-sm font-medium text-white mt-2 bg-gradient-to-r from-[#4caf50] to-[#1b691f] p-4 rounded-lg mx-auto mb-0">
      <div 
        className="flex gap-2 items-center text-base font-semibold justify-between cursor-pointer"
        onClick={() => setPromoIsOpen(!promoIsOpen)}
      >
        Promo Terbatas!
        <ChevronDownOutline
          height={20}
          width={20}
          className={`transition-transform duration-300 ${promoIsOpen ? "rotate-180" : ""}`}
        />
      </div>
      {promoIsOpen && (
        <p className="text-sm font-normal mt-2">
          {limitedOfferText}
        </p>
      )}
    </div> */}
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


      <div className='rounded-0 border border-graymuted md:rounded-xl p-4 md:p-5'>
        {/* <p className="font-semibold mb-1 text-center md:text-start text-sm md:text-base">Estimasi harga:</p> */}
        <p className="text-xl md:text-2xl text-primary text-center md:text-start font-bold mb-2 font-krona">
          {price} <span className="text-sm font-normal"> per malam</span>
        </p>
        <p className="text-gray-500 italic text-center md:text-start text-xs border-b-0 md:border-b border-graymuted pb-3 mb-2">(Harga merupakan estimasi dari berbagai platform)</p>

        

        <div className="text-sm hidden md:flex flex-wrap gap-2 font-medium mb-2 text-neutral-600">
        <p className="">Range harga: </p> <p className="text-sm font-medium">{priceRange}</p>
        </div>
        <a href="#kebijakan" className='underline hidden md:block text-sm'>Lihat kebijakan pembatalan</a>
        {/* <div className="mb-4 hidden md:block">
          <p className="text-green-700 text-semibold">{cancellationPolicy.freeCancellationText}</p>
          <p className="text-neutral-600">{cancellationPolicy.cancellationDeadline}</p>
        </div> */}

        {/* <div className="hidden md:flex gap-4 mb-6">
          <div className="flex flex-col flex-1">
            <p className="mb-2 font-semibold">Tamu</p>
            <select name="guests" id="guests" className="w-full p-3 text-sm bg-white rounded-md border border-[#000]">
              {guestsOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden md:flex flex-col flex-1">
            <p className="mb-2 font-semibold">Malam</p>
            <select name="nights" id="nights" className="w-full p-3 text-sm bg-white rounded-md border border-[#000]">
              {nightsOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        {/* <div className="total hidden md:flex w-full justify-between mb-8">
          <p className="font-semibold text-base">Total</p>
          <p className="font-semibold text-base">{totalPrice}</p>
        </div> */}

        {/* On Mobile: Initially show only the first method, and toggle the others */}
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
                method.platform === 'Tiket-com' ? 'bg-bluelink text-white' :
                method.platform === 'Booking-com' ? 'bg-[#003580] text-white' :
                method.platform === 'Agoda' ? 'bg-[#003580] text-white' :
                  method.platform === 'Trip-com' ? 'bg-white text-black border-1 border-graymuted' :
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
              Book via {method.platform}
            </a>
          ))}
        </div>

        {/* Button to show/hide additional methods on Mobile */}
        <button
          onClick={toggleShowMethods}
          className="w-full text-sm text-blue-600 justify-center font-semibold mt-4 flex md:hidden"
        >
          {showAllMethods ? 'Sembunyikan metode booking lain' : 'Lihat metode booking lain'}
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
                className={`p-3 md:p-4 text-sm flex items-center justify-center font-bold rounded-md w-full text-center ${
                  method.platform === 'Whatsapp' ? 'bg-[#25d366] text-white' :
                  method.platform === 'Airbnb' ? 'bg-[#ff5A60] text-white' :
                  method.platform === 'Tiket-com' ? 'bg-bluelink text-white' :
                  method.platform === 'Booking-com' ? 'bg-[#003580] text-white' :
                  method.platform === 'Agoda' ? 'bg-[#003580] text-white' :
                  method.platform === 'Trip-com' ? 'bg-white text-black border-1 border-graymuted' :
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
                Book via {method.platform}
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
              className={`p-3 md:p-4 text-sm flex items-center justify-center font-bold rounded-md w-full text-center ${
                 method.platform === 'Whatsapp' ? 'bg-[#25d366] text-white' :
                  method.platform === 'Airbnb' ? 'bg-[#ff5A60] text-white' :
                  method.platform === 'Tiket-com' ? 'bg-bluelink text-white' :
                  method.platform === 'Booking-com' ? 'bg-[#003580] text-white' :
                  method.platform === 'Agoda' ? 'bg-black text-white' :
                  method.platform === 'Trip-com' ? 'bg-white text-black border border-graymuted' :
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
              Book via {method.platform}
            </a>
          ))}
        </div>
      </div>
      {/* <div className='bg-amber-200 p-4 rounded-xl text-sm text-amber-900'>
      <div className="flex items-center gap-2 mb-2">
      <Information width={24} height={24} className="text-black mt-[1px]"/>
      <p className="text-base md:text-xl font-semibold leading-[100%] text-black">Disclaimer</p>

      </div>
      Harga dapat berubah sewaktu-waktu sesuai kebijakan platform, permintaan musiman, dan faktor lainnya. Rentang harga diambil dari berbagai sumber, termasuk OTA, harga langsung villa, dan promosi yang berlaku.
      </div> */}

{/* <div className="text-sm font-medium text-neutral-700 bg-amber-100 p-4 rounded-lg">
        <div 
          className="flex gap-2 items-center text-base font-semibold justify-between cursor-pointer"
          onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
        >
          <div className="flex gap-2 text-lg font-semibold items-center">
          <Information width={24} height={24} className="mt-[1px]"/>
          Disclaimer
          </div>
          <ChevronDownOutline
            height={20}
            width={20}
            className={`transition-transform duration-300 ${isDisclaimerOpen ? "rotate-180" : ""}`}
          />
        </div>
        {isDisclaimerOpen && (
          <p className="text-sm font-normal mt-2">Harga dapat berubah sewaktu-waktu sesuai kebijakan platform, permintaan musiman, dan faktor lainnya. Rentang harga diambil dari berbagai sumber, termasuk OTA, harga langsung villa, dan promosi yang berlaku.</p>
        )}
      </div> */}
{priceDisclaimer && (
<CollapsibleCard
  title="Disclaimer"
  content={priceDisclaimer}
  icon={Information} // Pass the Information icon component
  bgColor="bg-orange-50"
  defaultState={true}
  hideOnMobile={true}
/>
)}

      
    </section>
  );
};

export default BookingSection;
