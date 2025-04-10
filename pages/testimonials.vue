<template>
  <div>
    <!-- Use the reusable hero banner component with just title and no content -->
    <HeroBanner title="Testimonials" :hasContent="false" />
    
    <!-- Testimonials Video Section -->
    <section class="py-8">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="mx-auto">
          <!-- Testimonials Container -->
          <div class="space-y-8">
            <!-- Embedded Video -->
            <div class="bg-gray-100 p-2 rounded-lg shadow-md">
              <div class="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.youtube.com/embed/18gFVGE2Za0" 
                  title="Dobbin IP Law Testimonials" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                  class="w-full h-full">
                </iframe>
              </div>
            </div>
            
            <!-- Testimonial 1 -->
            <div class="bg-white p-6 border border-gray-200 shadow-md rounded-lg">
              <svg class="w-10 h-10 text-dobbin-dark-green opacity-50 mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <div class="mb-6">
                <p class="font-crimson text-dobbin-gray italic mb-4">
                  I've known Geoff Dobbin and have used him as my patent attorney for over 7 years. During that time Geoff has filed multiple patents for me. Before meeting Geoff I consulted other patent attorneys and always came away frustrated that I could not get definite answers to my questions. It was refreshing when on my very first meeting with Geoff he gave me straight answers, explaining even the most complicated Intellectual Property issues in easy to understand language. Geoff has demonstrated utmost integrity while working on my patents and has an extensive knowledge of all aspects of Intellectual Property law. His work is of the highest quality and is delivered in a timely manner. I'm pleased to give Geoff my highest recommendation for your Intellectual Property work.
                </p>
                
                <p class="font-crimson font-bold">Matthew Prestwich</p>
                <p class="font-crimson">Ready Holster and Tactical Supply</p>
              </div>
            </div>
            
            <!-- Testimonial 2 -->
            <div class="bg-white p-6 border border-gray-200 shadow-md rounded-lg">
              <svg class="w-10 h-10 text-dobbin-dark-green opacity-50 mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <div class="mb-6">
                <p class="font-crimson text-dobbin-gray italic mb-4">
                  Geoffrey Dobbin has been my patent attorney for the past six years and I am highly impressed by his ability to understand a wide range of complex technologies and describe them clearly, suggest appropriate strategies for intellectual property, and his adroitness in communicating with the USPTO.
                </p>
                
                <p class="font-crimson font-bold">Dr. Mark J. Hagmann, CTO</p>
                <p class="font-crimson">NewPath Research, LLC</p>
              </div>
            </div>
            
            <!-- Testimonial 3 -->
            <div class="bg-white p-6 border border-gray-200 shadow-md rounded-lg">
              <svg class="w-10 h-10 text-dobbin-dark-green opacity-50 mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <div class="mb-6">
                <p class="font-crimson text-dobbin-gray italic mb-4">
                  I have been working with Geoff Dobbin for approximately 8 years in relation to a range of patent, trademark and product licensing matters. I have found Geoff to be a knowledgeable and diligent intellectual property attorney who is also a pleasure to deal with. Geoff was able to provide practical and timely responses to questions I asked and was instrumental in finalizing patents and a trademark for my invention. I would not hesitate in recommending Geoff.
                </p>
                
                <p class="font-crimson font-bold">Craig Charlton - Australia</p>
                <p class="font-crimson">Lock Jaw Ladder Grip</p>
              </div>
            </div>
            
            <!-- Testimonial 4 -->
            <div class="bg-white p-6 border border-gray-200 shadow-md rounded-lg">
              <svg class="w-10 h-10 text-dobbin-dark-green opacity-50 mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <div class="mb-6">
                <p class="font-crimson text-dobbin-gray italic mb-4">
                  I am Lee Von Gunten, CEO of Watchdog manufacturing, where we produce and sell Home Security products such as our Watchdog Timers and others. I am pleased and proud to offer this short but sweet testimonial regarding Geoff Dobbin and his team at Dobbin IP Law P.C. This is a voluntary testimonial for Geoff and his company. Geoff did not ask for it.
                </p>
                
                <p class="font-crimson text-dobbin-gray italic mb-4">
                  We've been working with Geoff and staff for over 12 years with total confidence in the professionality and completeness of their services at fair costs through all of our patent and trademark work. Geoff has been there for us to help and answer questions and to advise us in all matters of Intellectual Law through several patent applications and trademark listings.
                </p>
                
                <p class="font-crimson text-dobbin-gray italic mb-4">
                  Geoff and his staff are tops. I can't recommend them too highly.
                </p>
                
                <p class="font-crimson text-dobbin-gray italic mb-4">
                  Thank you,
                </p>
                
                <p class="font-crimson font-bold">Lee Von Gunten, CEO</p>
                <p class="font-crimson">Watchdog Manufacturing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Call To Action -->
    <section class="py-8 bg-dobbin-dark-green text-white">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="mx-auto text-center">
          <h2 class="text-2xl font-bold mb-4 font-crimson">Ready to Protect Your Intellectual Property?</h2>
          <p class="mb-6 font-crimson">
            Contact us today to schedule your complementary strategy session and see how we can help protect your inventions, copyrights, and trademarks.
          </p>
          <a href="/schedule-strategy-session" class="inline-block bg-white text-dobbin-dark-green font-bold py-2 px-8 rounded hover:bg-gray-100 transition font-crimson">
            Schedule a Strategy Session
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroBanner from '../components/HeroBanner.vue';

useHead({
  title: 'Testimonials | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Read what clients are saying about Dobbin IP Law and our patent, trademark, and copyright services.' }
  ]
})
</script>

<style scoped>
/* Aspect ratio for video */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Adjust the max width for desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
  }
}
</style>