<template>
  <div class="layout">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <!-- Only on home page -->
    <PageCTA v-if="isHomePage" :show="isHomePage" />
    <AppFooter />
  </div>
</template>

<script setup>
import { useRoute, computed } from '#imports';
import PageCTA from '~/components/PageCTA.vue';

const route = useRoute();

// Simple approach: only show on home page
const isHomePage = computed(() => {
  return route.path === '/' || route.path === '/index';
});

console.log('Current path:', route.path);
console.log('Is home page:', isHomePage.value);
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
