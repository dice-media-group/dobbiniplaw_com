<!-- pages/seo-test.vue - Updated to avoid build conflicts -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">SEO Configuration Test</h1>
    
    <div class="space-y-6">
      <!-- Canonical URL Test -->
      <div class="border p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Canonical URL Test</h2>
        <p><strong>Current Path:</strong> {{ route.path }}</p>
        <p><strong>Generated Canonical URL:</strong> {{ canonicalUrl }}</p>
        <p><strong>Has Trailing Slash:</strong> {{ canonicalUrl.endsWith('/') ? 'YES ❌' : 'NO ✅' }}</p>
      </div>
      
      <!-- Internal Links Test -->
      <div class="border p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Internal Links Test</h2>
        <div class="space-y-2">
          <NuxtLink to="/about" class="text-blue-600 hover:underline block">About Page</NuxtLink>
          <NuxtLink to="/contact" class="text-blue-600 hover:underline block">Contact Page</NuxtLink>
          <NuxtLink to="/patents" class="text-blue-600 hover:underline block">Patents Page</NuxtLink>
          <NuxtLink to="/trademarks" class="text-blue-600 hover:underline block">Trademarks Page</NuxtLink>
        </div>
      </div>
      
      <!-- Trailing Slash Test Links - Only show in client -->
      <div v-if="isClient" class="border p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Trailing Slash Redirect Test</h2>
        <p class="text-sm text-gray-600 mb-2">These links should redirect to versions without trailing slashes:</p>
        <div class="space-y-2">
          <a href="/about/" class="text-red-600 hover:underline block">About Page WITH trailing slash</a>
          <a href="/contact/" class="text-red-600 hover:underline block">Contact Page WITH trailing slash</a>
          <a href="/patents/" class="text-red-600 hover:underline block">Patents Page WITH trailing slash</a>
        </div>
        <p class="text-xs text-gray-500 mt-2">Note: These test links are only visible in the browser to prevent build conflicts.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const isClient = ref(false)

// Use our SEO composable to test canonical URL generation
const { canonicalUrl } = useSEO({
  title: 'SEO Test Page',
  description: 'Testing SEO configuration and trailing slash handling'
})

// Only show test links on client side to avoid build conflicts
onMounted(() => {
  isClient.value = true
})
</script>
