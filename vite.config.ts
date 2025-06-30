import prefresh from '@prefresh/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  base: './',
  plugins: [
    prefresh(),
    visualizer(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Days Since',
        short_name: 'days-since',
        description: 'A web app that visualizes time passed since any event',
        background_color: '#141414',
        theme_color: '#242424',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'desktop.png',
            sizes: '944x900',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Desktop Days Since',
          },
          {
            src: 'mobile.png',
            sizes: '1170x2532',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Mobile Days Since',
          },
        ],
      },
    }),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h } from 'preact'`,
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const vendorPrefix = 'vendor';
          if (id.indexOf('node_modules') > -1) {
            if (id.indexOf('recharts') > -1) return vendorPrefix + '_recharts';
            if (id.indexOf('mantine') > -1) return vendorPrefix + '_mantine';

            return vendorPrefix;
          }
        },
      },
      onwarn: (warning, defaultHandler) => {
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          warning.message.includes('use client')
        ) {
          return;
        }
        defaultHandler(warning);
      },
    },
  },
});
