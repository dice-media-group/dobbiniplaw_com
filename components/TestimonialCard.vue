<template>
  <div class="testimonial-card">
    <div class="relative">
      <!-- Quote SVG icon -->
      <svg class="w-16 h-16 text-dobbin-dark-green opacity-25 absolute -top-8 -left-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      
      <!-- Testimonial content -->
      <div class="mb-8 text-dobbin-gray">
        <p 
          v-for="(paragraph, index) in testimonialParagraphs" 
          :key="index" 
          class="font-crimson text-lg italic mb-6"
        >
          {{ paragraph }}
        </p>
      </div>
      
      <!-- Client information -->
      <div class="flex items-center">
        <div class="mr-4">
          <img :src="clientImage || 'https://placehold.co/80x80'" :alt="clientName" class="w-16 h-16 rounded-full">
        </div>
        <div>
          <p class="font-crimson font-bold text-lg">{{ clientName }}</p>
          <p class="font-crimson text-sm">{{ clientPosition }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  testimonial: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  clientPosition: {
    type: String,
    required: true
  },
  clientImage: {
    type: String,
    default: 'https://placehold.co/80x80'
  }
});

// Split the testimonial text into paragraphs
const testimonialParagraphs = computed(() => {
  return props.testimonial.split('\n\n').filter(p => p.trim() !== '');
});
</script>

<style scoped>
.testimonial-card {
  position: relative;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
