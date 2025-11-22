import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import preact from '@astrojs/preact';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.hiroshima-ped.com/',
  output: 'server',
  adapter: vercel(),
  integrations: [preact(), partytown(), sitemap()],
});