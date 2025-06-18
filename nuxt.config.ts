import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      fs: {
        allow: [
          process.cwd(),
          'C:/Users/nbdhc/node_modules',
          '../'
        ]
      }
    },
    optimizeDeps: {
      include: ['ufo']
    }
  },
  runtimeConfig: {
    adminPassword: '', // NUXT_ADMIN_PASSWORD
  },
  nitro: {
    esbuild: {
      options: {
        target: 'node18'
      }
    }
  }
})
