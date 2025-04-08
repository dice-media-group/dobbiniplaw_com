// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-light'
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'Dobbin IP Law P.C. | Protecting Your Work',
      meta: [
        { name: 'description', content: 'Dobbin IP Law specializes in obtaining patents to protect your invention, copyrights to protect your authorship, and trademarks to protect your marketing.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Generate additional routes that don't exist in pages directory
  nitro: {
    prerender: {
      routes: [
        '/prior-work',
        '/resources',
        '/testimonials'
      ]
    }
  },

  compatibilityDate: '2025-04-08'
})