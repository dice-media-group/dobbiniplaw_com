<template>
  <div>
    <!-- Use the reusable hero banner component with title and content -->
    <HeroBanner 
      title="Testimonials" 
    >
      <p class="mb-4 font-crimson text-white"></p>
    </HeroBanner>
    
    <!-- YouTube Video Section -->
    <section class="py-10 bg-white">
      <div class="container mx-auto">
        <div class="mx-auto px-4 max-w-[1140px]">
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
      </div>
    </section>
    
    <!-- Testimonials Grid -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto">
        <div class="mx-auto px-4 max-w-[1140px]">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="(testimonial, index) in testimonials" :key="index" 
                 class="testimonial-card bg-white p-8 rounded-lg shadow-md">
              <div class="relative">
                <!-- SVG quote icon -->
                <svg class="w-16 h-16 text-dobbin-dark-green opacity-25 absolute -top-8 -left-4" 
                     fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
                </svg>
                
                <!-- Testimonial content -->
                <div class="mb-8 text-dobbin-gray">
                  <p v-for="(paragraph, i) in testimonial.content.split('\n\n')" 
                     :key="i" 
                     class="font-crimson text-lg mb-6 italic">
                    {{ paragraph }}
                  </p>
                </div>
                
                <!-- Testimonial author -->
                <div>
                  <p class="font-crimson font-bold text-lg">{{ testimonial.name }}</p>
                  <p class="font-crimson text-sm">{{ testimonial.position }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroBanner from '../components/HeroBanner.vue';
import { ref } from 'vue';

// Enhanced SEO with the new composable
useSEO({
  title: 'Client Testimonials & Reviews',
  description: 'See what our clients say. Read testimonials about our patent, trademark, and IP legal services from Utah inventors and businesses we\'ve helped protect.',
  path: '/testimonials/',
  keywords: 'client testimonials, patent attorney reviews, IP lawyer testimonials, client feedback, satisfied clients, patent attorney Utah reviews'
})

// ✅ ADD: Import the structured data function
const { useStructuredData } = await import('~/composables/useSEO.js')

// Now this will work:
useStructuredData({
  "@type": ["LocalBusiness", "LegalService"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "4",
    "bestRating": "5",
    "worstRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Lee Von Gunten"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "We've been working with Geoff and staff for over 12 years with total confidence in the professionality and completeness of their services at fair costs through all of our patent and trademark work."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Matthew Prestwich"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Geoff gave me straight answers, explaining even the most complicated Intellectual Property issues in easy to understand language. His work is of the highest quality and is delivered in a timely manner."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Craig Charlton"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Geoff is a knowledgeable and diligent intellectual property attorney who is also a pleasure to deal with. I would not hesitate in recommending Geoff."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Dr. Mark J. Hagmann"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Geoffrey Dobbin has been my patent attorney for the past six years and I am highly impressed by his ability to understand a wide range of complex technologies and describe them clearly."
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Client Success Stories",
    "description": "Long-term client relationships spanning 6-12+ years"
  }
})

// Define testimonials directly
const testimonials = ref([
  {
    name: "Lee Von Gunten",
    position: "CEO, Watchdog Manufacturing",
    content: "I am Lee Von Gunten, CEO of Watchdog manufacturing, where we produce and sell Home Security products such as our Watchdog Timers and others. I am pleased and proud to offer this short but sweet testimonial regarding Geoff Dobbin and his team at Dobbin IP Law P.C. This is a voluntary testimonial for Geoff and his company. Geoff did not ask for it.\n\nWe've been working with Geoff and staff for over 12 years with total confidence in the professionality and completeness of their services at fair costs through all of our patent and trademark work. Geoff has been there for us to help and answer questions and to advise us in all matters of Intellectual Law through several patent applications and trademark listings.\n\nGeoff and his staff are tops. I can't recommend them too highly."
  },
  {
    name: "Matthew Prestwich",
    position: "Ready Holster and Tactical Supply",
    content: "I’ve known Geoff Dobbin and have used him as my patent attorney for over 7 years. During that time Geoff has filed multiple patents for me. Before meeting Geoff I consulted other patent attorneys and always came away frustrated that I could not get definite answers to my questions. It was refreshing when on my very first meeting with Geoff he gave me straight answers, explaining even the most complicated Intellectual Property issues in easy to understand language. Geoff has demonstrated utmost integrity while working on my patents and has an extensive knowledge of all aspects of Intellectual Property law. His work is of the highest quality and is delivered in a timely manner. I’m pleased to give Geoff my highest recommendation for your Intellectual Property work."
  },
  {
    name: "Craig Charlton",
    position: "Lock Jaw Ladder Grip",
    content: "I have been working with Geoff Dobbin for approximately 8 years in relation to a range of patent, trademark and product licensing matters. I have found Geoff to be a knowledgeable and diligent intellectual property attorney who is also a pleasure to deal with. Geoff was able to provide practical and timely responses to questions I asked and was instrumental in finalizing patents and a trademark for my invention. I would not hesitate in recommending Geoff."
  },
  {
    name: "Dr. Mark J. Hagmann",
    position: "CTO, NewPath Research, LLC",
    content: "Geoffrey Dobbin has been my patent attorney for the past six years and I am highly impressed by his ability to understand a wide range of complex technologies and describe them clearly, suggest appropriate strategies for intellectual property, and his adroitness in communicating with the USPTO.."
  }
]);
</script>
