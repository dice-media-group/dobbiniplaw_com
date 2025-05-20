<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col md:flex-row gap-12 items-center">
        <div class="md:w-1/3">
          <img :src="imageSrc" :alt="name" class="rounded-lg shadow-lg mx-auto">
        </div>
        
        <div class="md:w-2/3">
          <h2 class="text-3xl font-bold mb-6 font-crimson text-dobbin-dark-green">{{ title }}</h2>
          
          <div v-for="(paragraph, index) in paragraphs" :key="index" class="text-gray-700 mb-6 font-crimson">
            {{ paragraph }}
          </div>
          
          <div class="flex flex-wrap gap-4 mb-6">
            <div v-for="(stat, index) in stats" :key="index" class="bg-white p-4 rounded-lg shadow flex items-center gap-3 min-w-[180px]">
              <div class="bg-dobbin-dark-green rounded-full w-12 h-12 flex items-center justify-center text-white">
                <svg v-if="stat.icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600">{{ stat.label }}</p>
                <p class="font-bold text-dobbin-dark-green">{{ stat.value }}</p>
              </div>
            </div>
          </div>
          
          <a :href="ctaLink" class="text-dobbin-dark-green font-semibold hover:underline flex items-center gap-1">
            {{ ctaText }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Meet Your Attorney'
  },
  imageSrc: {
    type: String,
    required: true
  },
  paragraphs: {
    type: Array,
    required: true
  },
  stats: {
    type: Array,
    default: () => []
  },
  ctaText: {
    type: String,
    default: 'Learn more'
  },
  ctaLink: {
    type: String,
    default: '/about'
  }
});
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>