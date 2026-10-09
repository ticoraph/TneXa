import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://tnexa.fr',
  integrations: [mdx(), sitemap()],
  output: 'static',
  trailingSlash: 'never',
});
