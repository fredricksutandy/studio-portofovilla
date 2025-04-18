"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Close } from "@carbon/icons-react";

interface FacilitiesModalProps {
  facilities: RoomFacilityType[];
  isOpen: boolean;
  onClose: () => void;
}

export default function FacilitiesModal({
  facilities,
  isOpen,
  onClose,
}: FacilitiesModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 font-montserrat">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
        <Close onClick={onClose} className="mb-8 w-5 h-5 cursor-pointer"/>
          <DialogTitle className="text-2xl font-semibold mb-6">
            Semua fasilitas di kamar ini
          </DialogTitle>

          <div className="space-y-10">
            {facilities.map((categoryItem, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-3">{categoryItem.category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {categoryItem.items?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3 border rounded border-neutral-300 p-2">
                      {item.icon?.asset?.url && (
                        <img
                          src={item.icon.asset.url}
                          alt={item.name}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span className="text-base">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-14 block w-full bg-red-50 p-4 rounded-lg text-sm text-red-500 hover:bg-red-100 transition-all"
          >
            Tutup
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
