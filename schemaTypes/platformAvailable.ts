// src/sanity/schemas/platformAvailable.ts
import { defineType, defineField, Rule } from 'sanity'

export const platformAvailable = defineType({
  name: 'platformAvailable',
  title: 'Section Platform',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Tengah',
      type: 'string',
      description: 'Masukkan judul utama untuk bagian platform. Contoh: "Platform Booking".',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'text',
      description: 'Berikan sub-judul untuk menggambarkan bagian platform. Contoh: "Kami ada di mana-mana!".',
      validation: (rule) => rule.required().error('Sub-judul wajib diisi.'),
    }),
    defineField({
      name: 'platforms',
      title: 'Daftar Platform',
      type: 'array',
      of: [
        defineField({
          name: 'platform',
          title: 'Platform',
          type: 'object',
          fields: [
            defineField({
              name: 'platformName',
              title: 'Nama Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'AirBNB', value: 'Airbnb' },
                  { title: 'Booking.com', value: 'Booking.com' },
                  { title: 'Tiket.com', value: 'Tiket.com' },
                  { title: 'Agoda', value: 'Agoda' },
                  { title: 'Trip.com', value: 'Trip.com' },
                  { title: 'Traveloka', value: 'Traveloka' },
                  { title: 'Google', value: 'Google' },
                  { title: 'Whatsapp', value: 'Whatsapp' },
                ],
                layout: 'dropdown',
              },
              description: 'Pilih platform tempat properti Anda tersedia.',
            }),
            defineField({
              name: 'platformUrl',
              title: 'URL Platform',
              type: 'url',
              description: 'Masukkan URL platform (contoh: https://airbnb.com/...)',
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
            }),
          ],
        }),
      ],
      description: 'Platform tempat villa atau properti Anda tersedia, seperti Airbnb, Traveloka, dan lainnya.',
      validation: (Rule) =>
        Rule.custom((platforms: any[] | undefined) => {
          if (!platforms) return true;
          const unique = new Set(platforms.map(p => p.platformName));
          return unique.size === platforms.length || 'Tidak boleh ada platform yang sama.';
        }),
    }),
  ],
})

export default platformAvailable;
