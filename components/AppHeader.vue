<template>
  <header>
    <!-- Top bar with contact info -->
    <div class="bg-black text-white py-1">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <a href="tel:8019696609" class="text-sm">(801) 969-6609</a>
        <div class="flex items-center space-x-4">
          <a href="mailto:getinfo@dobbiniplaw.com" class="text-sm">getinfo@dobbiniplaw.com</a>
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
    <div class="bg-white py-4">
      <div class="container mx-auto px-4">
        <div class="flex justify-center">
          <NuxtLink to="/" class="logo-link">
            <div class="flex items-center">
              <svg class="h-12 w-12 text-dobbin-green mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <!-- Gear shape logo similar to original -->
                <path fill="currentColor" d="M50,15c-19.33,0-35,15.67-35,35s15.67,35,35,35s35-15.67,35-35S69.33,15,50,15z M77.38,58.37 c-0.46,1.87-1.13,3.65-1.96,5.33l6.37,8.97l-8.57,8.57l-8.97-6.37c-1.68,0.84-3.46,1.5-5.33,1.96L55.7,85h-12.1l-3.23-8.17 c-1.87-0.46-3.65-1.13-5.33-1.96l-8.97,6.37l-8.57-8.57l6.37-8.97c-0.84-1.68-1.5-3.46-1.96-5.33L13.74,55.7v-12.1l8.17-3.23 c0.46-1.87,1.13-3.65,1.96-5.33l-6.37-8.97l8.57-8.57l8.97,6.37c1.68-0.84,3.46-1.5,5.33-1.96L43.6,13h12.1l3.23,8.17 c1.87,0.46,3.65,1.13,5.33,1.96l8.97-6.37l8.57,8.57l-6.37,8.97c0.84,1.68,1.5,3.46,1.96,5.33l8.17,3.23v12.1L77.38,58.37z"/>
                <circle fill="currentColor" cx="50" cy="50" r="20"/>
              </svg>
              <h1 class="text-2xl font-bold text-dobbin-green tracking-wider">DOBBIN IP LAW</h1>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Main navigation -->
    <div class="bg-dobbin-green text-white">
      <div class="container mx-auto">
        <nav class="hidden md:flex">
          <NuxtLink to="/" class="nav-link py-3 px-4 text-center flex-1 uppercase text-sm font-medium">Home</NuxtLink>
          <NuxtLink to="/about" class="nav-link py-3 px-4 text-center flex-1 uppercase text-sm font-medium">About Us</NuxtLink>
          <NuxtLink to="/prior-work" class="nav-link py-3 px-4 text-center flex-1 uppercase text-sm font-medium">Prior Work</NuxtLink>
          <NuxtLink to="/resources" class="nav-link py-3 px-4 text-center flex-1 uppercase text-sm font-medium">Resources</NuxtLink>
          <NuxtLink to="/testimonials" class="nav-link py-3 px-4 text-center flex-1 uppercase text-sm font-medium">Testimonials</NuxtLink>
          <NuxtLink to="/contact" class="nav-link py-3 px-4 text-center flex-1 uppercase text-sm font-medium">Schedule Strategy Session</NuxtLink>
        </nav>
        
        <div class="md:hidden py-2 px-4">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white w-full flex justify-between items-center">
            <span>MENU</span>
            <span v-if="!mobileMenuOpen">☰</span>
            <span v-else>✕</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="mobile-menu md:hidden bg-dobbin-green border-t border-gray-700">
      <ul class="px-4 py-2">
        <li><NuxtLink to="/" class="block nav-link py-2 text-white" @click="mobileMenuOpen = false">HOME</NuxtLink></li>
        <li><NuxtLink to="/about" class="block nav-link py-2 text-white" @click="mobileMenuOpen = false">ABOUT US</NuxtLink></li>
        <li><NuxtLink to="/prior-work" class="block nav-link py-2 text-white" @click="mobileMenuOpen = false">PRIOR WORK</NuxtLink></li>
        <li><NuxtLink to="/resources" class="block nav-link py-2 text-white" @click="mobileMenuOpen = false">RESOURCES</NuxtLink></li>
        <li><NuxtLink to="/testimonials" class="block nav-link py-2 text-white" @click="mobileMenuOpen = false">TESTIMONIALS</NuxtLink></li>
        <li><NuxtLink to="/contact" class="block nav-link py-2 text-white" @click="mobileMenuOpen = false">SCHEDULE STRATEGY SESSION</NuxtLink></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false);
</script>

<style scoped>
.nav-link {
  position: relative;
  transition: background-color 0.2s;
}

.nav-link:hover, .nav-link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  right: 25%;
  height: 2px;
  background-color: white;
}
</style>