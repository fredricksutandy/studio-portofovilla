import { defineType, defineField } from 'sanity';

export const contact = defineType({
  name: 'contact',
  title: 'Contact Us Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',  // Automatically generate from the title
        maxLength: 96,       // Optional: Limit the length of the slug
      },
    }),
    defineField({
      name: 'mapEmbedLink',
      title: 'Google Maps Embed Link',
      type: 'url',
      description: 'Paste the Google Maps embed link here',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'googleMapURL',
      title: 'Google map URL',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'emailURL',
      title: 'Email URL',
      type: 'url',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Whatsapp Number',
      type: 'string',
    }),
    defineField({
      name: 'whatsappURL',
      title: 'Whatsapp URL',
      type: 'url',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Social Media Platform',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Social Media Icon',
              type: 'image',
              options: {
                hotspot: true, // Allows for easy cropping/focal point selection
              },
            }),
            defineField({
              name: 'link',
              title: 'Social Media Link',
              type: 'url',
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
      description: 'Add social media platforms with their icon and link',
    }),
  ],
});

export default contact;
