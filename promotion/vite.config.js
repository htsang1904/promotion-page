// import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh'

// // https://vitejs.dev/config/
// export default () => {
//   return defineConfig({
//     root: './src',
//     base: '',
//     plugins: [reactRefresh()],
//   })
// }
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
  ],
  optimizeDeps: {
    include: ['axios'], // Add any other dependencies you need to transpile
  }, 
  define: {
    'process.env': process.env,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/_variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm.js',
    },
  },
  base: '',
  build: {
    target: 'esnext',
    outDir: 'www',
    rollupOptions: {
      output: {
        entryFileNames: `[name].module.js`,
        chunkFileNames: `[name].module.js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
  server: {
    port: 3030,
  }
})
