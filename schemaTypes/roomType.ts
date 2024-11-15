import { defineType, defineField } from 'sanity';

export const room = defineType({
    name: 'room',
    title: 'Room Section',
    type: 'document',
    fields: [
      { name: 'name', title: 'Room Name', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
      { name: 'description', title: 'Room Description', type: 'text' },
      { name: 'price', title: 'Price', type: 'number' },
      {
        name: 'images',
        title: 'Room Images',
        type: 'array',
        of: [{ type: 'image', options: { hotspot: true } }],
      },
    ],
});
