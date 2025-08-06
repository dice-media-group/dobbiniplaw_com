<!-- pages/test.vue - Enhanced debugging for redirect issues -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Redirect Debug Test</h1>
    
    <div class="space-y-4">
      <div class="p-4 bg-green-100 rounded">
        <h2 class="font-bold text-green-800">✅ SUCCESS: This page loaded without redirect loops!</h2>
        <p class="text-green-700">If you can see this, the basic site is working.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border rounded">
          <h3 class="font-semibold mb-2">Current URL Info</h3>
          <p><strong>Full URL:</strong> {{ currentUrl }}</p>
          <p><strong>Hostname:</strong> {{ hostname }}</p>
          <p><strong>Pathname:</strong> {{ pathname }}</p>
          <p><strong>Route Path:</strong> {{ route.path }}</p>
          <p><strong>Route Full Path:</strong> {{ route.fullPath }}</p>
        </div>
        
        <div class="p-4 border rounded">
          <h3 class="font-semibold mb-2">Environment</h3>
          <p><strong>Process Client:</strong> {{ process.client }}</p>
          <p><strong>Dev Mode:</strong> {{ isDev }}</p>
          <p><strong>Timestamp:</strong> {{ timestamp }}</p>
        </div>
      </div>
      
      <div class="p-4 border rounded">
        <h3 class="font-semibold mb-2">Test Navigation</h3>
        <p class="text-sm text-gray-600 mb-3">These should work without redirect loops:</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <NuxtLink to="/" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">Home</NuxtLink>
          <NuxtLink to="/about" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">About</NuxtLink>
          <NuxtLink to="/contact" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">Contact</NuxtLink>
          <NuxtLink to="/patents" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">Patents</NuxtLink>
        </div>
      </div>
      
      <div class="p-4 border rounded bg-yellow-50">
        <h3 class="font-semibold mb-2">⚠️ Dangerous Test Links (may cause redirects)</h3>
        <p class="text-sm text-gray-600 mb-3">Only click these if you're testing redirect behavior:</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <a href="/about/" class="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-center">About/</a>
          <a href="/contact/" class="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-center">Contact/</a>
          <a href="/patents/" class="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-center">Patents/</a>
          <a href="/" class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-center">Home/</a>
        </div>
      </div>
      
      <div class="p-4 border rounded">
        <h3 class="font-semibold mb-2">Browser Info</h3>
        <div id="browser-info" class="text-sm">
          <p><strong>User Agent:</strong> <span id="user-agent">Loading...</span></p>
          <p><strong>Referrer:</strong> <span id="referrer">Loading...</span></p>
          <p><strong>History Length:</strong> <span id="history-length">Loading...</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { $router } = useNuxtApp()

const isDev = process.dev
const timestamp = new Date().toISOString()

const currentUrl = ref('Server-side rendering')
const hostname = ref('')
const pathname = ref('')

onMounted(() => {
  if (process.client) {
    currentUrl.value = window.location.href
    hostname.value = window.location.hostname
    pathname.value = window.location.pathname
    
    // Additional browser info
    document.getElementById('user-agent').textContent = navigator.userAgent
    document.getElementById('referrer').textContent = document.referrer || 'None'
    document.getElementById('history-length').textContent = history.length.toString()
  }
})

// Minimal head management (no SEO module)
useHead({
  title: 'Redirect Debug Test',
  meta: [
    { name: 'description', content: 'Testing redirect behavior and site functionality' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
