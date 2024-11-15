import { defineType } from 'sanity';

export const sectionMetadata = defineType({
  name: 'sectionMetadata',
  title: 'Section Metadata',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'Unique name to identify the section (e.g., "Room Section").',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
  ],
});
