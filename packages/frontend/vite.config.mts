// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import findWorkspaceRoot from 'find-yarn-workspace-root'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

// Finds the monorepo environment file
const workspaceRoot = findWorkspaceRoot()
const envPath = path.resolve(workspaceRoot, '.env')
const env = dotenv.parse(fs.readFileSync(envPath))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
    Components(),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: {
    'process.env': Object.keys(env).reduce((acc, key) => {
      if (key.startsWith('VITE_') || key === 'NODE_ENV') {
        acc[key] = env[key];
      }
      return acc;
    }, {}),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@frontend': fileURLToPath(new URL('../frontend/src/', import.meta.url)),
      '@backend': fileURLToPath(new URL('../backend/src/', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3001,
  },
})
