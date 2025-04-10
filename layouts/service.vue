<template>
  <div class="layout">
    <AppHeader />
    <main class="main-content">
      <div class="service-header bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ $route.meta.title || '' }}</h1>
          <p class="text-xl max-w-3xl">{{ $route.meta.description || '' }}</p>
        </div>
      </div>
      
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-2">
            <div class="bg-white rounded-lg shadow-md p-6">
              <slot />
            </div>
          </div>
          
          <div class="sidebar">
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 class="text-xl font-bold text-blue-900 mb-4">Our Services</h2>
              <ul class="space-y-2">
                <li>
                  <NuxtLink 
                    to="/patents" 
                    class="flex items-center p-2 rounded-md hover:bg-blue-50 transition"
                    :class="{ 'bg-blue-50 text-blue-700 font-semibold': $route.path === '/patents' }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Patents
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/trademarks" 
                    class="flex items-center p-2 rounded-md hover:bg-blue-50 transition"
                    :class="{ 'bg-blue-50 text-blue-700 font-semibold': $route.path === '/trademarks' }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    Trademarks
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/copyrights" 
                    class="flex items-center p-2 rounded-md hover:bg-blue-50 transition"
                    :class="{ 'bg-blue-50 text-blue-700 font-semibold': $route.path === '/copyrights' }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    Copyrights
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/services" 
                    class="flex items-center p-2 rounded-md hover:bg-blue-50 transition"
                    :class="{ 'bg-blue-50 text-blue-700 font-semibold': $route.path === '/services' }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    All Services
                  </NuxtLink>
                </li>
              </ul>
            </div>
            
            <div class="bg-blue-50 rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-blue-900 mb-4">Get a Free Consultation</h2>
              <p class="text-gray-700 mb-6">Contact us today for a complementary strategy session to discuss your intellectual property needs.</p>
              <NuxtLink 
                to="/contact" 
                class="block w-full bg-blue-700 hover:bg-blue-800 text-white text-center font-bold py-3 px-4 rounded-md transition duration-300"
              >
                Contact Us
              </NuxtLink>
              <div class="mt-4 text-center">
                <a href="tel:8019696609" class="text-blue-700 hover:text-blue-900 font-semibold">
                  Call: (801) 969-6609
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>