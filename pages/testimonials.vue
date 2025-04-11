<template>
  <div>
    <!-- Use the reusable hero banner component with title and content -->
    <HeroBanner 
      title="Testimonials" 
    >
      <p class="mb-4 font-crimson text-white"></p>
    </HeroBanner>
    
    <!-- YouTube Video Section -->
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto px-4" style="max-width: 1024px;">
        <h2 class="text-2xl font-crimson font-bold text-dobbin-dark-green mb-6 text-center">Watch Our Client Video</h2>
        <div class="relative pb-16:9 h-0" style="padding-bottom: 56.25%;">
          <iframe 
            class="absolute top-0 left-0 w-full h-full" 
            src="https://www.youtube.com/embed/18gFVGE2Za0" 
            title="Dobbin IP Law Client Testimonial Video" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>
    
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

// Define testimonials directly
const testimonials = ref([
  {
    name: "Lee Von Gunten",
    position: "CEO, Watchdog Manufacturing",
    content: "We've been working with Geoff and staff for over 12 years with total confidence in the professionality and completeness of their services at fair costs through all of our patent and trademark work. Geoff and his staff are tops. I can't recommend them too highly."
  },
  {
    name: "Matthew Prestwich",
    position: "Ready Holster and Tactical Supply",
    content: "Geoff has demonstrated utmost integrity while working on my patents and has an extensive knowledge of all aspects of Intellectual Property law. His work is of the highest quality and is delivered in a timely manner."
  },
  {
    name: "Craig Charlton",
    position: "Lock Jaw Ladder Grip",
    content: "I have found Geoff to be a knowledgeable and diligent intellectual property attorney who is also a pleasure to deal with. Geoff was able to provide practical and timely responses to questions I asked."
  },
  {
    name: "Dr. Mark J. Hagmann",
    position: "CTO, NewPath Research, LLC",
    content: "Geoffrey Dobbin has been my patent attorney for the past six years and I am highly impressed by his ability to understand a wide range of complex technologies and describe them clearly."
  }
]);
</script>
