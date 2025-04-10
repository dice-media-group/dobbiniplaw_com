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
            <div class="flex flex-col items-center">
              <div class="mb-4">
                <!-- Gear Icon -->
                <svg class="h-20 w-20 text-dobbin-dark-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                </svg>
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
                <!-- Copyright Icon -->
                <svg class="h-20 w-20 text-dobbin-dark-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM199.4 312.6c-31.2-31.2-31.2-81.9 0-113.1s81.9-31.2 113.1 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9c-50-50-131-50-181 0s-50 131 0 181s131 50 181 0c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0c-31.2 31.2-81.9 31.2-113.1 0z" />
                </svg>
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
                <!-- Globe Icon -->
                <svg class="h-20 w-20 text-dobbin-dark-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 21 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192C2.8 212.5 0 233.9 0 256s2.8 43.5 8.1 64H131.2c-2.1-20.6-3.2-42-3.2-64s1.1-43.4 3.2-64H8.1zm136.2 128c10 63.9 29.8 117.4 55.3 151.6C121.3 451.6 57.7 394.8 27.7 320h116.6zM376.7 320c-6.1 36.4-15.5 68.6-27 94.7c-10.5 23.6-22.2 40.7-33.5 51.5C305 476.8 295.7 480 288.4 480s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5c-11.6-26-21-58.2-27-94.7H376.7zm-209 0c29.8 74.8 93.4 131.7 171.9 151.6c-25.5-34.2-45.3-87.7-55.3-151.6H167.7z" />
                </svg>
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
                <!-- Earth Americas Icon -->
                <svg class="h-20 w-20 text-dobbin-dark-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                </svg>
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
/* Add any specific styles if needed */
</style>
