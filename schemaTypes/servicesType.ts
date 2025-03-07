import { defineType, defineField } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Bagian Servis',
  type: 'document',
  description: 'Bagian ini digunakan untuk menampilkan berbagai layanan yang ditawarkan oleh villa Anda.',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      description: 'Judul utama untuk bagian servis. Contoh: "Layanan Kami".',
      validation: (rule) => rule.required().error('Judul wajib diisi.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'text',
      description: 'Sub-judul untuk memberikan informasi tambahan tentang layanan. Contoh: "Kami menawarkan berbagai layanan terbaik untuk Anda."',
      validation: (rule) => rule.required().error('Sub-judul wajib diisi.'),
    }),
    defineField({
      name: 'services',
      title: 'Daftar Layanan',
      type: 'array',
      description: 'Tambahkan daftar layanan yang Anda tawarkan.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'serviceImage',
              title: 'Foto Servis',
              type: 'image',
              description: 'Unggah foto terbaik yang mewakili layanan ini.',
              options: {
                hotspot: true, // Allows for flexible image cropping in Sanity's UI
              },
              validation: (rule) => rule.required().error('Foto servis wajib diunggah.'),
            }),
            defineField({
              name: 'serviceTitle',
              title: 'Nama Layanan',
              type: 'string',
              description: 'Nama layanan atau fasilitas yang ditawarkan. Contoh: "Restoran", "Ruang Meeting".',
              validation: (rule) => rule.required().error('Nama layanan wajib diisi.'),
            }),
            defineField({
              name: 'serviceTagline',
              title: 'Tagline Layanan',
              type: 'string',
              description: 'Motto, jargon, atau tagline yang menarik untuk layanan ini.',
              validation: (rule) => rule.max(100).warning('Tagline sebaiknya tidak lebih dari 100 karakter.'),
            }),
            defineField({
              name: 'serviceDescription',
              title: 'Deskripsi Layanan',
              type: 'text',
              description: 'Penjelasan detail tentang layanan, termasuk manfaat dan harapan pelanggan.',
              validation: (rule) => rule.required().error('Deskripsi layanan wajib diisi.'),
            }),
            defineField({
              name: 'serviceLink',
              title: 'Tautan Informasi Layanan',
              type: 'url',
              description: 'Tambahkan tautan ke informasi layanan ini, seperti menu online, brosur PDF, atau halaman detail layanan.',
              validation: (rule) =>
                rule.uri({ scheme: ['http', 'https'] }).error('Harap masukkan URL yang valid dengan "http" atau "https".'),
            }),
          ],
          preview: {
            select: {
              title: 'serviceTitle',
              subtitle: 'serviceTagline',
              media: 'serviceImage',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'serviceContact',
      title: 'Kontak Person Layanan',
      type: 'string',
      description: 'Masukkan kontak (Link WA atau link email) untuk orang yang bertanggung jawab atas layanan ini.',
      validation: (rule) =>
        rule.required().error('Kontak person layanan wajib diisi.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug digunakan untuk membuat URL unik untuk bagian ini.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug wajib diisi.'),
    }),
  ],
});

export default service;
