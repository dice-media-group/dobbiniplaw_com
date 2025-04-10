// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxt/image'],

  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-light'
    }
  },

  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  app: {
    head: {
      title: 'Dobbin IP Law P.C. | Protecting Your Work',
      meta: [
        { name: 'description', content: 'Dobbin IP Law specializes in obtaining patents to protect your invention, copyrights to protect your authorship, and trademarks to protect your marketing.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap' }
      ]
    }
  },

  // Generate additional routes that don't exist in pages directory
  nitro: {
    prerender: {
      routes: [
        '/prior-work',
        '/resources',
        '/testimonials',
        '/helpful-links'
      ]
    }
  },

  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons'
    ]
  },

  compatibilityDate: '2025-04-08'
})