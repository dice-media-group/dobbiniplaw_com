<template>
  <section class="bg-dobbin-dark-green text-white py-12 w-full">
    <div class="container mx-auto">
      <div class="mx-auto px-4 max-w-[1140px]">
        <h1 v-if="title" class="text-3xl mb-3 font-crimson text-white">{{ title }}</h1>
        <h2 v-if="subtitle" class="text-xl mb-4 font-crimson text-white">{{ subtitle }}</h2>
        <slot>
          <p class="mb-4 font-crimson text-white">We are committed to continue serving you in these trying times. We will stay open for business and will be using telephone and video calls. Please call and let us know how we can best help you at (801) 969-6609.</p>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  },
  hasContent: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
/* Full width styles */
section {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
</style>