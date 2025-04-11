<template>
  <div>
    <!-- Use the reusable hero banner component with title and content -->
    <HeroBanner 
      title="Client Testimonials" 
      subtitle="What Our Clients Are Saying"
    >
      <p class="mb-4 font-crimson text-white">At Dobbin IP Law P.C., we pride ourselves on our client relationships and the quality of our intellectual property services. Here's what some of our valued clients have to say about working with us.</p>
    </HeroBanner>
    
    <!-- Testimonials Grid using our new component -->
    <TestimonialSection :testimonials="testimonials || []" />
  </div>
</template>

<script setup>
import HeroBanner from '../components/HeroBanner.vue';
import TestimonialSection from '../components/TestimonialSection.vue';
import { ref } from 'vue';

useHead({
  title: 'Testimonials | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Read what our clients say about working with Dobbin IP Law P.C. on patents, trademarks, and copyrights.' }
  ]
});

// Import testimonials directly
import testimonialData from '../content/testimonials/testimonials.json';
const testimonials = ref(testimonialData);
</script>
