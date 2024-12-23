import { defineType, defineField } from 'sanity';

export const room = defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    // Basic Details
    defineField({
      name: 'roomName',
      title: 'Room Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'roomName', maxLength: 96 },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
    }),
    defineField({
      name: 'guestsBooked',
      title: 'Jumlah reservasi',
      type: 'number',
      description: 'Jumlah pengunjung yang pernah menginap/reservasi',
    }),

    defineField({
      name: 'specifications',
      title: 'Spesifikasi Kamar',
      description: 'cantumkan detail dan spesifikasi kamar (contoh: jumlah kamar, jumlah ranjang, jumlah kamar mandi, Jumlah tamu yang diperbolehkan, dan ukuran ruangan)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon/Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'icon',
            },
          },
        },
      ],
    }),

    // Facilities with Images
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon/Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'icon',
            },
          },
        },
      ],
      description: 'List of facilities with icons/images specific to this room.',
    }),

    // Address and Map
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'gmapUrl',
      title: 'Google Maps URL',
      type: 'url',
      description: 'Embed URL for the room location.',
    }),

    // Rules and Policies (Individual Fields)
    defineField({
      name: 'checkIn',
      title: 'Check-In Hour',
      type: 'string',
      description: 'Specify the check-in time, e.g., 2:00 PM.',
    }),
    defineField({
      name: 'checkOut',
      title: 'Check-Out Hour',
      type: 'string',
      description: 'Specify the check-out time, e.g., 11:00 AM.',
    }),
    defineField({
      name: 'rulesList',
      title: 'Rules List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add any specific rules for the room.',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'text',
      description: 'Add disclaimers or additional policies if needed.',
    }),

    // Extra Amenities
    defineField({
      name: 'extraAmenities',
      title: 'Extra Amenities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
            },
          },
        },
      ],
      description: 'Add extra amenities with their names and prices.',
    }),

    // Facilities with Images
    defineField({
      name: 'bookingMethod',
      title: 'Metode Booking',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Whatsapp', value: 'Whatsapp' },
                  { title: 'AirBNB', value: 'Airbnb' },
                  { title: 'Booking.com', value: 'Booking-com' },
                  { title: 'Tiket.com', value: 'Tiket-com' },
                ],
              },
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'The URL for booking on the selected platform.',
            },
          ],
        },
      ],
      description: 'List of booking methods with platforms and their respective links.',
    }),


    // Main Image and Gallery
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      description: 'The primary image used for the room.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }, // Ensure each image in the array can use hotspot individually
        },
      ],
      description: 'Additional images to showcase the room.',
    }),
  ],
});
