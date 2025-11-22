import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import preact from '@astrojs/preact';

import partytown from '@astrojs/partytown';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [preact(), partytown()],
});