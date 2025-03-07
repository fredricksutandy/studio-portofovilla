import { defineType, defineField } from 'sanity';

export const trivia = defineType({
  name: 'trivia',
  title: 'Trivia Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'isi dengan : "Trivia"',
    }),
    defineField({
      name: 'triviaSection',
      title: 'Trivia Section',
      type: 'array',
      description: 'Bagian ini menampilkan fakta menarik tentang villa (maksimal 4 item)',
      validation: (Rule) => Rule.max(4).error('Maksimal hanya bisa menambahkan 4 trivia'),
      of: [
        defineField({
          name: 'triviaItem',
          title: 'Trivia',
          type: 'object',
          fields: [
            defineField({
              name: 'triviaImage',
              title: 'Icon Informasi',
              type: 'image',
              description: 'Unggah gambar icon informasi untuk memberikan gambaran visual kepada pengunjung.',
              options: {
                hotspot: true, // Memungkinkan cropping gambar di Sanity
              },
              validation: (rule) => rule.required().error('Gambar icon informasi wajib diunggah.'),
            }),
            defineField({
              name: 'number',
              title: 'Angka',
              type: 'string',
              description: 'Angka yang merepresentasikan fakta (contoh: 100+)',
              validation: (Rule) => Rule.required().error('Angka harus diisi'),
            }),
            defineField({
              name: 'title',
              title: 'Judul',
              type: 'string',
              description: 'Judul singkat dari fakta menarik ini',
              validation: (Rule) => Rule.required().max(50).error('Judul harus diisi dan maksimal 50 karakter'),
            }),
            defineField({
              name: 'description',
              title: 'Deskripsi',
              type: 'text',
              description: 'Penjelasan singkat tentang fakta menarik ini',
              validation: (Rule) => Rule.required().max(200).error('Deskripsi harus diisi dan maksimal 200 karakter'),
            }),
          ],
        }),
      ],
    }),

    // Recommendations Section
    defineField({
      name: 'recommendationSection',
      title: 'Rekomendasi',
      type: 'array',
      description: 'Bagian ini menampilkan rekomendasi dari pelanggan atau pihak lain (maksimal 4 item)',
      validation: (Rule) => Rule.max(4).error('Maksimal hanya bisa menambahkan 4 rekomendasi'),
      of: [
        defineField({
          name: 'recommendationItem',
          title: 'Rekomendasi',
          type: 'object',
          fields: [
            defineField({
              name: 'recommendedBy',
              title: 'Direkomendasikan Oleh',
              type: 'string',
              description: 'Nama orang atau organisasi yang memberikan rekomendasi',
              validation: (Rule) => Rule.required().error('Nama pemberi rekomendasi harus diisi'),
            }),
            defineField({
              name: 'recommendation',
              title: 'Judul Artikel/Rekomendasi',
              type: 'text',
              description: 'Isi judul dan highlight rekomendasi atau testimoni',
              validation: (Rule) => Rule.required().max(300).error('Rekomendasi harus diisi dan maksimal 300 karakter'),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Tautan ke sumber rekomendasi jika ada',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }).error('URL harus valid (contoh: https://example.com)'),
            }),
          ],
        }),
      ],
    }),
    

    // Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug digunakan sebagai URL unik untuk halaman ini',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug harus diisi'),
    }),
  ],
});
