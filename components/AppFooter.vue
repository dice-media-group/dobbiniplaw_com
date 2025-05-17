<template>
  <footer>
    <!-- Call to Action Section -->
    
    <!-- Main Footer -->
    <div class="bg-dobbin-footer text-white py-8 dobbin-footer">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-2 font-crimson dobbin-footer">Dobbin IP Law P.C.</h3>
            <p class="mb-1 font-crimson">2290 E Richmond Rd, Suite 3</p>
            <p class="mb-1 font-crimson">West Valley City, UT 84106</p>
            <p class="mb-1">&nbsp;</p>
            <p class="font-crimson">(801) 969-6609</p>
          </div>
          
          <div>
            <p class="text-sm font-crimson">This website provides general information about patents, trademarks, copyrights and services available at Dobbin IP Law P.C. It is for informational only and does not constitute legal advice, nor does it constitute the start of an attorney-client relationship. For specific, personalized advice about situations, please feel free to contact us.</p>
          </div>
        </div>
        
        <div class="mt-8 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm">
          <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0 text-center md:text-left">
            <NuxtLink v-if="route.path !== '/terms-of-service'" to="/terms-of-service" class="hover:underline font-crimson">Terms of Service</NuxtLink>
            <NuxtLink v-if="route.path !== '/privacy-policy'" to="/privacy-policy" class="hover:underline font-crimson">Privacy Policy</NuxtLink>
            <NuxtLink v-if="route.path !== '/contact'" to="/contact" class="hover:underline font-crimson">Contact Us</NuxtLink>
          </div>
          
          <div class="flex space-x-2">
            <a href="https://www.facebook.com/DobbinIPLaw/" target="_blank" rel="noopener" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="https://x.com/dobbiniplaw" target="_blank" rel="noopener" aria-label="X (formerly Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195c-.897-.95-2.178-1.544-3.594-1.544-2.72 0-4.923 2.21-4.923 4.932 0 .386.044.762.127 1.122-4.092-.205-7.72-2.166-10.15-5.145a4.912 4.912 0 00-.665 2.477c0 1.71.87 3.214 2.19 4.1-.807-.026-1.566-.248-2.228-.618v.06c0 2.388 1.7 4.38 3.952 4.83-.414.115-.85.174-1.297.174-.318 0-.626-.03-.93-.09a4.935 4.935 0 004.6 3.42 9.863 9.863 0 01-6.115 2.107c-.39 0-.78-.022-1.17-.066a13.995 13.995 0 007.557 2.21c9.054 0 14-7.497 14-13.99 0-.21 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="mt-4 text-center text-xs font-crimson">
          <p>Copyright 2017 - 2025 Dobbin IP Law P.C. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const route = useRoute();
</script>