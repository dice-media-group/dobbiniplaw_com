<!-- pages/seo-test.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1>SEO Test Page</h1>
    <p>This is a test page to verify SEO meta tags are working correctly.</p>
    
    <div class="mt-8">
      <h2>Expected Meta Tags:</h2>
      <ul class="list-disc ml-6 mt-4">
        <li>robots: index, follow</li>
        <li>googlebot: index, follow</li>
        <li>bingbot: index, follow</li>
        <li>canonical: https://dobbiniplaw.com/seo-test</li>
        <li>title: SEO Test Page | Dobbin IP Law P.C.</li>
        <li>description: Test page for SEO meta tags validation</li>
      </ul>
    </div>
    
    <div class="mt-8">
      <p>
        <strong>Instructions:</strong> View page source to verify meta tags are present.
      </p>
    </div>
  </div>
</template>

<script setup>
// Test the SEO composable
useSEO({
  title: 'SEO Test Page',
  description: 'Test page for SEO meta tags validation',
  path: '/seo-test',
  keywords: 'SEO test, meta tags, robots, indexing'
})
</script>
