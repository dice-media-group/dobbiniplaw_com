<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">✅ Clean SEO + Trailing Slash Test</h1>
    
    <div class="bg-green-50 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">✅ Proper @nuxtjs/seo Setup</h2>
      <div class="space-y-2">
        <p><strong>Route Path:</strong> {{ route.path }}</p>
        <p><strong>Page Title:</strong> {{ pageTitle }}</p>
        <p><strong>SEO Module:</strong> @nuxtjs/seo handles canonical URLs automatically</p>
        <p><strong>Trailing Slashes:</strong> Middleware handles redirects to clean URLs</p>
      </div>
    </div>
    
    <div class="bg-blue-50 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">🧪 Test Navigation (Clean URLs)</h2>
      <p class="mb-4">All links should work properly with clean URLs:</p>
      <div class="space-y-2">
        <div><NuxtLink to="/about" class="text-blue-600 hover:underline">/about</NuxtLink></div>
        <div><NuxtLink to="/copyright" class="text-blue-600 hover:underline">/copyright</NuxtLink></div>
        <div><NuxtLink to="/trademarks" class="text-blue-600 hover:underline">/trademarks</NuxtLink></div>
        <div><NuxtLink to="/patents" class="text-blue-600 hover:underline">/patents</NuxtLink></div>
        <div><NuxtLink to="/contact" class="text-blue-600 hover:underline">/contact</NuxtLink></div>
      </div>
    </div>
    
    <div class="bg-orange-50 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">🔄 Test Trailing Slash Redirects</h2>
      <p class="mb-4">These should redirect to clean URLs (301 redirect):</p>
      <div class="space-y-2">
        <div><a href="/about/" class="text-orange-600 hover:underline">/about/ → /about</a></div>
        <div><a href="/copyright/" class="text-orange-600 hover:underline">/copyright/ → /copyright</a></div>
        <div><a href="/trademarks/" class="text-orange-600 hover:underline">/trademarks/ → /trademarks</a></div>
      </div>
      <p class="text-sm text-gray-600 mt-2">⚠️ These use regular links to test redirect behavior</p>
    </div>
    
    <div class="bg-yellow-50 p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4">🎯 What Each System Handles</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 class="font-bold text-green-700">@nuxtjs/seo handles:</h3>
          <ul class="list-disc pl-6 space-y-1 text-sm">
            <li>Canonical URL generation</li>
            <li>Sitemap.xml creation</li>
            <li>Open Graph tags</li>
            <li>Structured data integration</li>
            <li>Meta tag management</li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-blue-700">Custom middleware handles:</h3>
          <ul class="list-disc pl-6 space-y-1 text-sm">
            <li>Trailing slash redirects (301)</li>
            <li>URL normalization</li>
            <li>Client-side navigation redirects</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// ✅ CLEAN SEO usage
useSEO({
  title: 'SEO + Trailing Slash Test',
  description: 'Testing the properly configured @nuxtjs/seo + trailing slash redirect implementation',
  keywords: 'seo testing, nuxt seo, trailing slash, clean implementation'
})

// Simple computed property for display
const pageTitle = computed(() => {
  return 'SEO + Trailing Slash Test | Dobbin IP Law P.C.'
})
</script>
