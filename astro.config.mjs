// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isBuild = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap(), 
    react(), 
    ...(isBuild ? [] : [keystatic()])
  ]
});