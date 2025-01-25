'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { client } from '@/sanity/client';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});



const MODAL_QUERY = `
  *[_type == "modalPromo"]{
    title,
    subtitle,
    imageModal{
      asset->{
        _ref,
        _type,
        url
      }
    },
    details[]{
      detailTitle,
      detailDescription
    },
    slug
  }
`;

const Modal = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalPromo | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchModalData = async () => {
      try {
        const data = await client.fetch(MODAL_QUERY);
        setModalData(data[0]); // Use the first promo
        console.log('Fetched Modal Data:', JSON.stringify(data, null, 2));
      } catch (error) {
        console.error('Error fetching modal data:', error);
      }
    };

    fetchModalData();
  }, []);

  if (!modalData || !modalData.imageModal.asset.url) {
    return null; // Avoid rendering the modal if data isn't loaded
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className={`${montserrat.className} relative z-10`}>
      <DialogBackdrop className="fixed inset-0 bg-black/75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden max-w-4xl rounded bg-white text-left shadow-xl transition-all flex flex-col md:flex-row">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-3xl absolute top-3 right-3 text-gray-400"
            >
              &times;
            </button>

            {/* Modal Image */}
            <div className="bg-gray-50 w-full md:w-5/12">
              <Image
                src={modalData.imageModal.asset.url}
                alt={modalData.title || 'Modal image'}
                width={800}
                height={1600}
                className="w-full h-[160px] md:h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="bg-white px-4 py-4 md:py-6 md:px-6 flex flex-col justify-between flex-1">
              <div>
              <DialogTitle as="h3" className="text-xl md:text-3xl font-bold text-[#047C36]">
                {modalData.title}
              </DialogTitle>
              <p className="text-base md:text-xl text-black font-medium mt-2">
                {modalData.subtitle}
              </p>
              </div>
              <ul className="list-disc pl-6 mt-6 space-y-2 text-sm md:text-base text-gray-800">
                {modalData.details.map((detail, index) => (
                  <li key={index}>
                    <strong>{detail.detailTitle}</strong>: {detail.detailDescription}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className="bg-[#1A520F] px-10 py-4 mt-6 text-white flex w-fit ms-auto hover:-translate-y-2 hover:bg-[#3e6e34] transition-all"
              >
                Book Now
              </Link>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
