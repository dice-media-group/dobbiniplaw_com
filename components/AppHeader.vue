<template>
  <header>
    <!-- Top bar with contact info -->
    <div class="bg-black text-white py-1">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <a href="tel:8019696609" class="text-sm font-crimson">(801) 969-6609</a>
        <div class="flex items-center space-x-4">
          <a href="mailto:getinfo@dobbiniplaw.com" class="text-sm font-crimson">getinfo@dobbiniplaw.com</a>
          <div class="flex space-x-2">
            <a href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195c-.897-.95-2.178-1.544-3.594-1.544-2.72 0-4.923 2.21-4.923 4.932 0 .386.044.762.127 1.122-4.092-.205-7.72-2.166-10.15-5.145a4.912 4.912 0 00-.665 2.477c0 1.71.87 3.214 2.19 4.1-.807-.026-1.566-.248-2.228-.618v.06c0 2.388 1.7 4.38 3.952 4.83-.414.115-.85.174-1.297.174-.318 0-.626-.03-.93-.09a4.935 4.935 0 004.6 3.42 9.863 9.863 0 01-6.115 2.107c-.39 0-.78-.022-1.17-.066a13.995 13.995 0 007.557 2.21c9.054 0 14-7.497 14-13.99 0-.21 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Logo -->
    <div class="bg-white py-4 dobbin-header">
      <div class="container mx-auto px-4">
        <div class="flex justify-center">
          <NuxtLink to="/" class="logo-link">
            <div class="flex items-center">
              <!-- Try to load SideBySide.jpg first, with fallbacks -->
              <img 
                src="/img/SideBySide.jpg" 
                alt="Dobbin IP Law Logo" 
                class="h-16" 
                @error="logoImageError = true" 
                v-if="!logoImageError"
              />
              <!-- First fallback: Try the SVG we created -->
              <img 
                v-else-if="!svgImageError"
                src="/img/SideBySidegoald.svg" 
                alt="Dobbin IP Law Logo" 
                class="h-14 mr-2" 
                @error="svgImageError = true"
              />
              <!-- Second fallback: Use the simpler SVG -->
              <img 
                v-else-if="!fallbackSvgError"
                src="/img/logo-fallback.svg" 
                alt="Dobbin IP Law Logo" 
                class="h-14 mr-2" 
                @error="fallbackSvgError = true"
              />
              <!-- Final fallback: Use inline SVG -->
              <svg 
                v-else
                class="h-12 w-12 mr-2" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100"
              >
                <path d="M50,15c-19.33,0-35,15.67-35,35s15.67,35,35,35s35-15.67,35-35S69.33,15,50,15z M77.38,58.37c-0.46,1.87-1.13,3.65-1.96,5.33l6.37,8.97l-8.57,8.57l-8.97-6.37c-1.68,0.84-3.46,1.5-5.33,1.96L55.7,85h-12.1l-3.23-8.17c-1.87-0.46-3.65-1.13-5.33-1.96l-8.97,6.37l-8.57-8.57l6.37-8.97c-0.84-1.68-1.5-3.46-1.96-5.33L13.74,55.7v-12.1l8.17-3.23c0.46-1.87,1.13-3.65,1.96-5.33l-6.37-8.97l8.57-8.57l8.97,6.37c1.68-0.84,3.46-1.5,5.33-1.96L43.6,13h12.1l3.23,8.17c1.87,0.46,3.65,1.13,5.33,1.96l8.97-6.37l8.57,8.57l-6.37,8.97c0.84,1.68,1.5,3.46,1.96,5.33l8.17,3.23v12.1L77.38,58.37z" fill="#333333"/>
                <path d="M55,30c-8.28,0-15,6.72-15,15c0,8.28,6.72,15,15,15c8.28,0,15-6.72,15-15C70,36.72,63.28,30,55,30z" fill="#009245"/>
              </svg>
              
              <!-- The text always shows -->
              <h1 class="text-2xl font-bold text-dobbin-dark-green tracking-wider font-crimson">DOBBIN IP LAW</h1>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Main navigation - Matches original site's style -->
    <div class="border-t border-gray-200">
      <div class="container mx-auto">
        <nav class="hidden md:flex justify-center items-center">
          <NuxtLink to="/" class="nav-link py-4 px-4 uppercase text-sm font-crimson tracking-wide text-dobbin-gray">HOME</NuxtLink>
          <NuxtLink to="/about" class="nav-link py-4 px-4 uppercase text-sm font-crimson tracking-wide text-dobbin-gray">ABOUT US</NuxtLink>
          <NuxtLink to="/prior-work" class="nav-link py-4 px-4 uppercase text-sm font-crimson tracking-wide text-dobbin-gray">PRIOR WORK</NuxtLink>
          <div class="relative group">
            <NuxtLink to="/resources" class="nav-link py-4 px-4 uppercase text-sm font-crimson tracking-wide text-dobbin-gray flex items-center">
              RESOURCES
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </NuxtLink>
            <!-- Dropdown menu would go here if needed -->
          </div>
          <NuxtLink to="/testimonials" class="nav-link py-4 px-4 uppercase text-sm font-crimson tracking-wide text-dobbin-gray">TESTIMONIALS</NuxtLink>
          <NuxtLink to="/contact" class="nav-link py-4 px-4 uppercase text-sm font-crimson tracking-wide text-dobbin-gray">SCHEDULE STRATEGY SESSION</NuxtLink>
          <!-- Search icon -->
          <button class="py-4 px-2 text-dobbin-gray">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </nav>
        
        <div class="md:hidden py-2 px-4">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="w-full flex justify-between items-center text-dobbin-gray font-crimson">
            <span>MENU</span>
            <span v-if="!mobileMenuOpen">☰</span>
            <span v-else>✕</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="mobile-menu md:hidden border-t border-gray-200">
      <ul class="px-4 py-2">
        <li><NuxtLink to="/" class="block nav-link py-2 text-dobbin-gray font-crimson" @click="mobileMenuOpen = false">HOME</NuxtLink></li>
        <li><NuxtLink to="/about" class="block nav-link py-2 text-dobbin-gray font-crimson" @click="mobileMenuOpen = false">ABOUT US</NuxtLink></li>
        <li><NuxtLink to="/prior-work" class="block nav-link py-2 text-dobbin-gray font-crimson" @click="mobileMenuOpen = false">PRIOR WORK</NuxtLink></li>
        <li><NuxtLink to="/resources" class="block nav-link py-2 text-dobbin-gray font-crimson" @click="mobileMenuOpen = false">RESOURCES</NuxtLink></li>
        <li><NuxtLink to="/testimonials" class="block nav-link py-2 text-dobbin-gray font-crimson" @click="mobileMenuOpen = false">TESTIMONIALS</NuxtLink></li>
        <li><NuxtLink to="/contact" class="block nav-link py-2 text-dobbin-gray font-crimson" @click="mobileMenuOpen = false">SCHEDULE STRATEGY SESSION</NuxtLink></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false);
const logoImageError = ref(false);
const svgImageError = ref(false);
const fallbackSvgError = ref(false);
</script>

<style scoped>
.nav-link {
  position: relative;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.router-link-exact-active {
  color: #009245;
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #009245;
}
</style>