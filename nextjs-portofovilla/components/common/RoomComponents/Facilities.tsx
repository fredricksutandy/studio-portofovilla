"use client";

import { useState, Suspense, lazy } from "react";

const FacilitiesModal = lazy(() => import("./FacilitiesModal"));

export default function Facilities({ facilities }: FacilitiesRoomSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalFacilities = facilities.reduce((acc, category) => {
    return acc + (category.items?.length || 0);
  }, 0);

  return (
    <section id="fasilitas" className="pt-14 pb-14 border-b border-graymuted">
      <h2 className="text-lg md:text-2xl font-semibold mb-6">Fasilitas</h2>

      <div className="grid grid-cols-2 gap-6">
        {facilities.slice(0, 8).map((category, index) => {
          const item = category.items?.[0]; // get the first item only
          if (!item) return null; // skip if no item

          return (
            <div key={index} className="flex items-center gap-2">
              {item.icon?.asset?.url && (
                <img
                  src={item.icon.asset.url}
                  alt={item.name}
                  className="w-6 h-6 object-contain"
                />
              )}
              <span className="text-base">{item.name}</span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="mt-12 hover:underline text-base font-medium p-4 border rounded-lg border-neutral-700"
      >
        Lihat semua {totalFacilities} fasilitas
      </button>

      <Suspense fallback={null}>
        {isOpen && (
          <FacilitiesModal
            facilities={facilities}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </Suspense>
    </section>
  );
}
