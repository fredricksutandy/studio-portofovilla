import { defineType, defineField } from 'sanity';

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Judul utama untuk section gallery.',
      validation: (Rule) => Rule.required().min(5).max(50).warning('Judul harus antara 5-50 karakter.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-title',
      type: 'string',
      description: 'Sub-judul tambahan untuk memberikan konteks lebih pada section gallery.',
      validation: (Rule) => Rule.max(100).warning('Sub-judul sebaiknya tidak lebih dari 100 karakter.'),
    }),
    defineField({
      name: 'galleryButton',
      title: 'Gallery Button Text',
      type: 'string',
      description: 'Teks untuk tombol CTA di gallery, misalnya "Lihat Semua".',
      validation: (Rule) => Rule.required().min(3).max(30).warning('Teks tombol harus antara 3-30 karakter.'),
    }),
    defineField({
      name: 'galleryButtonUrl',
      title: 'Gallery Button URL',
      type: 'url',
      description: 'URL yang dituju ketika tombol di-klik.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }).error('Masukkan URL yang valid dengan http atau https.'),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Image Title',
              type: 'string',
              description: 'Judul singkat untuk gambar ini.'
            }),
            defineField({
              name: 'mapUrl',
              title: 'Map Link (Optional)',
              type: 'url',
              description: 'Tambahkan link peta jika gambar ini terkait lokasi tertentu.',
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }).warning('Jika diisi, pastikan URL valid.'),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true, // Memungkinkan cropping langsung di Sanity Studio
              },
              description: 'Unggah gambar untuk galeri.',
              validation: (Rule) => Rule.required().error('Gambar wajib diunggah.'),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(1)
          .error('Setidaknya satu gambar harus dimasukkan.')
          .max(20)
          .warning('Idealnya, jangan lebih dari 20 gambar untuk performa.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // Slug otomatis dibuat dari title
        maxLength: 96, // Panjang maksimal slug
      },
      description: 'Slug ini digunakan untuk URL halaman.'
    }),
  ],
});
