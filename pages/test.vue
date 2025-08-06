<!-- pages/test.vue - Simple test page to verify basic functionality -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Simple Test Page</h1>
    
    <div class="space-y-4">
      <p><strong>Current URL:</strong> {{ currentUrl }}</p>
      <p><strong>Route Path:</strong> {{ route.path }}</p>
      <p><strong>Route Full Path:</strong> {{ route.fullPath }}</p>
      <p><strong>Time:</strong> {{ new Date().toISOString() }}</p>
      
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2">Test Links:</h2>
        <div class="space-y-2">
          <NuxtLink to="/" class="text-blue-600 hover:underline block">Home (no slash)</NuxtLink>
          <NuxtLink to="/about" class="text-blue-600 hover:underline block">About (no slash)</NuxtLink>
          <NuxtLink to="/contact" class="text-blue-600 hover:underline block">Contact (no slash)</NuxtLink>
        </div>
      </div>
      
      <div class="mt-6 p-4 bg-green-100 rounded">
        <p><strong>Status:</strong> This page loaded successfully! No redirect loops detected.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const currentUrl = computed(() => {
  if (process.client) {
    return window.location.href
  }
  return 'Server-side rendering'
})

// Set basic SEO
useHead({
  title: 'Test Page',
  meta: [
    { name: 'description', content: 'Simple test page to verify site functionality' }
  ]
})
</script>
