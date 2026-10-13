import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://tnexa.fr',
  integrations: [mdx()],
  output: 'static',
  trailingSlash: 'never',
});
