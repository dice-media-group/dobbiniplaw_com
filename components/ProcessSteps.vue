<template>
  <section class="py-16">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-3xl font-bold text-center font-crimson text-dobbin-dark-green mb-12">{{ title }}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Steps -->
        <div v-for="(step, index) in steps" :key="index" class="bg-white rounded-lg shadow-lg p-6 transition hover:shadow-xl">
          <div class="flex items-center justify-center w-16 h-16 bg-dobbin-dark-green rounded-full text-white mb-6 mx-auto">
            <span class="text-2xl font-bold">{{ index + 1 }}</span>
          </div>
          <h3 class="text-xl font-bold mb-4 text-center font-crimson">{{ step.title }}</h3>
          <p class="text-gray-600 font-crimson">
            {{ step.description }}
          </p>
        </div>
      </div>
      
      <!-- CTA Button -->
      <div v-if="ctaText" class="mt-12 text-center">
        <a :href="ctaLink" class="bg-dobbin-dark-green text-white font-bold py-3 px-8 rounded-lg inline-block transition hover:bg-opacity-90 transform hover:scale-105 shadow-lg text-lg">
          {{ ctaText }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'How We Make IP Protection Simple'
  },
  steps: {
    type: Array,
    required: true
  },
  ctaText: {
    type: String,
    default: ''
  },
  ctaLink: {
    type: String,
    default: '#'
  }
});
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-5px);
  transition: all 0.3s ease;
}
</style>