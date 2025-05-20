<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Import useRouter from '#app' instead of 'vue'
import { onMounted, onUnmounted } from 'vue';

// Use the Nuxt way to get the router
const router = useRouter();
const { $scrollToTop } = useNuxtApp();

// Force scroll to top function with multiple approaches
function forceScrollToTop() {
  // Direct browser API
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  // Call the plugin's scrollToTop if available
  if ($scrollToTop) {
    $scrollToTop();
  }
  
  // Global function from our head script
  if (window.forceScrollToTop) {
    window.forceScrollToTop();
  }
}

// Click handler for all anchor tags
function handleClick(e) {
  // Check if it's a link click
  let el = e.target;
  while (el && el.tagName !== 'A') {
    el = el.parentNode;
    if (!el) return;
  }
  
  // Only process internal navigation links (skip external and anchor links)
  const href = el.getAttribute('href');
  if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
    // Custom navigation - could use preventDefault and router.push here
    // but we'll let the default link behavior work while adding our scroll logic
    
    // Set a flag to force scroll after navigation completes
    window.shouldScrollAfterNavigation = true;
    
    // Force scroll with multiple delays
    setTimeout(forceScrollToTop, 0);
    setTimeout(forceScrollToTop, 50);
    setTimeout(forceScrollToTop, 100);
    setTimeout(forceScrollToTop, 300);
    setTimeout(forceScrollToTop, 500);
  }
}

onMounted(() => {
  // Initial scroll to top
  forceScrollToTop();
  
  // Add router hooks
  router.afterEach(() => {
    forceScrollToTop();
    setTimeout(forceScrollToTop, 0);
    setTimeout(forceScrollToTop, 50);
    setTimeout(forceScrollToTop, 100);
  });
  
  // Add global click handler
  document.addEventListener('click', handleClick);
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', forceScrollToTop);
  
  // Handle page load/reload
  window.addEventListener('load', forceScrollToTop);
  
  // Additional scroll to top after all content is loaded
  window.addEventListener('DOMContentLoaded', forceScrollToTop);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClick);
  window.removeEventListener('popstate', forceScrollToTop);
  window.removeEventListener('load', forceScrollToTop);
  window.removeEventListener('DOMContentLoaded', forceScrollToTop);
});
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>