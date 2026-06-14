import { config, fields, collection, singleton } from '@keystatic/core';

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
        publishStatus: fields.select({
          label: 'Publish Status',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Unpublished', value: 'unpublished' }
          ],
          defaultValue: 'unpublished'
        }),
        category: fields.text({ label: 'Category', defaultValue: 'Other' }),
        short: fields.text({ label: 'Short Description', multiline: true }),
        features: fields.text({ label: 'Features (Overview)', multiline: true }),
        featured: fields.checkbox({ label: 'Featured Project', defaultValue: false }),
        videoUrl: fields.url({ label: 'YouTube / Vimeo URL' }),
        gallery: fields.array(
          fields.image({
            label: 'Gallery Image',
            directory: 'public/images/apps',
            publicPath: '/images/apps'
          }),
          {
            label: 'Image Gallery',
            itemLabel: props => props.value ? 'Image' : 'Empty Image'
          }
        ),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),
  },
  singletons: {
    seo: singleton({
      label: 'SEO Settings',
      path: 'src/data/seo',
      format: { data: 'json' },
      schema: {
        siteTitle: fields.text({ label: 'Global Site Title', defaultValue: 'Digital Portfolio' }),
        siteDescription: fields.text({ label: 'Global Site Description', multiline: true }),
        ogImage: fields.image({
          label: 'Global Open Graph Image',
          directory: 'public/images/seo',
          publicPath: '/images/seo'
        }),
        authorName: fields.text({ label: 'Author Name (for JSON-LD)' }),
        twitterHandle: fields.text({ label: 'Twitter Handle' }),
      }
    }),
    settings: singleton({
      label: 'Global Settings',
      path: 'src/data/settings',
      format: { data: 'json' },
      schema: {
        portfolioOwner: fields.text({ label: 'Owner Name (Footer)' }),
        contactEmail: fields.text({ label: 'Contact Email (CTA)' }),
        availableForHire: fields.checkbox({ label: 'Available for freelance work', defaultValue: true }),
      }
    })
  },
});
