import {defineField, defineType} from 'sanity'

export const modalPromoType = defineType({
  name: 'modalPromo',
  title: 'Modal Promo Details',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-title',
      type: 'string',
    }),
    defineField({
        name: 'imageModal',
        title: 'Image Modal',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
                name: 'detailTitle',
                title: 'Detail Title',
                type: 'string',
              }),
            defineField({
            name: 'detailDescription',
            title: 'Detail Description',
            type: 'string',
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