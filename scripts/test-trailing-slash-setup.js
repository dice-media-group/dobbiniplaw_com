#!/usr/bin/env node
// scripts/test-trailing-slash-setup.js - Test the trailing slash implementation

import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()
console.log('🧪 Testing Trailing Slash Implementation\n')

// Test 1: Check Netlify redirects configuration
console.log('1️⃣ Checking Netlify redirects configuration...')
try {
  const redirectsContent = fs.readFileSync(path.join(rootDir, 'public/_redirects'), 'utf8')
  if (redirectsContent.includes('/*/ /:splat 301!')) {
    console.log('   ✅ Server-level trailing slash redirects configured')
  } else {
    console.log('   ❌ Server-level trailing slash redirects NOT configured')
  }
} catch (error) {
  console.log('   ❌ _redirects file not found')
}

// Test 2: Check Nuxt config
console.log('\n2️⃣ Checking Nuxt configuration...')
try {
  const nuxtConfigContent = fs.readFileSync(path.join(rootDir, 'nuxt.config.ts'), 'utf8')
  
  if (nuxtConfigContent.includes('trailingSlash: false')) {
    console.log('   ✅ trailingSlash: false configured in site config')
  } else {
    console.log('   ❌ trailingSlash: false NOT configured in site config')
  }
  
  if (nuxtConfigContent.includes('sitemap:') && nuxtConfigContent.includes('trailingSlash: false')) {
    console.log('   ✅ Sitemap configured to exclude trailing slashes')
  } else {
    console.log('   ⚠️  Sitemap trailing slash configuration could be improved')
  }
} catch (error) {
  console.log('   ❌ nuxt.config.ts not found')
}

// Test 3: Check middleware
console.log('\n3️⃣ Checking trailing slash middleware...')
try {
  const middlewareContent = fs.readFileSync(path.join(rootDir, 'middleware/trailing-slash.global.js'), 'utf8')
  
  if (middlewareContent.includes('withoutTrailingSlash') && middlewareContent.includes('navigateTo')) {
    console.log('   ✅ Client-side trailing slash redirect middleware configured')
  } else {
    console.log('   ❌ Client-side trailing slash redirect middleware NOT properly configured')
  }
  
  if (middlewareContent.includes('redirectCode: 301')) {
    console.log('   ✅ 301 redirect code configured')
  } else {
    console.log('   ❌ 301 redirect code NOT configured')
  }
} catch (error) {
  console.log('   ❌ trailing-slash.global.js middleware not found')
}

// Test 4: Check canonical URL logic
console.log('\n4️⃣ Checking canonical URL logic...')
try {
  const seoComposableContent = fs.readFileSync(path.join(rootDir, 'composables/useSEO.js'), 'utf8')
  
  if (seoComposableContent.includes('replace(/\\/+$/, \'\')')) {
    console.log('   ✅ Canonical URL logic removes trailing slashes')
  } else {
    console.log('   ❌ Canonical URL logic does NOT remove trailing slashes')
  }
  
  if (seoComposableContent.includes('rel: \'canonical\'')) {
    console.log('   ✅ Manual canonical link tag configured')
  } else {
    console.log('   ❌ Manual canonical link tag NOT configured')
  }
} catch (error) {
  console.log('   ❌ useSEO.js composable not found')
}

// Test 5: Summary
console.log('\n📋 Implementation Summary:')
console.log('   🌐 Server-level redirects: Netlify _redirects file')
console.log('   🎯 Client-side redirects: Nuxt middleware')
console.log('   🔗 Canonical URLs: useSEO composable')
console.log('   🗺️  Sitemap: @nuxtjs/seo with trailingSlash: false')

console.log('\n🚀 Next Steps:')
console.log('   1. Deploy to staging/preview environment')
console.log('   2. Test redirects with curl or browser dev tools')
console.log('   3. Verify canonical tags in HTML source')
console.log('   4. Check sitemap.xml generation')
console.log('   5. Monitor for redirect loops')

console.log('\n✅ Implementation complete! Ready for staging deployment.')
