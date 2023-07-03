import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/cantonesespeechtranscription/",
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ['@babel/plugin-transform-runtime']
      }
    }),
    react(),
  ],
  optimizeDeps: {
    disabled: false,
  },
  build: {
    commonjsOptions: {
      include: [],
      transformMixedEsModules: true,
    },
  }
  
})
