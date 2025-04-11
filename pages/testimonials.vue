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
    <TestimonialSection :testimonials="testimonials" />
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

// Default empty array
const testimonials = ref([]);

onMounted(async () => {
  try {
    // Fetch testimonials directly to avoid SSR issues
    const testimonialFiles = await queryContent('testimonials')
      .where({ _extension: 'md', _path: { $ne: '/testimonials/index' } })
      .sort({ order: 1 })
      .find();
      
    console.log('Testimonial files:', testimonialFiles);
    
    if (testimonialFiles && testimonialFiles.length) {
      testimonials.value = testimonialFiles;
    } else {
      console.warn('No testimonial files found');
      // Try a fallback approach
      const allContent = await queryContent().find();
      console.log('All content:', allContent);
    }
  } catch (error) {
    console.error('Error loading testimonials:', error);
  }
});
</script>
