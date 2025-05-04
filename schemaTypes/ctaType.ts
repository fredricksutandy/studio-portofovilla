import { defineType, defineField } from 'sanity';

export const CTA = defineType({
  name: 'CTA',
  title: 'CTA Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul CTA',
      description: 'Judul utama yang akan ditampilkan di bagian Call-to-Action (misal: Booking Sekarang!)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Deskripsi CTA',
      description: 'Deskripsi singkat yang mendukung ajakan, seperti promosi atau penjelasan tambahan.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonName',
      title: 'Nama Tombol',
      description: 'Teks pada tombol CTA (misal: Pesan Sekarang)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link Tombol',
      description: 'URL tujuan saat tombol diklik (misal: /booking atau link WhatsApp)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Slug halaman CTA ini, berguna jika ingin ditampilkan di halaman tertentu.',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Gambar CTA',
      description: 'Gambar ilustrasi untuk mendukung konten CTA. Pilih satu gambar saja.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
