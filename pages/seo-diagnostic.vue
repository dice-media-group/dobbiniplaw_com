<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">🔍 Canonical Redirect Chain Diagnostic</h1>
    
    <div class="bg-red-50 p-6 rounded-lg mb-6 border border-red-200">
      <h2 class="text-xl font-bold mb-4 text-red-800">🚨 Issue Identified</h2>
      <p class="text-red-700 mb-2">
        <strong>Ahrefs found 32 "Canonical points to redirect" issues.</strong>
      </p>
      <p class="text-red-600 text-sm">
        This means canonical URLs are pointing to URLs that redirect (e.g., canonical points to /about/ but /about/ redirects to /about).
      </p>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">🧪 Current Page Analysis</h2>
      <div class="space-y-2 text-sm font-mono">
        <p><strong>Current Path:</strong> {{ route.path }}</p>
        <p><strong>Expected Canonical:</strong> https://dobbiniplaw.com{{ cleanPath }}</p>
        <p><strong>Actual Canonical:</strong> <span id="actual-canonical">Checking...</span></p>
        <p><strong>Trailing Slash Issue:</strong> <span id="trailing-issue">Analyzing...</span></p>
      </div>
      
      <button @click="analyzeCanonical" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Re-analyze Canonical URL
      </button>
    </div>

    <div class="bg-yellow-50 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">🔧 Fix Applied</h2>
      <div class="space-y-2 text-sm">
        <p>✅ <strong>Updated useSEO composable:</strong> Now manually sets canonical URLs without trailing slashes</p>
        <p>✅ <strong>Removed redirectToCanonicalSiteUrl:</strong> Prevents @nuxtjs/seo from generating problematic canonicals</p>
        <p>✅ <strong>Force clean URLs:</strong> All canonical URLs now point to clean versions (no trailing slashes)</p>
      </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">📈 Expected Results</h2>
      <div class="space-y-2 text-sm">
        <p><strong>Before:</strong> Canonical pointed to /about/ → 301 redirect → /about (redirect chain)</p>
        <p><strong>After:</strong> Canonical points directly to /about (no redirect chain)</p>
        <p><strong>Ahrefs Impact:</strong> The 32 canonical redirect issues should resolve in 24-48 hours</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg border">
        <h3 class="font-bold mb-3">🧪 Test Pages</h3>
        <div class="space-y-2">
          <div><NuxtLink to="/about" class="text-blue-600 hover:underline">Test /about canonical</NuxtLink></div>
          <div><NuxtLink to="/copyright" class="text-blue-600 hover:underline">Test /copyright canonical</NuxtLink></div>
          <div><NuxtLink to="/trademarks" class="text-blue-600 hover:underline">Test /trademarks canonical</NuxtLink></div>
          <div><NuxtLink to="/patents" class="text-blue-600 hover:underline">Test /patents canonical</NuxtLink></div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg border">
        <h3 class="font-bold mb-3">🔍 Manual Verification</h3>
        <p class="text-sm mb-3">Check these in browser DevTools:</p>
        <div class="space-y-1 text-xs font-mono">
          <p>1. View page source</p>
          <p>2. Find: &lt;link rel="canonical"</p>
          <p>3. Verify: No trailing slash in href</p>
          <p>4. Test: Visit canonical URL directly</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Calculate what the canonical should be
const cleanPath = computed(() => {
  const path = route.path
  return path === '/' ? '/' : path.replace(/\/+$/, '')
})

function analyzeCanonical() {
  // Check the actual canonical URL on the page
  nextTick(() => {
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    const actualCanonical = canonicalLink ? canonicalLink.href : 'Not found'
    const expectedCanonical = `https://dobbiniplaw.com${cleanPath.value}`
    
    document.getElementById('actual-canonical').textContent = actualCanonical
    
    const hasTrailingSlash = actualCanonical.endsWith('/') && actualCanonical !== 'https://dobbiniplaw.com/'
    const isCorrect = actualCanonical === expectedCanonical
    
    const issueElement = document.getElementById('trailing-issue')
    if (isCorrect) {
      issueElement.textContent = '✅ Canonical URL is correct (no trailing slash)'
      issueElement.className = 'text-green-600'
    } else if (hasTrailingSlash) {
      issueElement.textContent = '❌ Canonical URL has trailing slash'
      issueElement.className = 'text-red-600'
    } else {
      issueElement.textContent = '⚠️ Canonical URL is unexpected'
      issueElement.className = 'text-yellow-600'
    }
  })
}

// Auto-analyze on mount
onMounted(() => {
  analyzeCanonical()
})

// Use our fixed SEO composable
useSEO({
  title: 'Canonical Redirect Chain Diagnostic',
  description: 'Diagnostic tool to identify and fix canonical URL redirect chain issues from Ahrefs report'
})
</script>
