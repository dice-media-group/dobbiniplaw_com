<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 max-w-5xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <TestimonialCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :testimonial="testimonial"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import TestimonialCard from './TestimonialCard.vue';

defineProps({
  testimonials: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>
