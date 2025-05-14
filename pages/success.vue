<template>
  <div>
    <!-- Hero section with navy background -->
    <HeroBanner 
      title="Thank You!" 
      bgColor="bg-dobbin-navy"
      titleSize="text-5xl"
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
useHead({
  title: 'Form Submitted | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Thank you for contacting Dobbin IP Law. Your message has been successfully received.' }
  ]
})
</script>