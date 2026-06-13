import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    apps: collection({
      label: 'Projects / Apps',
      slugField: 'title',
      path: 'src/content/apps/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        id: fields.integer({ label: 'Sort ID (Number)' }),
        status: fields.text({ label: 'Status', defaultValue: 'Coming soon...' }),
        category: fields.text({ label: 'Category', defaultValue: 'Other' }),
        roi: fields.text({ label: 'Impact / ROI' }),
        short: fields.text({ label: 'Short Description', multiline: true }),
        why: fields.text({ label: 'Why this project?', multiline: true }),
        features: fields.text({ label: 'Features (Overview)', multiline: true }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/images/apps',
          publicPath: '/images/apps'
        }),
        featured: fields.checkbox({ label: 'Featured Project', defaultValue: false }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),
  },
});
