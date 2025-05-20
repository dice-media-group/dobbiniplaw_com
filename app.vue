<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Let the plugin handle scroll behavior - keep this minimal
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