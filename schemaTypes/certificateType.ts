import { defineType, defineField } from 'sanity';

export const certificate = defineType({
  name: 'certificate',
  title: 'Sertifikasi Villa',
  type: 'document',
  fields: [
    // Title Field
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      description: 'Judul utama untuk bagian sertifikasi. Contoh: "Sertifikasi & Penghargaan"',
      validation: (rule) => rule.required().error('Judul wajib diisi.'),
    }),
    // Subtitle Field
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'string',
      description: 'Penjelasan singkat tentang sertifikasi untuk menarik perhatian. Contoh: "Demi menjamin kualitas terbaik"',
      validation: (rule) => rule.required().min(10).error('Sub-judul wajib diisi dan minimal 10 karakter.'),
    }),
    // Certificates Array
    defineField({
      name: 'certificates',
      title: 'Daftar Sertifikat atau Penghargaan',
      type: 'array',
      description: 'Tambahkan daftar sertifikat atau penghargaan lengkap dengan nama dan gambar.',
      of: [
        {
          type: 'object',
          fields: [
            // Certificate Name Field
            defineField({
              name: 'certificateName',
              title: 'Nama Sertifikat',
              type: 'string',
              description: 'Masukkan nama sertifikat atau penghargaan. Contoh: "ISO 9001", "Green Villa Certification".',
              validation: (rule) => rule.required().error('Nama sertifikat wajib diisi.'),
            }),
            // Certificate Image Field
            defineField({
              name: 'certificateImage',
              title: 'Gambar Sertifikat',
              type: 'image',
              description: 'Unggah gambar sertifikat atau penghargaan.',
              options: {
                hotspot: true, // Enable cropping
              },
              validation: (rule) => rule.required().error('Gambar sertifikat wajib diunggah.'),
            }),
          ],
          // Improved Preview Configuration
          preview: {
            select: {
              title: 'certificateName',
              media: 'certificateImage',
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).error('Minimal 1 sertifikat harus ditambahkan.'),
    }),
    // Slug Field
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug unik untuk URL. Akan dihasilkan otomatis dari judul.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug wajib diisi.'),
    }),
  ],
  // Document Preview Configuration
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
});
 