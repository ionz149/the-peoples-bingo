// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ionz149.github.io/the-peoples-bingo',
  base: '/docs',
  outDir: './docs',
  build: {
    assets: 'assets'
  }
});


