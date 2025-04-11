<template>
  <div>
    <!-- Use the reusable hero banner component with title and no content -->
    <HeroBanner title="Helpful Links">
      <p class="font-crimson text-white">
        &nbsp;
      </p>
    </HeroBanner>
    <!-- Helpful Links Section -->
    <section class="py-12">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="mx-auto">
          <!-- Links Container -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            
            <!-- United States Patent and Trademark Office -->
            <div class="flex flex-col items-center">
              <div class="mb-4">
                <!-- Gear Icon using FontAwesome -->
                <font-awesome-icon 
                  icon="gear" 
                  class="icon-large text-dobbin-dark-green"
                  aria-hidden="true"
                />
              </div>
              <h2 class="text-lg font-crimson text-dobbin-gray mb-2">United States Patent and Trademark Office</h2>
              <a href="https://www.uspto.gov/" target="_blank" rel="noopener noreferrer" 
                 class="block font-crimson text-dobbin-green hover:text-dobbin-bright-green transition text-sm">
                Visit Website
              </a>
            </div>
            
            <!-- United States Copyright Office -->
            <div class="flex flex-col items-center">
              <div class="mb-4">
                <!-- Copyright Icon using FontAwesome -->
                <font-awesome-icon 
                  icon="copyright" 
                  class="icon-large text-dobbin-dark-green"
                  aria-hidden="true"
                />
              </div>
              <h2 class="text-lg font-crimson text-dobbin-gray mb-2">United States Copyright Office</h2>
              <a href="https://www.copyright.gov/" target="_blank" rel="noopener noreferrer" 
                 class="block font-crimson text-dobbin-green hover:text-dobbin-bright-green transition text-sm">
                Visit Website
              </a>
            </div>
            
            <!-- Free Patents Online -->
            <div class="flex flex-col items-center">
              <div class="mb-4">
                <!-- Globe Icon using FontAwesome -->
                <font-awesome-icon 
                  icon="globe" 
                  class="icon-large text-dobbin-dark-green"
                  aria-hidden="true"
                />
              </div>
              <h2 class="text-lg font-crimson text-dobbin-gray mb-2">Free Patents Online</h2>
              <a href="https://www.freepatentsonline.com/" target="_blank" rel="noopener noreferrer" 
                 class="block font-crimson text-dobbin-green hover:text-dobbin-bright-green transition text-sm">
                Visit Website
              </a>
            </div>
            
            <!-- World Intellectual Property Organization -->
            <div class="flex flex-col items-center">
              <div class="mb-4">
                <!-- Earth Americas Icon using FontAwesome -->
                <font-awesome-icon 
                  icon="earth-americas" 
                  class="icon-large text-dobbin-dark-green"
                  aria-hidden="true"
                />
              </div>
              <h2 class="text-lg font-crimson text-dobbin-gray mb-2">World Intellectual Property Organization</h2>
              <a href="https://www.wipo.int/" target="_blank" rel="noopener noreferrer" 
                 class="block font-crimson text-dobbin-green hover:text-dobbin-bright-green transition text-sm">
                Visit Website
              </a>
            </div>
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
