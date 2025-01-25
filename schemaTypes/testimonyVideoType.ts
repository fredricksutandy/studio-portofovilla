import { defineType, defineField } from 'sanity';
const range = Array.from({ length: 51 }, (_, i) => ({
  title: (i / 10).toFixed(1),
  value: (i / 10).toFixed(1),
}));

export const testimonyVideo = defineType({
  name: 'testimonyVideo',
  title: 'Bagian Testimoni dan Video',
  type: 'document',
  description: 'Bagian ini digunakan untuk menampilkan testimoni pelanggan dan video yang relevan.',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      description: 'Judul utama untuk bagian testimoni dan video. Contoh: "Apa Kata Mereka".',
      validation: (rule) => rule.required().error('Judul wajib diisi.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-Judul',
      type: 'string',
      description: 'Sub-judul untuk memberikan penjelasan tambahan. Contoh: "Lihat apa yang pelanggan katakan tentang kami."',
      validation: (rule) => rule.required().error('Sub-judul wajib diisi.'),
    }),
    defineField({
      name: 'platformRating',
      title: 'Daftar Testimoni',
      type: 'array',
      description: 'Tambahkan testimoni pelanggan untuk meningkatkan kepercayaan pengunjung.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'rating',
              title: 'Rating Pada Platform',
              type: 'string',
              description: 'Pilih peringkat untuk testimoni, antara 1 hingga 5.',
              options: {
                list: range,
                layout: 'dropdown', // Menampilkan sebagai dropdown
              },
              validation: (Rule) => Rule.required().error('Peringkat harus dipilih.'),
            }),    
            defineField({
              name: 'platformName',
              title: 'Nama Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'AirBNB', value: 'Airbnb' },
                  { title: 'Booking.com', value: 'Booking-com' },
                  { title: 'Tiket.com', value: 'Tiket-com' },
                  { title: 'Agoda', value: 'Agoda' },
                  { title: 'Trip.com', value: 'Trip-com' },
                  { title: 'Traveloka', value: 'Traveloka' },
                ],
                layout: 'dropdown',
              },
              description: 'Lokasi atau afiliasi pelanggan. Contoh: "Jakarta, Indonesia".',
            }),
          ],
          preview: {
            select: {
              title: 'platformName',
              subtitle: 'platformRating',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'testimonies',
      title: 'Daftar Testimoni',
      type: 'array',
      description: 'Tambahkan testimoni pelanggan untuk meningkatkan kepercayaan pengunjung.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'testimonyHighlight',
              title: 'Highlight Testimoni',
              type: 'string',
              description: 'Bagian yang paling menarik dari testimoni. Contoh: "Pelayanan terbaik!".',
              validation: (rule) => rule.max(100).warning('Highlight sebaiknya tidak lebih dari 100 karakter.'),
            }),
            defineField({
              name: 'testimonyRating',
              title: 'Rating Testimoni',
              type: 'string',
              options: {
                list: range,
                layout: 'dropdown',
              },
              description: 'Berikan rating dari 1-5 berdasarkan pengalaman pelanggan.',
              validation: (rule) =>
                rule.min(1).max(5).error('Rating harus antara 1 dan 5.'),
            }),
            defineField({
              name: 'testimony',
              title: 'Isi Testimoni',
              type: 'text',
              description: 'Isi lengkap dari testimoni pelanggan.',
              validation: (rule) => rule.required().error('Isi testimoni wajib diisi.'),
            }),
            defineField({
              name: 'testimonyName',
              title: 'Nama Pelanggan',
              type: 'string',
              description: 'Nama pelanggan yang memberikan testimoni.',
              validation: (rule) => rule.required().error('Nama pelanggan wajib diisi.'),
            }),
            defineField({
              name: 'testimonyFrom',
              title: 'Asal Pelanggan',
              type: 'string',
              options: {
                list: [
                  { title: 'AirBNB', value: 'Airbnb' },
                  { title: 'Booking.com', value: 'Booking-com' },
                  { title: 'Tiket.com', value: 'Tiket-com' },
                  { title: 'Agoda', value: 'Agoda' },
                  { title: 'Trip.com', value: 'Trip-com' },
                  { title: 'Traveloka', value: 'Traveloka' },
                ],
                layout: 'dropdown',
              },
              description: 'Lokasi atau afiliasi pelanggan. Contoh: "Jakarta, Indonesia".',
            }),
            defineField({
              name: 'testimonyImage',
              title: 'Foto Pelanggan',
              type: 'image',
              description: 'Unggah foto pelanggan (opsional).',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'testimonyName',
              subtitle: 'testimonyHighlight',
              media: 'testimonyImage',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Bagian Video',
      type: 'array',
      description: 'Tambahkan video yang relevan, seperti wawancara atau dokumentasi.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'videoTitle',
              title: 'Judul Video',
              type: 'string',
              description: 'Judul untuk video. Contoh: "Testimoni Pelanggan".',
              validation: (rule) => rule.required().error('Judul video wajib diisi.'),
            }),
            defineField({
              name: 'iframeLink',
              title: 'Link Iframe Video',
              type: 'url',
              description: 'Masukkan URL iframe untuk video (misalnya, dari YouTube atau Vimeo).',
              validation: (rule) => rule.required().error('Link iframe wajib diisi.'),
            }),
          ],
          preview: {
            select: {
              title: 'videoTitle',
              subtitle: 'iframeLink',
            },
          },
        },
      ],
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

export default testimonyVideo;
