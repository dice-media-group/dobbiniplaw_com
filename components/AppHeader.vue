<template>
  <header>
    <!-- Top bar with contact info - IMPROVED CONTRAST -->
    <div class="bg-black text-white py-2">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <a href="tel:8019696609" class="text-sm font-crimson text-white font-medium hover:text-gray-200">(801) 969-6609</a>
        <div class="flex items-center space-x-4">
          <a href="mailto:getinfo@dobbiniplaw.com" class="text-sm font-crimson text-white font-medium hover:text-gray-200">getinfo@dobbiniplaw.com</a>
          <div class="flex space-x-3">
            <a href="#" aria-label="Facebook" class="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" class="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195c-.897-.95-2.178-1.544-3.594-1.544-2.72 0-4.923 2.21-4.923 4.932 0 .386.044.762.127 1.122-4.092-.205-7.72-2.166-10.15-5.145a4.912 4.912 0 00-.665 2.477c0 1.71.87 3.214 2.19 4.1-.807-.026-1.566-.248-2.228-.618v.06c0 2.388 1.7 4.38 3.952 4.83-.414.115-.85.174-1.297.174-.318 0-.626-.03-.93-.09a4.935 4.935 0 004.6 3.42 9.863 9.863 0 01-6.115 2.107c-.39 0-.78-.022-1.17-.066a13.995 13.995 0 007.557 2.21c9.054 0 14-7.497 14-13.99 0-.21 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Logo Section -->
    <div class="bg-white py-6">
      <div class="container mx-auto px-4">
        <div class="flex justify-center">
          <NuxtLink to="/" class="logo-link">
            <!-- Using the AppLogo component -->
            <AppLogo />
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Main navigation -->
    <div class="border-t border-gray-200 bg-white">
      <div class="container mx-auto">
        <nav class="hidden md:flex justify-center items-center">
          <NuxtLink to="/" class="nav-link py-4 px-5 uppercase text-sm font-crimson tracking-wider text-dobbin-gray hover:text-dobbin-bright-green">HOME</NuxtLink>
          <NuxtLink to="/about" class="nav-link py-4 px-5 uppercase text-sm font-crimson tracking-wider text-dobbin-gray hover:text-dobbin-bright-green">ABOUT US</NuxtLink>
          <NuxtLink to="/prior-work" class="nav-link py-4 px-5 uppercase text-sm font-crimson tracking-wider text-dobbin-gray hover:text-dobbin-bright-green">PRIOR WORK</NuxtLink>
          <div class="relative group">
            <NuxtLink to="#" class="nav-link py-4 px-5 uppercase text-sm font-crimson tracking-wider text-dobbin-gray hover:text-dobbin-bright-green flex items-center">
              RESOURCES
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </NuxtLink>
            <!-- Dropdown menu with Helpful Links added -->
            <div class="hidden group-hover:block absolute z-10 bg-white shadow-lg w-48 py-2">
              <NuxtLink to="#" class="block px-4 py-2 text-sm text-dobbin-gray hover:text-dobbin-bright-green font-crimson">Intellectual Property</NuxtLink>
              <NuxtLink to="/patents" class="block px-4 py-2 text-sm text-dobbin-gray hover:text-dobbin-bright-green font-crimson">Patents</NuxtLink>
              <NuxtLink to="/trademarks" class="block px-4 py-2 text-sm text-dobbin-gray hover:text-dobbin-bright-green font-crimson">Trademarks</NuxtLink>
              <NuxtLink to="/copyright" class="block px-4 py-2 text-sm text-dobbin-gray hover:text-dobbin-bright-green font-crimson">Copyright</NuxtLink>
              <NuxtLink to="/helpful-links" class="block px-4 py-2 text-sm text-dobbin-gray hover:text-dobbin-bright-green font-crimson">Helpful Links</NuxtLink>
            </div>
          </div>
          <NuxtLink to="/testimonials" class="nav-link py-4 px-5 uppercase text-sm font-crimson tracking-wider text-dobbin-gray hover:text-dobbin-bright-green">TESTIMONIALS</NuxtLink>
          <NuxtLink to="/contact" class="nav-link py-4 px-5 uppercase text-sm font-crimson tracking-wider text-dobbin-gray hover:text-dobbin-bright-green">SCHEDULE STRATEGY SESSION</NuxtLink>
          <!-- Search button -->
          <button class="py-4 px-3 text-dobbin-gray hover:text-dobbin-bright-green">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </nav>
        
        <!-- Mobile menu toggle button -->
        <div class="md:hidden py-3 px-4">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="w-full flex justify-between items-center text-dobbin-gray font-crimson">
            <span class="uppercase text-sm tracking-wider">Menu</span>
            <span v-if="!mobileMenuOpen">☰</span>
            <span v-else>✕</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="mobile-menu md:hidden border-t border-gray-200 bg-white shadow-md">
      <div class="px-4 py-3">
        <NuxtLink to="/" class="block nav-link py-2 text-dobbin-gray hover:text-dobbin-bright-green font-crimson uppercase text-sm tracking-wider" @click="mobileMenuOpen = false">HOME</NuxtLink>
        <NuxtLink to="/about" class="block nav-link py-2 text-dobbin-gray hover:text-dobbin-bright-green font-crimson uppercase text-sm tracking-wider" @click="mobileMenuOpen = false">ABOUT US</NuxtLink>
        <NuxtLink to="/prior-work" class="block nav-link py-2 text-dobbin-gray hover:text-dobbin-bright-green font-crimson uppercase text-sm tracking-wider" @click="mobileMenuOpen = false">PRIOR WORK</NuxtLink>
        
        <!-- Mobile Resources submenu -->
        <div class="py-2">
          <div class="text-dobbin-gray font-crimson uppercase text-sm tracking-wider mb-1">RESOURCES</div>
          <div class="pl-4">
            <NuxtLink to="#" class="block nav-link py-1 text-dobbin-gray hover:text-dobbin-bright-green font-crimson text-sm" @click="mobileMenuOpen = false">Intellectual Property</NuxtLink>
            <NuxtLink to="/patents" class="block nav-link py-1 text-dobbin-gray hover:text-dobbin-bright-green font-crimson text-sm" @click="mobileMenuOpen = false">Patents</NuxtLink>
            <NuxtLink to="/trademarks" class="block nav-link py-1 text-dobbin-gray hover:text-dobbin-bright-green font-crimson text-sm" @click="mobileMenuOpen = false">Trademarks</NuxtLink>
            <NuxtLink to="/copyright" class="block nav-link py-1 text-dobbin-gray hover:text-dobbin-bright-green font-crimson text-sm" @click="mobileMenuOpen = false">Copyright</NuxtLink>
            <NuxtLink to="/helpful-links" class="block nav-link py-1 text-dobbin-gray hover:text-dobbin-bright-green font-crimson text-sm" @click="mobileMenuOpen = false">Helpful Links</NuxtLink>
          </div>
        </div>
        
        <NuxtLink to="/testimonials" class="block nav-link py-2 text-dobbin-gray hover:text-dobbin-bright-green font-crimson uppercase text-sm tracking-wider" @click="mobileMenuOpen = false">TESTIMONIALS</NuxtLink>
        <NuxtLink to="/contact" class="block nav-link py-2 text-dobbin-gray hover:text-dobbin-bright-green font-crimson uppercase text-sm tracking-wider" @click="mobileMenuOpen = false">SCHEDULE STRATEGY SESSION</NuxtLink>
        
        <!-- Mobile search -->
        <div class="mt-4 relative">
          <input type="text" placeholder="Search..." class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dobbin-bright-green">
          <button class="absolute right-3 top-2 text-dobbin-gray">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import AppLogo from './AppLogo.vue';

const mobileMenuOpen = ref(false);
</script>

<style scoped>
.nav-link {
  position: relative;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #009245;
}

.nav-link.router-link-exact-active {
  color: #009245;
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #009245;
}

/* Additional transition effects */
.logo-link {
  transition: opacity 0.2s;
}

.logo-link:hover {
  opacity: 0.9;
}

/* Match the WordPress site's spacing */
@media (min-width: 768px) {
  .container {
    max-width: 1200px;
  }
}
</style>