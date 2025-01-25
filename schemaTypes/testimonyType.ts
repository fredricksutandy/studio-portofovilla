import { defineType, defineField } from 'sanity';

export const testimony = defineType({
  name: 'testimony',
  title: 'Bagian Testimoni',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Utama',
      type: 'string',
      description: 'Judul utama untuk bagian testimoni.',
      validation: (Rule) => Rule.required().min(5).max(50).warning('Judul harus antara 5-50 karakter.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul',
      type: 'string',
      description: 'Sub-judul yang memberikan konteks lebih lanjut mengenai testimoni.',
      validation: (Rule) => Rule.max(100).warning('Sub-judul sebaiknya tidak lebih dari 100 karakter.'),
    }),
    defineField({
      name: 'testimonies',
      title: 'Testimoni',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'testimonyHighlight',
              title: 'Sorotan Testimoni',
              type: 'string',
              description: 'Sorotan atau kalimat singkat yang merangkum testimoni.',
              validation: (Rule) => Rule.max(100).warning('Sorotan testimoni sebaiknya tidak lebih dari 100 karakter.'),
            }),
            defineField({
              name: 'testimonyRating',
              title: 'Peringkat Testimoni',
              type: 'string',
              description: 'Pilih peringkat untuk testimoni, antara 1 hingga 5.',
              options: {
                list: [
                  { title: '1', value: '1' },
                  { title: '2', value: '2' },
                  { title: '3', value: '3' },
                  { title: '4', value: '4' },
                  { title: '5', value: '5' },
                ],
                layout: 'dropdown', // Menampilkan sebagai dropdown
              },
              validation: (Rule) => Rule.required().error('Peringkat harus dipilih.'),
            }),            
            defineField({
              name: 'testimony',
              title: 'Testimoni',
              type: 'text',
              description: 'Isi lengkap dari testimoni yang diberikan oleh pelanggan.',
              validation: (Rule) => Rule.required().min(10).warning('Testimoni harus lebih dari 10 karakter.'),
            }),
            defineField({
              name: 'testimonyName',
              title: 'Nama Pemberi Testimoni',
              type: 'string',
              description: 'Nama orang yang memberikan testimoni.',
              validation: (Rule) => Rule.required().min(3).max(50).warning('Nama harus antara 3-50 karakter.'),
            }),
            defineField({
              name: 'testimonyFrom',
              title: 'Asal Testimoni',
              type: 'string',
              description: 'Dari mana testimoni ini berasal (misalnya kota, negara).',
              validation: (Rule) => Rule.max(50).warning('Asal testimoni sebaiknya tidak lebih dari 50 karakter.'),
            }),
            defineField({
              name: 'testimonyImage',
              title: 'Gambar Testimoni',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Gambar yang menyertai testimoni, biasanya foto pemberi testimoni.',
              validation: (Rule) => Rule.required().error('Gambar testimoni wajib diunggah.'),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',  // Membuat slug otomatis berdasarkan title
        maxLength: 96,    // Batasi panjang slug
      },
      description: 'Slug ini digunakan untuk URL halaman testimoni.',
      validation: (Rule) => Rule.required().error('Slug wajib diisi.'),
    }),
  ],
});
