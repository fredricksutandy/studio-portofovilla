import {defineField, defineType} from 'sanity'

export const modalPromoType = defineType({
  name: 'modalPromo',
  title: 'Modal Promo Details',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Modal Promo',
      type: 'string',
      description: 'Tuliskan judul promosi yang menarik perhatian pelanggan. Pastikan singkat dan mudah dipahami. [Contoh: "Diskon Spesial Akhir Pekan"]',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-judul Modal Promo',
      type: 'string',
      description: 'Berikan sub-judul singkat yang menjelaskan lebih detail tentang promosi.'
    }),
    defineField({
        name: 'imageModal',
        title: 'Gambar Modal Promo',
        type: 'image',
        description: 'Unggah gambar yang mendukung promosi. Gambar ini akan ditampilkan di modal promosi untuk menarik perhatian pengunjung.',
        options: {
          hotspot: true,
        },
      }),
    defineField({
      name: 'details',
      title: 'Detail Promosi',
      description: 'Tambahkan poin-poin penting yang menjelaskan detail promosi. Setiap poin memiliki judul dan deskripsi singkat. Poin bisa berupa jumlah diskon, promo ataupun juga syarat ketentuan',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
          defineField({
              name: 'detailTitle',
              title: 'Nama/detail promo',
              type: 'string',
              description: 'Tuliskan judul singkat untuk detail promosi.'
            }),
            defineField({
            name: 'detailDescription',
            title: 'Deskripsi promo',
            type: 'string',
            description: 'Jelaskan poin atau syarat promosi secara lebih rinci.'
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
        source: 'title',  // Automatically generate from the title
        maxLength: 96,    // Optional: Limit the length of the slug
      },
    }),
  ],
});