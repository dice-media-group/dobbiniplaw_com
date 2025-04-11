<template>
  <section v-if="show" class="py-8 bg-dobbin-dark-green text-white">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4 font-crimson">{{ title }}</h2>
        <p class="mb-6 font-crimson">
          {{ description }}
        </p>
        <a :href="buttonLink" class="inline-block bg-white text-dobbin-dark-green font-bold py-2 px-8 rounded hover:bg-gray-100 transition font-crimson">
          {{ buttonText }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props with default values
const props = defineProps({
  show: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Ready to Protect Your Intellectual Property?'
  },
  description: {
    type: String,
    default: 'Contact us today to schedule your complementary strategy session and see how we can help protect your inventions, copyrights, and trademarks.'
  },
  buttonText: {
    type: String,
    default: 'Schedule a Strategy Session'
  },
  buttonLink: {
    type: String,
    default: '/contact'
  }
});
</script>
