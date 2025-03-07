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
  const buttonStyles = React.useMemo(() => {
    switch (type) {
      case 'green':
        return 'bg-secondary text-white';
      case 'white':
        return 'bg-white text-secondary border border-secondary';
      case 'transparent':
        return 'bg-transparent text-secondary'; // ✅ No background, no border
      case 'transparent-border':
        return 'bg-transparent text-secondary border border-secondary'; // ✅ Transparent with border
      default:
        return '';
    }
  }, [type]);

  const buttonRadius = React.useMemo(() => (radius === 'full' ? 'rounded-full' : 'rounded-lg'), [radius]);

  const buttonWidth = React.useMemo(() => (width === 'full' ? 'w-full' : 'w-full md:w-fit'), [width]);

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
    'justify-center items-center px-[48px] py-[24px] gap-2 text-[16px] font-semibold cursor-pointer transition-all hover:-translate-y-2',
    buttonWidth,
    buttonRadius,
    buttonStyles,
    visibilityClass // Apply visibility class dynamically
  );

  return (
    <a href={link} className={buttonClass} aria-label={text}>
    {typeof iconType === 'string' ? (
      <Image src={iconType} alt="Icon" width={24} height={24} className="inline" />
    ) : (
      iconType // ✅ Directly render JSX icon
    )}
    {text}
  </a>
  );
};

export default ButtonWa;
