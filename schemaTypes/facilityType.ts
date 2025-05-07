import { defineType, defineField } from 'sanity';

export const facility = defineType({
  name: 'facility',
  title: 'Fasilitas Villa',
  type: 'document',
  // description: 'Gunakan bagian ini untuk mengelola informasi tentang fasilitas yang tersedia di villa Anda. Pastikan untuk menambahkan gambar dan deskripsi yang tepat untuk setiap fasilitas.',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      description: 'Masukkan judul utama untuk section fasilitas ini. [Contoh: "Fasilitas lengkap"]',
      validation: (rule) => rule.required().error('Judul wajib diisi.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'string',
      description: 'Berikan sambungan kata untuk judul diatas agar menjadi kalimat yang lengkap dengan judul pilihanmu. [Contoh: "Demi kenyamananmu"]',
      validation: (rule) => rule.required().error('Sub-judul wajib diisi.'),
    }),
    defineField({
      name: 'region',
      title: 'Daerah kegiatan',
      type: 'text',
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
      description: 'Berikan daerah terkait dimana villa berada (Bali atau Jogja)',
      validation: (rule) => rule.required().error('Daerah wajib diisi.'),
    }),
    defineField({
      name: 'facilities',
      title: 'Daftar Fasilitas',
      type: 'array',
      description: 'Tambahkan daftar fasilitas yang tersedia di villa Anda, lengkap dengan gambar ikon dan nama fasilitas.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'facilityTitle',
              title: 'Nama Fasilitas',
              type: 'string',
              description: 'Masukkan nama fasilitas. Contoh: "Kolam Renang", "Spa", atau "Wi-Fi Gratis".',
              validation: (rule) => rule.required().error('Nama fasilitas wajib diisi.'),
            }),
            defineField({
              name: 'facilityImage',
              title: 'Gambar Fasilitas',
              type: 'image',
              description: 'Unggah gambar fasilitas untuk memberikan gambaran visual kepada pengunjung.',
              options: {
                hotspot: true, // Memungkinkan cropping gambar di Sanity
              },
              validation: (rule) => rule.required().error('Gambar fasilitas wajib diunggah.'),
            }),
          ],
          preview: {
            select: {
              title: 'facilityTitle',
              media: 'facilityImage',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',  // Automatically generate from the title
        maxLength: 96,    // Optional: Limit the length of the slug
      },
    }),
  ],
});
