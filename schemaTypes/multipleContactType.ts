import { defineType, defineField } from 'sanity';

export const multipleContact = defineType({
  name: 'multipleContact',
  title: 'Hubungi Kami',
  type: 'document',
  description: 'Bagian ini digunakan untuk menampilkan informasi kontak, sosial media, dan lokasi di Google Maps.',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      description: 'Judul utama untuk section Hubungi Kami. Contoh: "Hubungi Kami".',
      validation: (rule) => rule.required().error('Judul wajib diisi.'),
    }),
    defineField({
      name: 'subTitle',
      title: 'Sub-judul',
      type: 'text',
      description: 'Sub-judul untuk memberikan konteks tambahan. Contoh: "Kami siap membantu Anda kapan saja".',
      validation: (rule) => rule.required().error('Sub-judul wajib diisi.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug digunakan untuk membuat URL unik untuk halaman ini.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    // Bagian Sosial Media
    defineField({
      name: 'socialMedia',
      title: 'Sosial Media',
      type: 'array',
      description: 'Tambahkan daftar platform media sosial dengan link dan ikon.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Nama Platform/Sosial Media',
              type: 'string',
              description: 'Nama platform media sosial. Contoh: "Instagram", "Facebook".',
              validation: (rule) => rule.required().error('Nama platform wajib diisi.'),
            }),
            defineField({
              name: 'link',
              title: 'URL Platform/Sosial Media',
              type: 'url',
              description: 'URL ke profil platfom & media sosial Anda.',
              validation: (rule) =>
                rule.uri({ allowRelative: false }).error('Harus berupa URL valid.'),
            }),
            defineField({
              name: 'icon',
              title: 'Ikon Media Sosial',
              type: 'image',
              description: 'Unggah ikon untuk platform ini.',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required().error('Ikon wajib diunggah.'),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'link',
              media: 'icon',
            },
          },
        },
      ],
    }),
    // Bagian Kontak
    defineField({
      name: 'phoneInfo',
      title: 'Nomor Telepon',
      type: 'array',
      description: 'Tambahkan nomor telepon untuk menghubungi villamu',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'phoneName',
              title: 'Nama Pemilik Kontak',
              type: 'string',
              description: 'Masukkan nama pemilik kontak yang akan dihubungi. Contoh: "Hubungi Sales Adelia"',
              validation: (rule) => rule.required().error('nama pemilik kontak wajib diisi.'),
            }),
            defineField({
              name: 'phoneNumber',
              title: 'NomorKontak',
              type: 'string',
              description: 'Masukkan detail kontak. Contoh: "081234567890"',
              validation: (rule) => rule.required().error('nomor kontak wajib diisi.'),
            }),
            defineField({
              name: 'phoneUrl',
              title: 'Link nomor Whatsapp (jika ada)',
              type: 'url',
              description: 'Masukkan link nomor Whatsapp pemilik kontak.',
              validation: (rule) =>
                rule.uri({ allowRelative: false }).error('Link harus berupa URL valid.'),
            }),
          ],
          preview: {
            select: {
              title: 'phoneName',
              subtitle: 'phoneNumber',
            },
            prepare({ title, subtitle }) {
              return {
                title: title,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'emailInfo',
      title: 'Alamat E-mail',
      type: 'array',
      description: 'Tambahkan alamat E-mail untuk menghubungi villamu',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'emailName',
              title: 'Nama E-mail',
              type: 'string',
              description: 'Masukkan nama pemilik E-mail yang akan dihubungi. Contoh: "E-mail Sales Adelia"',
              validation: (rule) => rule.required().error('nama pemilik email wajib diisi.'),
            }),
            defineField({
              name: 'emailAddress',
              title: 'Alamat E-mail',
              type: 'string',
              description: 'Masukkan alamat E-mail. Contoh: "Adelia@gmail.com"',
              validation: (rule) => rule.required().email().error('Harus berupa alamat email yang valid'),
            }),
          ],
          preview: {
            select: {
              title: 'emailName',
              subtitle: 'emailAddress',
            },
            prepare({ title, subtitle }) {
              return {
                title: title,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'addressInfo',
      title: 'Alamat Villa',
      type: 'array',
      description: 'Tambahkan alamat villa untuk dituju oleh pengguna',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'addressName',
              title: 'Nama Villamu',
              type: 'string',
              description: 'Masukkan nama alamat villa yang tertera. Isi data ini jika kamu memiliki lebih dari 1 villa agar memudahkan pengunjung untuk membedakan villamu. Contoh: "Villa Gunung Batur Kamar Melati"'
            }),
            defineField({
              name: 'addressDetail',
              title: 'Alamat Villamu',
              type: 'text',
              description: 'Masukkan detail alamat villamu. Contoh: "Jl. Puncak Dua, Wargajaya, Kec. Sukamakmur, Kabupaten Bogor, Jawa Barat 16830"',
              validation: (rule) => rule.required().error('alamat villa wajib diisi.'),
            }),
            defineField({
              name: 'addressUrl',
              title: 'URL Map Alamat Villamu',
              type: 'url',
              description: 'Masukkan link google map alamat villamu.',
              validation: (rule) =>
                rule.uri({ allowRelative: false }).error('Link harus berupa URL valid.'),
            }),
          ],
          preview: {
            select: {
              title: 'addressName'
            },
            prepare({ title, subtitle }) {
              return {
                title: title,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    }),
    // Bagian URL Google Maps
    defineField({
      name: 'mapEmbedLink',
      title: 'Link Google Maps Embed URL',
      type: 'url',
      description: 'Masukkan link embed dari Google Maps untuk lokasi villa Anda.',
      validation: (rule) =>
        rule.uri({ allowRelative: false }).error('Harus berupa google map embed URL valid.'),
    }),
    defineField({
      name: 'googleMapURL',
      title: 'Link Google Maps',
      type: 'url',
      description: 'Masukkan URL ke lokasi di Google Maps.',
      validation: (rule) =>
        rule.uri({ allowRelative: false }).error('Harus berupa URL valid.'),
    }),
  ],
});

export default multipleContact;
