<template>
  <div>
    <!-- Hero section with navy background -->
    <HeroBanner 
      title="Thank You!" 
      bgColor="bg-dobbin-navy"
      titleSize="text-5xl"
      titleTag="h1"      
    >
      <p class="mb-4 font-crimson text-white"></p>
    </HeroBanner>
    
    <!-- Main content section -->
    <div class="py-12">
      <div class="container mx-auto px-8">
        <div class="max-w-[800px] mx-auto text-center font-crimson">
          <div class="bg-green-50 border border-green-200 rounded-lg p-8 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            
            <h2 class="text-2xl font-semibold text-dobbin-dark-green mb-4">Message Received!</h2>
            
            <p class="text-lg mb-6">Thank you for contacting Dobbin IP Law. Your message has been successfully submitted. We'll review your inquiry and get back to you as soon as possible.</p>
            
            <NuxtLink 
              to="/" 
              class="inline-block bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
            >
              Return to Homepage
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroBanner from '../components/HeroBanner.vue';

// Enhanced SEO with noindex (keep out of search results)
useSEO({
  title: 'Thank You - Message Received',
  description: 'Thank you for contacting Dobbin IP Law. Your message has been successfully received and we will respond promptly.',
  path: '/success',
  keywords: '', // No keywords needed for this page
  robots: 'noindex, nofollow' // Important: Keep out of search results
})
// ✅ ADD: Import the structured data function
const { useStructuredData } = await import('~/composables/useSEO.js')


// Minimal structured data (since page shouldn't be indexed)
useStructuredData({
  "@type": ["LocalBusiness", "WebPage"],
  "mainEntity": {
    "@type": "WebPage",
    "name": "Contact Form Success Page",
    "description": "Confirmation page for contact form submissions"
  }
})
</script>
