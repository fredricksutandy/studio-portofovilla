import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    defineField({
      name: 'faqTitle',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitleone',
      title: 'Sub-title-one',
      type: 'string',
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
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
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
