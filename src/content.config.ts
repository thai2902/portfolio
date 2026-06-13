import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const appsCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/apps" }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    roi: z.string().optional(),
    short: z.string().optional(),
    why: z.string().optional(),
    features: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'apps': appsCollection,
};
