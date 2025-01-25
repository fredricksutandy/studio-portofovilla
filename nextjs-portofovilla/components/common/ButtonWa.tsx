import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

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
  // Apply styles conditionally based on the `type` prop
  const buttonStyles = React.useMemo(
    () => (type === 'green' ? 'bg-[#047C36] text-white' : 'bg-white text-[#1D764A] border border-[#1D764A]'),
    [type]
  );

  const buttonRadius = React.useMemo(() => (radius === 'full' ? 'rounded-full' : 'rounded-lg'), [radius]);

  const buttonWidth = React.useMemo(() => (width === 'full' ? 'w-full' : 'w-fit'), [width]);

  // Apply visibility classes based on mobile and desktop visibility
  const visibilityClass = clsx(
    {
      'hidden': !displayMobile, // Mobile visibility logic
      'flex': displayMobile,    // Mobile visibility logic
    },
    {
      'md:hidden': !displayDesktop, // Desktop visibility logic
      'md:flex': displayDesktop, // Desktop visibility logic (md breakpoint)
    }
  );

  const buttonClass = clsx(
    'justify-center items-center px-[48px] py-[24px] gap-2 text-[16px] font-bold cursor-pointer',
    buttonWidth,
    buttonRadius,
    buttonStyles,
    visibilityClass // Apply visibility class dynamically
  );

  return (
    <a href={link} className={buttonClass} aria-label={text}>
      {iconType && <Image src={iconType} alt="Icon" width={24} height={24} className="inline" />}
      {text}
    </a>
  );
};

export default ButtonWa;
