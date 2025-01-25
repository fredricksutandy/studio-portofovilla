import { defineType, defineField } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Bagian Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Utama',
      type: 'string',
      description: 'Judul utama untuk bagian Hero.',
      validation: (Rule) => Rule.required().min(5).max(50).warning('Judul harus antara 5-50 karakter.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'string',
      description: 'Sub-judul untuk memberikan informasi tambahan di bagian Hero.',
      validation: (Rule) => Rule.max(100).warning('Sub-judul sebaiknya tidak lebih dari 100 karakter.'),
    }),
    defineField({
      name: 'buttonName',
      title: 'Judul Tombol',
      type: 'string',
      description: 'Teks untuk tombol Call-To-Action (CTA), seperti "Pesan Sekarang" atau "Lihat Selengkapnya".',
      validation: (Rule) => Rule.required().min(3).max(30).warning('Teks tombol harus antara 3-30 karakter.'),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link URL Tombol',
      type: 'url',
      description: 'URL tujuan saat tombol di-klik, seperti link ke halaman pemesanan atau informasi lebih lanjut.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }).error('Masukkan URL yang valid dengan skema http atau https.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',  // Membuat slug otomatis berdasarkan title
        maxLength: 96,    // Batasi panjang slug
      },
      description: 'Slug ini digunakan untuk URL halaman Hero.'
    }),
    defineField({
      name: 'video',
      title: 'Video Latar Belakang',
      type: 'file', // Menggunakan tipe file untuk video
      options: {
        accept: 'video/*', // Batasi tipe file hanya untuk video
      },
      description: 'Unggah video yang akan ditampilkan di bagian Hero. File video harus memiliki format yang valid.',
      validation: (Rule) => Rule.required().error('Video wajib diunggah dan harus berupa file video yang valid.'),
    }),
  ],
});
