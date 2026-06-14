import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const appsCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/apps" }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    category: z.string().optional().default('Other'),
    roi: z.string().optional(),
    short: z.string().optional(),
    why: z.string().optional(),
    features: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    videoUrl: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = {
  'apps': appsCollection,
};
