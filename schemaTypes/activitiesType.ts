import { defineType, defineField } from 'sanity';

export const activities = defineType({
  name: 'activities',
  title: 'Kegiatan Sekitar Villa',
  type: 'document',
  description: 'Gunakan bagian ini untuk menampilkan berbagai kegiatan atau aktivitas menarik yang dapat dilakukan di sekitar villa Anda.',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      description: 'Masukkan judul utama untuk section kegiatan ini. Contoh: "Kegiatan Menarik di Sekitar Villa".',
      validation: (rule) => rule.required().error('Judul wajib diisi.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'text',
      description: 'Berikan sub-judul untuk memperkenalkan berbagai kegiatan yang tersedia. Contoh: "Temukan berbagai aktivitas yang dapat melengkapi liburan Anda".',
      validation: (rule) => rule.required().error('Sub-judul wajib diisi.'),
    }),
    defineField({
      name: 'activities',
      title: 'Daftar Kegiatan',
      type: 'array',
      description: 'Tambahkan daftar kegiatan yang dapat dinikmati oleh pengunjung villa, seperti hiking, spa, atau tur lokal.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'activitiesTitle',
              title: 'Nama Kegiatan',
              type: 'string',
              description: 'Masukkan nama kegiatan. Contoh: "Hiking Gunung", "Tur Budaya", atau "Relaksasi di Spa".',
              validation: (rule) => rule.required().error('Nama kegiatan wajib diisi.'),
            }),
            defineField({
              name: 'activitiesRange',
              title: 'Jarak dari Villa',
              type: 'string',
              description: 'Berikan informasi tentang jarak atau waktu tempuh ke lokasi kegiatan. Contoh: "5 menit berjalan kaki" atau "3 km".',
              validation: (rule) => rule.required().error('Jarak kegiatan wajib diisi.'),
            }),
            defineField({
              name: 'activitiesDescription',
              title: 'Deskripsi Kegiatan',
              type: 'text',
              description: 'Berikan penjelasan singkat tentang kegiatan ini, seperti apa yang akan dilakukan dan mengapa menarik.'
            }),
            defineField({
              name: 'activitiesURL',
              title: 'Link Peta Kegiatan',
              type: 'url',
              description: 'Tambahkan link peta atau lokasi kegiatan ini untuk memudahkan tamu menemukan lokasinya.',
              validation: (rule) =>
                rule.uri({ allowRelative: false }).error('Link harus berupa URL valid.'),
            }),
            defineField({
              name: 'activitiesImage',
              title: 'Gambar Kegiatan',
              type: 'image',
              description: 'Unggah gambar yang merepresentasikan kegiatan ini.',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required().error('Gambar kegiatan wajib diunggah.'),
            }),
          ],
          preview: {
            select: {
              title: 'activitiesTitle',
              media: 'activitiesImage',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug digunakan untuk membuat URL unik untuk halaman ini. Biasanya dihasilkan secara otomatis dari judul.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
});
