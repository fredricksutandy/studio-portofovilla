'use client'

import { useState, ElementType } from "react";
import { ChevronDown } from "@carbon/icons-react";

interface CollapsibleCardProps {
  title: string;
  content: string;
  icon?: ElementType; // Accepts an icon component
  bgColor?: string; // Background color classes
  textColor?: string; // Text color classes
  textSize?: string; // Allows setting text size
  fontWeight?: string; // Allows setting font weight
  defaultState?: boolean;
  hideOnMobile?: boolean; // Hide on mobile (sm and below)
  hideOnDesktop?: boolean; // Hide on desktop (md and above)
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  content,
  icon: Icon,
  bgColor = "bg-gray-100",
  textColor = "text-black",
  textSize = "text-base",
  fontWeight = "font-semibold",
  defaultState = false,
  hideOnMobile = false,
  hideOnDesktop = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  return (
    <div
      className={`md:p-4 font-montserrat rounded-lg ${bgColor} ${textColor} 
        ${hideOnMobile ? "hidden md:block" : ""} 
        ${hideOnDesktop ? "md:hidden" : ""}`
      }
    >
      <div 
        className={`flex gap-2 items-center justify-between cursor-pointer ${textSize} ${fontWeight}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-2 items-center">
          {Icon && <Icon width={20} height={20} />} {/* Render icon if provided */}
          {title}
        </div>
        <ChevronDown
          width={20}
          height={20}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <p className="text-sm font-normal mt-2">{content}</p>
      )}
    </div>
  );
};

export default CollapsibleCard;
