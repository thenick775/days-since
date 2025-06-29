import prefresh from '@prefresh/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [prefresh(), visualizer(), VitePWA({ registerType: 'autoUpdate' })],
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
