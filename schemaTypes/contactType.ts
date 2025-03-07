import { defineType, defineField } from 'sanity';

export const contact = defineType({
  name: 'contact',
  title: 'Bagian Hubungi Kami',
  description: 'Bagian ini berisi informasi kontak yang dapat dihubungi oleh pengunjung.',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      description: 'Judul utama bagian Hubungi Kami, misalnya "Hubungi Kami".',
      type: 'string',
      validation: (rule) => rule.required().error('Judul wajib diisi'),
    }),
    defineField({
      name: 'subTitle',
      title: 'Sub-Judul',
      description: 'Sub-judul yang menjelaskan lebih lanjut bagian kontak ini.',
      type: 'string',
      validation: (rule) => rule.required().error('Sub-judul wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Slug untuk halaman ini, dibuat otomatis dari judul.',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug wajib diisi'),
    }),
    defineField({
      name: 'mapEmbedLink',
      title: 'Tautan Google Maps (Sematan)',
      description: 'Salin dan tempel tautan sematan (embed) Google Maps di sini.',
      type: 'url',
      validation: (rule) => 
        rule.uri({ allowRelative: false }).error('Harus berupa URL sematan Google Maps yang valid'),
    }),
    defineField({
      name: 'address',
      title: 'Alamat',
      description: 'Alamat lengkap yang akan ditampilkan pada bagian kontak.',
      type: 'text',
      validation: (rule) => rule.required().error('Alamat wajib diisi'),
    }),
    defineField({
      name: 'googleMapURL',
      title: 'Tautan Google Maps',
      description: 'Tautan langsung ke lokasi di Google Maps.',
      type: 'url',
      validation: (rule) =>
        rule.uri({ allowRelative: false }).error('Link harus berupa URL valid.'),
    }),
    defineField({
      name: 'email',
      title: 'Alamat Email',
      description: 'Alamat email resmi untuk dihubungi.',
      type: 'string',
      validation: (rule) => rule.required().email().error('Harus berupa alamat email yang valid'),
    }),
    defineField({
      name: 'emailURL',
      title: 'Tautan Email',
      description: 'Tautan untuk membuka email, misalnya "mailto:example@email.com".',
      type: 'url',
      validation: (rule) =>
        rule.uri({ allowRelative: false }).error('Harus berupa URL email yang valid'),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Nomor WhatsApp',
      description: 'Nomor WhatsApp yang dapat dihubungi, dalam format internasional (misalnya +6281234567890).',
      type: 'string',
      validation: (rule) => rule.required().regex(/^\+?[0-9]{10,15}$/, 'Harus berupa nomor telepon yang valid'),    
    }),
    defineField({
      name: 'whatsappURL',
      title: 'Tautan WhatsApp',
      description: 'Tautan langsung ke chat WhatsApp, misalnya "https://wa.me/6281234567890".',
      type: 'url',
      validation: (rule) =>
        rule.uri({ allowRelative: false }).error('Harus berupa URL WhatsApp yang valid'),
    }),
    defineField({
      name: 'socialMedia',
      title: 'Tautan Media Sosial',
      description: 'Tambahkan tautan ke akun media sosial resmi, beserta ikon dan platformnya.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform Media Sosial',
              description: 'Nama platform media sosial, misalnya Instagram, Facebook, atau Twitter.',
              type: 'string',
              validation: (rule) => rule.required().error('Platform wajib diisi'),
            }),
            defineField({
              name: 'icon',
              title: 'Ikon Media Sosial',
              description: 'Unggah ikon resmi dari platform media sosial.',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required().error('Ikon wajib diunggah'),
            }),
            defineField({
              name: 'link',
              title: 'Tautan Media Sosial',
              description: 'Tautan langsung ke halaman media sosial resmi.',
              type: 'url',
              validation: (rule) =>
                rule.uri({ allowRelative: false }).error('Link harus berupa URL valid.'),
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
  ],
});

export default contact;
