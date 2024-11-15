import React from 'react';
import Image from 'next/image';

interface ButtonProps {
  link: string;
  text: string;
  type: 'green' | 'white';
  iconType: string; // Path to the icon image
}

const Button: React.FC<ButtonProps> = ({ link, text, type, iconType }) => {
  // Apply styles conditionally based on the `type` prop
  const buttonStyles =
    type === 'green'
      ? 'bg-[#047C36] text-white'
      : 'bg-white text-[#1D764A] border border-[#1D764A]';

  return (
    <a
      href={link}
      className={`flex w-fit items-center px-[48px] py-[24px] gap-[16px] text-[16px] font-bold rounded-lg ${buttonStyles}`}
    >
      {/* Display icon if provided */}
      {iconType && (
        <Image src={iconType} alt="Icon" width={24} height={24} className="inline" />
      )}
      {text}
    </a>
  );
};

export default Button;
