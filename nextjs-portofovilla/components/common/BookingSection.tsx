"use client"
import React, { useState } from 'react';
import WaLogo from '../../public/logos_whatsapp-icon.svg';
import airbnbLogo from '../../public/logos_airbnb-icon.svg';
import tiketComLogo from '../../public/logos_tiket-com-icon.svg';
import bookingComLogo from '../../public/logos_booking-com-icon.svg';
import agodaLogo from '../../public/Agoda-logo-WhiteText-01.svg';
import tripComLogo from '../../public/logos_trip-com-icon.svg';
import travelokaLogo from '../../public/Traveloka-logo-icon.svg';
import Image from "next/image";

interface BookingSectionProps {
  price: string;
  cancellationPolicy: {
    freeCancellationText: string;
    cancellationDeadline: string;
  };
  guestsOptions: number[];
  nightsOptions: number[];
  totalPrice: string;
  limitedOfferText: string;
  bookingMethods: { platform: string; link: string }[];
}

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
  cancellationPolicy,
  guestsOptions,
  nightsOptions,
  totalPrice,
  limitedOfferText,
  bookingMethods,
}) => {
  // State to control the visibility of additional booking methods
  const [showAllMethods, setShowAllMethods] = useState(false);

  // Function to toggle the visibility of additional booking methods
  const toggleShowMethods = () => {
    setShowAllMethods(!showAllMethods);
  };

  return (
    <section className="bg-white rounded-0 mb-0 w-full left-0 fixed bottom-0 top-auto md:bottom-auto md:w-[calc(32%-16px)] md:sticky md:top-[80px] h-fit mt-8 p-4 md:p-6 border border-[#d9d9d9] md:rounded-xl md:mb-4">
      <div>
        <p className="text-base md:text-xl text-center md:text-start font-bold pb-4 border-0 md:border-b border-[#d9d9d9] mb-0 md:mb-4 font-krona">
          Rp.{price} <span className="text-sm font-normal"> per malam</span>
        </p>

        <div className="mb-4 hidden md:block">
          <p className="text-green-700 text-semibold">{cancellationPolicy.freeCancellationText}</p>
          <p className="text-neutral-700">{cancellationPolicy.cancellationDeadline}</p>
        </div>

        <div className="hidden md:flex gap-4 mb-6">
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
        </div>

        <div className="total hidden md:flex w-full justify-between mb-8">
          <p className="font-semibold text-base">Total</p>
          <p className="font-semibold text-base">{totalPrice}</p>
        </div>

        <p className="hidden md:block text-sm text-center text-gray-600 mt-2 bg-amber-100 p-4 rounded-lg mx-auto mb-0">
          {limitedOfferText}
        </p>

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
                method.platform === 'Tiket-com' ? 'bg-[#0064D3] text-white' :
                method.platform === 'Booking-com' ? 'bg-[#003580] text-white' :
                method.platform === 'Agoda' ? 'bg-[#003580] text-white' :
                  method.platform === 'Trip-com' ? 'bg-white text-black border-1 border-[#d9d9d9]' :
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
                  method.platform === 'Tiket-com' ? 'bg-[#0064D3] text-white' :
                  method.platform === 'Booking-com' ? 'bg-[#003580] text-white' :
                  method.platform === 'Agoda' ? 'bg-[#003580] text-white' :
                  method.platform === 'Trip-com' ? 'bg-white text-black border-1 border-[#d9d9d9]' :
                  method.platform === 'Traveloka' ? 'bg-[#0A9AF2] text-white' :
                  'bg-[#1D764A] text-white'
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
                  method.platform === 'Tiket-com' ? 'bg-[#0064D3] text-white' :
                  method.platform === 'Booking-com' ? 'bg-[#003580] text-white' :
                  method.platform === 'Agoda' ? 'bg-black text-white' :
                  method.platform === 'Trip-com' ? 'bg-white text-black border border-[#d9d9d9]' :
                  method.platform === 'Traveloka' ? 'bg-[#0A9AF2] text-white' :
                'bg-[#1D764A] text-white'
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
    </section>
  );
};

export default BookingSection;
