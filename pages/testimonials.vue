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
import { ref, onMounted } from 'vue';
import { queryContent } from '#imports';

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
      // Try a fallback approach - direct import
      testimonials.value = [
        {
          name: "Lee Von Gunten",
          position: "CEO, Watchdog Manufacturing",
          image: "https://placehold.co/80x80",
          content: "We've been working with Geoff and staff for over 12 years with total confidence in the professionality and completeness of their services at fair costs through all of our patent and trademark work. Geoff and his staff are tops. I can't recommend them too highly."
        },
        {
          name: "Matthew Prestwich",
          position: "Ready Holster and Tactical Supply",
          image: "https://placehold.co/80x80",
          content: "Geoff has demonstrated utmost integrity while working on my patents and has an extensive knowledge of all aspects of Intellectual Property law. His work is of the highest quality and is delivered in a timely manner."
        },
        {
          name: "Craig Charlton",
          position: "Lock Jaw Ladder Grip",
          image: "https://placehold.co/80x80",
          content: "I have found Geoff to be a knowledgeable and diligent intellectual property attorney who is also a pleasure to deal with. Geoff was able to provide practical and timely responses to questions I asked."
        },
        {
          name: "Dr. Mark J. Hagmann",
          position: "CTO, NewPath Research, LLC",
          image: "https://placehold.co/80x80",
          content: "Geoffrey Dobbin has been my patent attorney for the past six years and I am highly impressed by his ability to understand a wide range of complex technologies and describe them clearly."
        }
      ];
    }
  } catch (error) {
    console.error('Error loading testimonials:', error);
    // Provide hardcoded fallback data on error
    testimonials.value = [
      {
        name: "Lee Von Gunten",
        position: "CEO, Watchdog Manufacturing",
        image: "https://placehold.co/80x80",
        content: "We've been working with Geoff and staff for over 12 years with total confidence in the professionality and completeness of their services at fair costs through all of our patent and trademark work. Geoff and his staff are tops. I can't recommend them too highly."
      },
      {
        name: "Matthew Prestwich",
        position: "Ready Holster and Tactical Supply",
        image: "https://placehold.co/80x80",
        content: "Geoff has demonstrated utmost integrity while working on my patents and has an extensive knowledge of all aspects of Intellectual Property law. His work is of the highest quality and is delivered in a timely manner."
      },
      {
        name: "Craig Charlton",
        position: "Lock Jaw Ladder Grip",
        image: "https://placehold.co/80x80",
        content: "I have found Geoff to be a knowledgeable and diligent intellectual property attorney who is also a pleasure to deal with. Geoff was able to provide practical and timely responses to questions I asked."
      },
      {
        name: "Dr. Mark J. Hagmann",
        position: "CTO, NewPath Research, LLC",
        image: "https://placehold.co/80x80",
        content: "Geoffrey Dobbin has been my patent attorney for the past six years and I am highly impressed by his ability to understand a wide range of complex technologies and describe them clearly."
      }
    ];
  }
});
</script>
