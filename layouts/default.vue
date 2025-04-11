<template>
  <div class="layout">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <PageCTA v-if="showCTA" />
    <AppFooter />
  </div>
</template>

<script setup>
import { useCTA } from '~/composables/useCTA';
import PageCTA from '~/components/PageCTA.vue';

// Use the CTA composable to determine visibility
const { showCTA } = useCTA();
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
