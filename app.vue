<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, provide } from 'vue';

const router = useRouter();

// Create a function to scroll to top that we can call from anywhere
const scrollToTop = () => {
  // Use immediate scrolling instead of smooth for more reliability
  window.scrollTo(0, 0);
};

// Provide the scrollToTop method to all components
provide('scrollToTop', scrollToTop);

onMounted(() => {
  // First approach: router afterEach hook
  router.afterEach((to, from) => {
    if (to.path !== from.path) {
      // Wait a tick for DOM updates to complete
      setTimeout(() => {
        scrollToTop();
      }, 0);
    }
  });

  // Second approach: watch for <a> link clicks that change route
  document.addEventListener('click', (e) => {
    // Look for link clicks
    let el = e.target;
    while (el && el.tagName !== 'A') {
      el = el.parentNode;
      if (!el) return;
    }
    
    // Check if it's an internal link (not external, not anchor)
    const href = el.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#')) {
      // This is likely a route change, force scroll after a small delay
      setTimeout(scrollToTop, 50);
    }
  });
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
</style>