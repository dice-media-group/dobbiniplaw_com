<template>
  <div>
    <!-- Use H2 for HeroBanner -->
    <HeroBanner title="About Dobbin IP Law">
      <p class="font-crimson text-white">
        With over 25 years of experience protecting intellectual property, we're here to help inventors and creators secure their innovations. Call us today to discuss how we can protect your valuable ideas and creations.
      </p>
    </HeroBanner>
    
    <!-- Add main H1 for the page -->
    <section class="py-6">
      <div class="container mx-auto">
        <div class="mx-auto px-4 max-w-[1140px]">
          <h1 class="sr-only">About Dobbin IP Law - Meet Our Intellectual Property Attorney Team</h1>
          
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
                For over 25 years, Geoff Dobbin has assisted independent inventors and other creators of intellectual property with protecting their "babies." He understands just how invested you can feel after all the hard work that went into your creation.
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
                Chris is Dobbin IP Law's Certified Paralegal (CP®) and Notary Public, and he assists Mr. Dobbin with legal research, document drafting, coordinating with clients on various patents, trademarks, and copyright matters, and in general helps keep the office running. Outside of the office, Chris enjoys volunteering with youth, the outdoors, film photography, and board games.
              </p>
              <p class="font-crimson text-dobbin-gray">
                CP® is a registered trademark owned by the National Association of Legal Assistants, Inc. and is used with authorization.
              </p>
            </div>
            <div class="md:col-span-1 order-1 md:order-2">
              <img src="/img/chris_the_paralegal.jpg" alt="Chris Dobbin's paralegal" class="w-full rounded shadow-md">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroBanner from '../components/HeroBanner.vue';

// ✅ TEMPORARILY DISABLED - testing redirect issues
// useSEO({
//   title: 'About Us',
//   description: 'Meet Geoff Dobbin, a Utah IP attorney with 25+ years of experience. Learn about our firm\'s commitment to protecting inventors with clear, strategic legal counsel.',
//   keywords: 'Geoff Dobbin attorney, intellectual property lawyer Utah, patent attorney experience, trademark lawyer background, IP law firm team, Utah patent attorney'
// })

// ✅ TEMPORARILY DISABLED - testing redirect issues  
// useStructuredData({
//   "@type": ["LocalBusiness", "LegalService", "Attorney"],
//   "founder": {
//     "@type": "Person",
//     "name": "Geoff Dobbin",
//     "jobTitle": "Intellectual Property Attorney",
//     "alumniOf": [
//       {
//         "@type": "CollegeOrUniversity",
//         "name": "University of Colorado",
//         "degree": "J.D."
//       },
//       {
//         "@type": "CollegeOrUniversity", 
//         "name": "Alfred University",
//         "degree": "B.A. Physics"
//       }
//     ],
//     "memberOf": [
//       {
//         "@type": "Organization",
//         "name": "Utah State Bar"
//       },
//       {
//         "@type": "Organization",
//         "name": "U.S. Patent & Trademark Office"
//       }
//     ],
//     "yearsOfExperience": "25+"
//   },
//   "employee": [
//     {
//       "@type": "Person",
//       "name": "Chris",
//       "jobTitle": "Certified Paralegal"
//     }
//   ],
//   "foundingDate": "2004"
// })

// Basic head setup without SEO module
useHead({
  title: 'About Us | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Meet Geoff Dobbin, a Utah IP attorney with 25+ years of experience.' }
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