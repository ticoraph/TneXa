import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';

/** GFM transforme les e-mails du texte en liens : seul celui du pied de page (hors MDX) reste cliquable. */
const unlinkEmails = {
  name: 'unlink-emails',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      if (String(node.properties?.href ?? '').startsWith('mailto:')) ctx.replaceNode(node, node.children);
    },
  },
};

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://tnexa.fr',
  markdown: { processor: satteri({ hastPlugins: [unlinkEmails] }) },
  integrations: [mdx()],
  output: 'static',
  trailingSlash: 'never',
});
