// import { defineType, defineField } from 'sanity';

// export const contact = defineType({
//   name: 'contact',
//   title: 'Contact Us Section',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'title',
//       title: 'Title',
//       type: 'string',
//     }),
//     defineField({
//       name: 'subTitle',
//       title: 'Sub Title',
//       type: 'string',
//     }),
//     defineField({
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       options: {
//         source: 'title',  // Automatically generate from the title
//         maxLength: 96,       // Optional: Limit the length of the slug
//       },
//     }),
//     defineField({
//       name: 'mapEmbedLink',
//       title: 'Google Maps Embed Link',
//       type: 'url',
//       description: 'Paste the Google Maps embed link here',
//     }),
//     defineField({
//       name: 'address',
//       title: 'Address',
//       type: 'text',
//     }),
//     defineField({
//       name: 'googleMapURL',
//       title: 'Google map URL',
//       type: 'url',
//     }),
//     defineField({
//       name: 'email',
//       title: 'Email',
//       type: 'string',
//     }),
//     defineField({
//       name: 'emailURL',
//       title: 'Email URL',
//       type: 'url',
//     }),
//     defineField({
//       name: 'whatsappNumber',
//       title: 'Whatsapp Number',
//       type: 'string',
//     }),
//     defineField({
//       name: 'whatsappURL',
//       title: 'Whatsapp URL',
//       type: 'url',
//     }),
//     defineField({
//       name: 'socialMedia',
//       title: 'Social Media Links',
//       type: 'array',
//       of: [
//         {
//           type: 'object',
//           fields: [
//             defineField({
//               name: 'platform',
//               title: 'Social Media Platform',
//               type: 'string',
//             }),
//             defineField({
//               name: 'icon',
//               title: 'Social Media Icon',
//               type: 'image',
//               options: {
//                 hotspot: true, // Allows for easy cropping/focal point selection
//               },
//             }),
//             defineField({
//               name: 'link',
//               title: 'Social Media Link',
//               type: 'url',
//             }),
//           ],
//           preview: {
//             select: {
//               title: 'platform',
//               subtitle: 'link',
//               media: 'icon',
//             },
//           },
//         },
//       ],
//       description: 'Add social media platforms with their icon and link',
//     }),
//   ],
// });

// export default contact;


import { defineType, defineField } from 'sanity';

export const contact = defineType({
  name: 'contact',
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
      name: 'contactInfo',
      title: 'Informasi Kontak',
      type: 'array',
      description: 'Tambahkan nomor telepon, email, atau alamat dalam bentuk teks.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Jenis Kontak',
              type: 'string',
              description: 'Jenis kontak, misalnya "Telepon", "Email", atau "Alamat".',
              options: {
                list: [
                  { title: 'Telepon', value: 'phone' },
                  { title: 'Email', value: 'email' },
                  { title: 'Alamat', value: 'address' },
                ],
              },
              validation: (rule) => rule.required().error('Jenis kontak wajib diisi.'),
            }),
            defineField({
              name: 'value',
              title: 'Kontak',
              type: 'text',
              description: 'Masukkan detail kontak. Contoh: "081234567890" untuk Telepon.',
              validation: (rule) => rule.required().error('kontak wajib diisi.'),
            }),
          ],
          preview: {
            select: {
              title: 'type',
              subtitle: 'value',
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

export default contact;
