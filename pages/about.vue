<template>
  <div>
    <!-- Use the reusable hero banner component with just title -->
    <HeroBanner title="About Dobbin IP Law">
      <p class="font-crimson text-white">
        We are committed to continue serving you in these trying times. We are still open for business and will be using telephonic and video calls. Please call and let's see how we can best help you!
      </p>
    </HeroBanner>
    
    <!-- Geoff Section -->
    <section class="py-6">
      <div class="container mx-auto">
        <div class="mx-auto px-4 max-w-[1140px]">
          <h2 class="text-xl font-crimson text-dobbin-dark-green border-b border-gray-200 pb-1 mb-1">Geoff</h2>
          <p class="mb-4 italic text-sm font-crimson text-dobbin-gray">
            Intellectual property attorney protects inventions and other creations
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <div class="md:col-span-1">
              <div class="mx-2 my-2">
                <img src="/img/geoff-dobbin.jpg" alt="Geoff Dobbin" class="w-full rounded shadow-md">
              </div>
            </div>
            <div class="md:col-span-3">
              <p class="mb-3 font-crimson text-dobbin-gray">
                For over 20 years, Geoff Dobbin has assisted independent inventors and other creators of intellectual property with protecting their "babies." He understands just how invested you can feel after all the hard work that went into your creation.
              </p>
              <p class="mb-3 font-crimson text-dobbin-gray">
                Although he founded Dobbin IP Law P.C. when he moved to Utah in 2004, Geoff has been practicing intellectual property law and representing creators in need of patents, copyrights and trademarks since 1998. With a degree in physics that gives him a solid scientific background to understand many different technical fields, he is quick on the uptake and easily grasps new concepts and ideas, no matter how complex.
              </p>
              <p class="font-crimson text-dobbin-gray">
                Geoff is a solo practitioner with a strong track record as evidenced by his prior work. He especially enjoys working with independent inventors and watching businesses grow and expand. He is an avid fan of Doctor Who, the Lord of the Rings, Star Wars, and Star Trek. In his spare time he enjoys smoking various kinds of foods and volunteers at his local church.
              </p>
            </div>
          </div>
          
          <!-- Practice Areas, Bar Admissions, Education Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <h3 class="text-base font-bold mb-2 font-crimson text-dobbin-dark-green">Practice Areas</h3>
              <ul class="list-disc pl-5 font-crimson text-dobbin-gray">
                <li>Intellectual Property</li>
                <li>Patents</li>
                <li>Trademarks</li>
                <li>Copyrights</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-base font-bold mb-2 font-crimson text-dobbin-dark-green">Bar Admissions</h3>
              <ul class="list-disc pl-5 font-crimson text-dobbin-gray">
                <li>Colorado, 1997 (inactive)</li>
                <li>Utah, 2002</li>
                <li>U.S. Patent & Trademark Office, 1998</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-base font-bold mb-2 font-crimson text-dobbin-dark-green">Education</h3>
              <ul class="list-disc pl-5 font-crimson text-dobbin-gray">
                <li>J.D., University of Colorado, 1997</li>
                <li>B.A., Physics, Alfred University, 1994</li>
              </ul>
            </div>
          </div>
          
          <!-- Paralegal Section -->
          <h2 class="text-xl font-crimson text-dobbin-dark-green border-b border-gray-200 pb-1 mb-1">Chris</h2>
          <p class="mb-4 italic text-sm font-crimson text-dobbin-gray">
            Paralegal
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="md:col-span-3 order-2 md:order-1">
              <p class="mb-3 font-crimson text-dobbin-gray">
                Chris is Dobbin IP Law’s Certified Paralegal (CP®) and Notary Public, and he assists Mr. Dobbin with legal research, document drafting, coordinating with clients on various patents, trademarks, and copyright matters, and in general helps keep the office running. Outside of the office, Chris enjoys volunteering with youth, the outdoors, film photography, and board games.
              </p>
              <p class="font-crimson text-dobbin-gray">
                CP® is a registered trademark owned by the National Association of Legal Assistants, Inc. and is used with authorization.
              </p>
            </div>
            <div class="md:col-span-1 order-1 md:order-2">
              <!-- Chris' profile image goes here when we recieve it -->
              <!-- <img src="https://placehold.co/300x300?text=Chris" alt="Chris" class="w-full"> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroBanner from '../components/HeroBanner.vue';

useHead({
  title: 'About Us | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Learn about the team at Dobbin IP Law, specializing in patents, trademarks, and copyrights for over 20 years.' }
  ]
})
</script>

<style scoped>
/* Font weight for headings */
h2 {
  font-weight: normal;
}

/* Custom italic style for the description */
.italic {
  font-style: italic;
}

/* Define global container for content alignment */
.container {
  width: 100%;
}
</style>