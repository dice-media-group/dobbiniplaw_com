<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">SEO Canonical URL Testing</h1>
    
    <div class="bg-gray-100 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">Current Page Analysis</h2>
      <div class="space-y-2">
        <p><strong>Route Path:</strong> {{ route.path }}</p>
        <p><strong>Clean Path:</strong> {{ seoData.cleanPath }}</p>
        <p><strong>Canonical URL:</strong> {{ seoData.canonicalUrl }}</p>
        <p><strong>Page Title:</strong> {{ seoData.fullTitle }}</p>
      </div>
    </div>
    
    <div class="bg-blue-50 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">Test URLs</h2>
      <p class="mb-4">Click these links to test trailing slash redirects:</p>
      <div class="space-y-2">
        <div><NuxtLink to="/about/" class="text-blue-600 hover:underline">/about/ (should redirect to /about)</NuxtLink></div>
        <div><NuxtLink to="/copyright/" class="text-blue-600 hover:underline">/copyright/ (should redirect to /copyright)</NuxtLink></div>
        <div><NuxtLink to="/trademarks/" class="text-blue-600 hover:underline">/trademarks/ (should redirect to /trademarks)</NuxtLink></div>
        <div><NuxtLink to="/patents/" class="text-blue-600 hover:underline">/patents/ (should redirect to /patents)</NuxtLink></div>
        <div><NuxtLink to="/services/" class="text-blue-600 hover:underline">/services/ (should redirect to /services)</NuxtLink></div>
      </div>
    </div>
    
    <div class="bg-green-50 p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4">Expected Behavior</h2>
      <ul class="list-disc pl-6 space-y-1">
        <li>All URLs with trailing slashes should redirect to clean URLs</li>
        <li>Canonical URLs should never have trailing slashes (except root /)</li>
        <li>Redirects should be 301 (permanent)</li>
        <li>No redirect chains should occur</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Test our enhanced SEO function
const seoData = useSEO({
  title: 'SEO Testing Page',
  description: 'Testing canonical URL handling and redirect behavior',
  path: '/seo-test',
  keywords: 'seo testing, canonical urls, redirects'
})

console.log('SEO Test Data:', seoData)
</script>
