import { defineType, defineField } from 'sanity';

export const CTA = defineType({
  name: 'CTA',
  title: 'CTA Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul CTA',
      description: 'Judul utama yang akan ditampilkan di bagian Call-to-Action. Contoh: "Siap untuk berlibur bersama kami?"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Deskripsi CTA',
      description: 'Deskripsi singkat yang mendukung ajakan, seperti promosi atau penjelasan tambahan. Contoh: "Hubungi kami untuk informasi lebih lanjut dan booking segera!"',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonName',
      title: 'Teks Tombol',
      description: 'Teks pada tombol CTA. Contoh: "Pesan Sekarang"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link Tombol',
      description: 'URL tujuan saat tombol diklik. Arahkan ke link untuk mengontak villa Anda.',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Gambar CTA',
      description: 'Gambar ilustrasi untuk mendukung konten CTA.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
