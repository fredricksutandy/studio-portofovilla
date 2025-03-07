import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface ButtonProps {
  link: string;
  text: string;
  type: 'green' | 'white' | 'booking.com' | 'tiket.com' | 'airbnb' | 'traveloka'; // Extended with brand names
  iconType?: string; // Optional icon
  radius: 'full' | 'lg';
  width: 'full' | 'fit';
  displayMobile: boolean;
  displayDesktop: boolean;
}

// Define button styles for each type, including brand-specific colors
const buttonStyleConfig: Record<string, string> = {
  green: 'bg-secondary text-white', // WhatsApp
  white: 'bg-white text-secondary border border-secondary', // Default white style
  'booking.com': 'bg-[#003580] text-white', // Booking.com blue
  'tiket.com': 'bg-[#FFD100] text-black', // Tiket.com yellow
  airbnb: 'bg-[#FF5A5F] text-white', // Airbnb reddish-pink
  traveloka: 'bg-[#159EC4] text-white', // Traveloka blue
};

const ButtonWa: React.FC<ButtonProps> = ({
  link,
  text,
  type,
  iconType,
  radius,
  width,
  displayMobile,
  displayDesktop
}) => {
  const buttonStyles = React.useMemo(() => buttonStyleConfig[type] || '', [type]);

  const buttonRadius = React.useMemo(() => (radius === 'full' ? 'rounded-full' : 'rounded-lg'), [radius]);

  const buttonWidth = React.useMemo(() => (width === 'full' ? 'w-full' : 'w-fit'), [width]);

  const visibilityClass = clsx(
    {
      hidden: !displayMobile,
      flex: displayMobile,
    },
    {
      'md:hidden': !displayDesktop,
      'md:flex': displayDesktop,
    }
  );

  const buttonClass = clsx(
    'justify-center items-center px-[48px] py-[24px] gap-[16px] text-[16px] font-bold cursor-pointer',
    buttonWidth,
    buttonRadius,
    buttonStyles,
    visibilityClass
  );

  return (
    <a href={link} className={buttonClass} aria-label={text}>
      {iconType && <Image src={iconType} alt="Icon" width={24} height={24} className="inline" />}
      {text}
    </a>
  );
};

export default ButtonWa;
