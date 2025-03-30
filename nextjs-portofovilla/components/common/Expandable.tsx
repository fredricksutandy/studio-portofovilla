"use client";

import { useState } from "react";
import { ChevronDown } from "@carbon/icons-react";

interface ExpandableSectionProps {
  children: React.ReactNode;
  maxHeight?: string;
}

const ExpandableSection = ({ children, maxHeight = "320px" }: ExpandableSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className="transition-all duration-500 overflow-hidden relative"
        style={{
          maxHeight: expanded ? "none" : maxHeight,
        }}
      >
        {children}
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>

      <div className="text-center mt-6 mx-auto w-fit">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-bluelink font-medium hover:underline flex items-center gap-1"
        >
          {expanded ? "Lihat lebih sedikit" : "Lihat lebih"}
          <ChevronDown
            width={18}
            height={18}
            className={`transition-transform duration-300 ${
              expanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ExpandableSection;
