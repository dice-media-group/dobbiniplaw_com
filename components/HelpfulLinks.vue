<template>
  <div>
    <!-- Use the reusable hero banner component with title and no content -->
    <HeroBanner title="Helpful Links" :hasContent="false" />
    
    <!-- Helpful Links Section -->
    <section class="py-12">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="mx-auto">
          <!-- Links Container -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            
            <!-- United States Patent and Trademark Office -->
            <a 
              href="https://www.uspto.gov/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition duration-300 group cursor-pointer"
            >
              <div class="mb-4">
                <font-awesome-icon 
                  icon="gear" 
                  class="icon-large text-dobbin-dark-green group-hover:text-dobbin-green transition-colors"
                  aria-hidden="true"
                />
              </div>
              <h2 class="text-lg font-crimson text-dobbin-gray mb-2 group-hover:text-dobbin-green transition-colors">
                United States Patent and Trademark Office
              </h2>
              <span class="block font-crimson text-dobbin-green group-hover:text-dobbin-bright-green transition-colors text-sm">
                Visit Website
              </span>
            </a>
            
            <!-- United States Copyright Office -->
            <a 
              href="https://www.copyright.gov/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition duration-300 group cursor-pointer"
            >
              <div class="mb-4">
                <font-awesome-icon 
                  icon="copyright" 
                  class="icon-large text-dobbin-dark-green group-hover:text-dobbin-green transition-colors"
                  aria-hidden="true"
                />
              </div>
              <h2 class="text-lg font-crimson text-dobbin-gray mb-2 group-hover:text-dobbin-green transition-colors">
                United States Copyright Office
              </h2>
              <span class="block font-crimson text-dobbin-green group-hover:text-dobbin-bright-green transition-colors text-sm">
                Visit Website
              </span>
            </a>
            
            <!-- Free Patents Online -->
            <a 
              href="https://www.freepatentsonline.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition duration-300 group cursor-pointer"
            >
              <div class="mb-4">
                <font-awesome-icon 
                  icon="globe" 
                  class="icon-large text-dobbin-dark-green group-hover:text-dobbin-green transition-colors"
                  aria-hidden="true"
                />
              </div>
              <h2 class="text-lg font-crimson text-dobbin-gray mb-2 group-hover:text-dobbin-green transition-colors">
                Free Patents Online
              </h2>
              <span class="block font-crimson text-dobbin-green group-hover:text-dobbin-bright-green transition-colors text-sm">
                Visit Website
              </span>
            </a>
            
            <!-- World Intellectual Property Organization -->
            <a 
              href="https://www.wipo.int/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition duration-300 group cursor-pointer"
            >
              <div class="mb-4">
                <font-awesome-icon 
                  icon="earth-americas" 
                  class="icon-large text-dobbin-dark-green group-hover:text-dobbin-green transition-colors"
                  aria-hidden="true"
                />
              </div>
              <h2 class="text-lg font-crimson text-dobbin-gray mb-2 group-hover:text-dobbin-green transition-colors">
                World Intellectual Property Organization
              </h2>
              <span class="block font-crimson text-dobbin-green group-hover:text-dobbin-bright-green transition-colors text-sm">
                Visit Website
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '#imports';
import HeroBanner from './HeroBanner.vue';

// Add page meta information
useHead({
  title: 'Helpful Links | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Helpful resources for patents, trademarks, copyrights, and other intellectual property matters.' }
  ]
})
</script>

<style scoped>
/* Custom large icon style to match original SVG size */
.icon-large {
  width: 6rem;
  height: 6rem;
  font-size: 6rem;
}
</style>