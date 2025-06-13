export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const ahrefsKey = config.public.ahrefsKey

  // Only load if the environment variable is set
  if (ahrefsKey) {
    useHead({
      script: [
        {
          src: 'https://analytics.ahrefs.com/analytics.js',
          'data-key': ahrefsKey,
          async: true
        }
      ]
    })
  }
})