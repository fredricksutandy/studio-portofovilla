import { defineType, defineField } from 'sanity';

export const heroImage = defineType({
  name: 'heroImage',
  title: 'Bagian Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Utama',
      type: 'string',
      description: 'Judul utama yang akan ditampilkan di bagian Hero.',
      validation: (Rule) => Rule.required().min(5).max(50).warning('Judul harus antara 5-50 karakter.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'string',
      description: 'Sub-judul untuk memberikan konteks tambahan pada Hero.',
      validation: (Rule) => Rule.max(100).warning('Sub-judul sebaiknya tidak lebih dari 100 karakter.'),
    }),
    defineField({
      name: 'buttonName',
      title: 'Judul Tombol',
      type: 'string',
      description: 'Teks tombol untuk Call-To-Action (CTA), misalnya "Pesan Sekarang".',
      validation: (Rule) => Rule.required().min(3).max(30).warning('Teks tombol harus antara 3-30 karakter.'),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link URL Tombol',
      type: 'url',
      description: 'URL tujuan saat tombol di-klik, misalnya link ke halaman pemesanan.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }).error('Masukkan URL yang valid dengan skema http atau https.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // Membuat slug otomatis dari title
        maxLength: 96,   // Maksimal panjang slug
      },
      description: 'Slug ini digunakan untuk URL halaman Hero Image.'
    }),
    defineField({
      name: 'image',
      title: 'Gambar Latar Belakang',
      type: 'image', // Tipe gambar dari Sanity
      options: {
        hotspot: true, // Memungkinkan cropping langsung di Sanity Studio
      },
      description: 'Gambar utama untuk Hero, pastikan resolusi tinggi dan berkualitas baik.',
      validation: (Rule) => Rule.required().error('Gambar wajib diunggah.'),
    }),
  ],
});
