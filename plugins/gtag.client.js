export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gtag = config.public.gtag

  if (gtag) {
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gtag}`,
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag}');
          `,
          type: 'text/javascript'
        }
      ]
    })
  }
})