import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      description: 'Pilih salah satu dari contoh berikut: [Frequently Asked Questions] / [Pertanyaan yang Sering Ditanyakan].',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'faqTitle',  // Automatically generate from the title
        maxLength: 96,       // Optional: Limit the length of the slug
      },
    }),
    defineField({
      name: 'faqs',  // Field name for the FAQ content
      title: 'Pertanyaan yang Sering Ditanyakan (FAQs)',
      description: 'Gunakan bagian ini untuk menambahkan daftar pertanyaan yang sering diajukan beserta jawabannya. Pastikan informasi yang dimasukkan relevan dengan kebutuhan pengunjung atau tamu.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Pertanyaan',
              type: 'string',
              description: 'Tuliskan pertanyaan umum yang sering muncul dari pengunjung atau calon tamu. Fokus pada hal-hal yang relevan dengan pengalaman mereka di villa.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Jawaban',
              type: 'text',
              description: 'Berikan jawaban yang singkat, jelas, dan langsung menjawab pertanyaan. Jika perlu, tambahkan detail penting yang bisa membantu tamu memahami lebih baik.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),
  ],
});
