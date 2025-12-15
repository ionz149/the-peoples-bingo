// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ionz149.github.io/the-peoples-bingo/',
  outDir: './docs',
  build: {
    assets: 'assets'
  }
});

defineConfig({ build: {  assets: 'custom-folder' } });
