import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import preact from '@astrojs/preact';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [preact()],
});
