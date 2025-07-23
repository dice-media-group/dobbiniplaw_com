<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">✅ Clean SEO Implementation Test</h1>
    
    <div class="bg-green-50 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">✅ Proper @nuxtjs/seo Setup</h2>
      <div class="space-y-2">
        <p><strong>Route Path:</strong> {{ route.path }}</p>
        <p><strong>Page Title:</strong> {{ pageTitle }}</p>
        <p><strong>SEO Module:</strong> @nuxtjs/seo handles all canonical URLs automatically</p>
        <p><strong>Trailing Slashes:</strong> Disabled site-wide via config</p>
      </div>
    </div>
    
    <div class="bg-blue-50 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">🧪 Test Navigation</h2>
      <p class="mb-4">All links should work properly with clean URLs:</p>
      <div class="space-y-2">
        <div><NuxtLink to="/about" class="text-blue-600 hover:underline">/about</NuxtLink></div>
        <div><NuxtLink to="/copyright" class="text-blue-600 hover:underline">/copyright</NuxtLink></div>
        <div><NuxtLink to="/trademarks" class="text-blue-600 hover:underline">/trademarks</NuxtLink></div>
        <div><NuxtLink to="/patents" class="text-blue-600 hover:underline">/patents</NuxtLink></div>
        <div><NuxtLink to="/contact" class="text-blue-600 hover:underline">/contact</NuxtLink></div>
      </div>
    </div>
    
    <div class="bg-yellow-50 p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4">🎯 What @nuxtjs/seo Handles Automatically</h2>
      <ul class="list-disc pl-6 space-y-1">
        <li>Canonical URL generation (no trailing slashes)</li>
        <li>Sitemap.xml creation</li>
        <li>Robots.txt (with our override)</li>
        <li>URL normalization and redirects</li>
        <li>Open Graph and Twitter cards</li>
        <li>Structured data integration</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// ✅ CLEAN SEO usage
useSEO({
  title: 'Clean SEO Test Page',
  description: 'Testing the properly configured @nuxtjs/seo implementation',
  keywords: 'seo testing, nuxt seo, clean implementation'
})

// Simple computed property for display
const pageTitle = computed(() => {
  return 'Clean SEO Test Page | Dobbin IP Law P.C.'
})
</script>
