<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

// Add global navigation hook to ensure scrolling to top on page changes
onMounted(() => {
  router.afterEach((to, from) => {
    // Only scroll to top if the page route changes
    if (to.path !== from.path) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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