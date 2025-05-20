<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-3xl font-bold text-center font-crimson text-dobbin-dark-green mb-8">What Type of Protection Do You Need?</h2>
      <p class="text-center mb-10 max-w-4xl mx-auto text-gray-700 font-crimson">
        Understanding which form of intellectual property protection is right for your creation can be challenging. 
        Here's a quick overview to help you determine what you need.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Patents -->
        <div class="bg-white rounded-lg shadow-lg p-6 transition hover:shadow-xl">
          <div class="mb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-dobbin-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 class="text-xl font-bold mt-4 font-crimson text-dobbin-dark-green">Patents</h3>
          </div>
          <p class="text-gray-700 mb-4 font-crimson">
            <strong>Ideal for:</strong> New inventions, processes, machines, or manufacturing methods that are novel, non-obvious, and useful.
          </p>
          <p class="text-gray-700 mb-6 font-crimson">
            Patents grant exclusive rights to make, use, or sell your invention. Consider this when you've created something innovative with functional applications.
          </p>
          <div class="flex justify-center">
            <!-- Use NuxtLink for better navigation within Nuxt apps -->
            <NuxtLink 
              to="/patents" 
              class="text-dobbin-dark-green hover:text-dobbin-bright-green font-semibold flex items-center gap-1"
            >
              Learn more about patent protection
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
        
        <!-- Trademarks -->
        <div class="bg-white rounded-lg shadow-lg p-6 transition hover:shadow-xl">
          <div class="mb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-dobbin-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <h3 class="text-xl font-bold mt-4 font-crimson text-dobbin-dark-green">Trademarks</h3>
          </div>
          <p class="text-gray-700 mb-4 font-crimson">
            <strong>Ideal for:</strong> Business names, logos, slogans, and anything that identifies your brand in the marketplace.
          </p>
          <p class="text-gray-700 mb-6 font-crimson">
            Trademarks protect your brand identity and prevent customer confusion. Essential for businesses looking to build and protect their reputation and brand recognition.
          </p>
          <div class="flex justify-center">
            <NuxtLink 
              to="/trademarks" 
              class="text-dobbin-dark-green hover:text-dobbin-bright-green font-semibold flex items-center gap-1"
            >
              Learn more about trademark protection
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
        
        <!-- Copyrights -->
        <div class="bg-white rounded-lg shadow-lg p-6 transition hover:shadow-xl">
          <div class="mb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-dobbin-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <h3 class="text-xl font-bold mt-4 font-crimson text-dobbin-dark-green">Copyrights</h3>
          </div>
          <p class="text-gray-700 mb-4 font-crimson">
            <strong>Ideal for:</strong> Creative works including writing, music, artwork, photography, software, and other original expressions.
          </p>
          <p class="text-gray-700 mb-6 font-crimson">
            Copyrights protect the expression of ideas (not the ideas themselves). Registration provides stronger protection for creators and artists against unauthorized copying.
          </p>
          <div class="flex justify-center">
            <NuxtLink 
              to="/copyright" 
              class="text-dobbin-dark-green hover:text-dobbin-bright-green font-semibold flex items-center gap-1"
            >
              Learn more about copyright protection
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Additional Info -->
      <div class="mt-12 bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h3 class="text-xl font-bold mb-4 font-crimson text-dobbin-dark-green">Still Not Sure What You Need?</h3>
        <p class="text-gray-700 mb-6 font-crimson">
          Many innovations require multiple forms of protection. For example, a new product might need both a patent (for its functionality) and a trademark (for its brand name). We can help you develop a comprehensive strategy.
        </p>
        <div class="flex justify-center">
          <NuxtLink 
            to="/contact" 
            class="bg-dobbin-dark-green text-white font-bold py-3 px-8 rounded-lg inline-block transition hover:bg-opacity-90 transform hover:scale-105 shadow-lg"
          >
            Schedule a Free Strategy Session
          </NuxtLink>
        </div>
      </div>
      
      <!-- See Pricing -->
      <div class="mt-8 text-center">
        <NuxtLink 
          to="/flat-fees" 
          class="text-dobbin-dark-green hover:text-dobbin-bright-green font-semibold flex items-center gap-1 justify-center"
        >
          View our transparent flat fee pricing
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// No custom navigation handlers needed - let Nuxt handle it with proper lifecycle hooks
</script>

<style scoped>
/* Hover effects for cards */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-5px);
  transition: all 0.3s ease;
}
</style>