// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: '/home/', // Replace with your repository name
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'],
//         },
//       },
//     },
//     chunkSizeWarningLimit: 1000,
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  return {
    base: command === 'serve' ? '/' : '/home/', // Use '/' for local dev and '/home/' for production
    plugins: [react()],
    //base: '/application-sondage-interactif/',
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  }
})