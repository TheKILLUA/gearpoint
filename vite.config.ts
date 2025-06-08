import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import mpa from 'vite-plugin-mpa'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    mpa({
      open: '/',
      scanDir: 'src/pages',
      scanFile: 'main.ts',
      filename: 'index.html'
    }),
    createHtmlPlugin({
      inject: {
        data: {
          VITE_SITE_TITLE: process.env.VITE_SITE_TITLE,
          VITE_SITE_DESCRIPTION: process.env.VITE_SITE_DESCRIPTION,
        },
      },
    }),
  ],
})
