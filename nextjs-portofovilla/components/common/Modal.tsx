'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import { Close } from '@carbon/icons-react';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

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
    linkModal,
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
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-[999]">
      <DialogBackdrop className="fixed inset-0 bg-black/75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
          <DialogPanel className="font-montserrat relative max-w-4xl rounded bg-white text-left shadow-xl transition-all flex flex-col md:flex-row">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-8 md:top-3 right-0 md:right-3 text-white/50 md:text-gray-400"
            >
              <Close width={24} height={24}/>
            </button>

              <div className='w-full md:w-5/12 flex items-stretch relative h-[152px] md:h-auto'>
              <Image
                src={urlFor(modalData.imageModal)} 
                alt={modalData.title || 'Modal image'}
                fill
                className="w-full h-full object-cover"
              />
              </div>

            {/* Modal Content */}
            <div className="bg-white px-4 py-4 md:py-6 md:px-6 flex-col justify-between flex w-full md:w-7/12">
              <div>
              <DialogTitle as="h3" className="font-krona text-xl md:text-3xl font-bold text-primary">
                {modalData.title}
              </DialogTitle>
              <p className="text-base md:text-xl text-black font-medium mt-2">
                {modalData.subtitle}
              </p>
              <ul className="list-disc pl-6 mt-8 space-y-2 text-sm md:text-base text-gray-800">
                {modalData.details.map((detail, index) => (
                  <li key={index}>
                    <strong>{detail.detailTitle}</strong>: {detail.detailDescription}
                  </li>
                ))}
              </ul>
              </div>
              
              {modalData.linkModal && (
              <Link
                target="_blank"
                href={modalData.linkModal}
                className="bg-secondary px-10 py-4 mt-14 text-white flex w-fit ms-auto hover:-translate-y-2 hover:bg-secondary/70 transition-all"
              >
                Book Now
              </Link>
            )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
