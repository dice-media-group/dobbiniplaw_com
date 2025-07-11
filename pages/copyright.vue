<template>
  <div>
    <!-- Hero Banner Section -->
    <section class="bg-dobbin-dark-green text-white py-12 w-full">
      <div class="container mx-auto">
        <div class="mx-auto px-4 max-w-[1140px]">
          <h1 class="text-3xl mb-3 font-crimson text-white">Copyright Information</h1>
          <h2 class="text-xl mb-4 font-crimson text-white">With Frequently Asked Questions</h2>
        </div>
      </div>
    </section>
    
    <!-- Introduction Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- FAQ Button - Positioned on the right -->
          <div class="flex justify-end mb-6">
            <a href="#faq" class="bg-dobbin-green hover:bg-dobbin-dark-green text-white py-2 px-4 rounded-md inline-block text-sm">
              Click to View Frequently Asked Questions About Copyrighting
            </a>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4 font-crimson">Registering Copyrights for Authors and Artists</h3>
          </div>
          
          <div class="mb-10">
            <p class="mb-4 font-crimson">
              For some, registering a copyright is the preferred way to protect what you have created. Here at Dobbin IP Law, we can help you with the process of registering copyrights just as we have been doing for over 25 years. We provide professional support so that authors and artists alike can have the best possible protection for their work.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- What is a Copyright Section -->
    <section class="py-8 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-xl font-bold mb-4 font-crimson">What is a Copyright?</h3>
          <p class="mb-6 font-crimson">
            A copyright is a protectable interest granted to an author (or other artist) to protect his or her creative work. It keeps art work in the form of literature, sculpture, painting, drama, or music from being copied, distributed, performed, or displayed by another person or entity. Keep in mind, it protects from copying, not independent creation. It also does not protect ideas, but instead, the expression of those ideas in tangible or appreciable form. Other things it cannot protect include unrecorded improvisational performances, titles, slogans, and portions of works containing information considered common property or themes.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Copyrights and Patents Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-xl font-bold mb-4 font-crimson">Copyrights and Patents</h3>
          <p class="mb-6 font-crimson">
            Like patents, the ability to protect copyrights comes from Article 1, section 8 of our Constitution. However, a patent is a grant from the government, and requires a lengthy application process. A copyright is registered, like sticking your flag on a piece of land. Registration means the government recognizes your claim and is letting the world know it does.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Copyrights and Trademarks Section -->
    <section class="py-8 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-xl font-bold mb-4 font-crimson">Copyrights and Trademarks</h3>
          <p class="mb-6 font-crimson">
            Copyrights are designed to protect original works of authorship. A trademark is used to protect logos, as well as the names of businesses, products, and services. Both are registered rights – basic copyright and trademark rights begin the moment of creation or use, and then are registered with the government to give notice to the world and secure additional rights and assumptions.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Copyright and Fair Use Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-xl font-bold mb-4 font-crimson">Copyrights and Fair Use</h3>
          <p class="mb-4 font-crimson">
            In most situations, only the owner of the copyright can reproduce a creative work and authorize others to do the same. However, there are some limitations. For example, fair use allows a work to be reproduced for reasons deemed "fair" in our free society such as criticism, reporting, teaching, and research. When determining whether or not something should be considered fair, the following factors are used:
          </p>
          <ul class="list-disc ml-8 mb-6 font-crimson">
            <li class="mb-2">The purpose and character of use, including whether or not it is used for a nonprofit or a commercial purpose,</li>
            <li class="mb-2">The nature of the copyright,</li>
            <li class="mb-2">The number of works reproduced in relation to the work as a whole, &</li>
            <li>The effect of the reproduced work's use as a market value of the work.</li>
          </ul>
        </div>
      </div>
    </section>
    
    <!-- Resources and Contact Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Download Guide -->
            <div>
              <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">Download a Step-by-Step Guide to Copyrights</h3>
              <div class="mb-6">
                <a href="/Copyright.pdf" target="_blank">
                  <img src="/img/copyright-guide-thumbnail.jpg" alt="Copyright Guide" class="w-full border border-gray-300" />
                </a>
              </div>
              <div class="text-center">
                <a href="/Copyright.pdf" target="_blank" class="bg-dobbin-green hover:bg-dobbin-dark-green text-white py-3 px-6 rounded-md inline-block font-crimson">
                  Download a Copyright Guide
                </a>
              </div>
            </div>
            
            <!-- Contact an Attorney -->
            <div>
              <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">Contact an Experienced Copyright Attorney</h3>
              <p class="mb-4 font-crimson">
                Please do not hesitate to call us if you have questions regarding your particular project. We would love to set up your complementary strategy session where we can discuss the particulars of your case and help you with any possible issues. If you would like answers to more questions about copyrights, please see the FAQ section below.
              </p>
              <div class="text-center mt-8">
                <a href="/contact" class="bg-dobbin-green hover:bg-dobbin-dark-green text-white py-3 px-6 rounded-md inline-block font-crimson">
                  Schedule a Strategy Session
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Component -->
    <CopyrightFAQ />
  </div>
</template>

<script setup>
import CopyrightFAQ from '~/components/CopyrightFAQ.vue';

// Enhanced SEO with the new composable
useSEO({
  title: 'Copyright Registration Services',
  description: 'Professional copyright registration services for authors, artists, and creators. Protect your creative works including literature, art, music, and more. 25+ years experience serving Utah clients.',
  path: '/copyright/',
  keywords: 'copyright registration, copyright attorney Utah, copyright lawyer, protect creative works, author copyright, artist copyright, copyright services, intellectual property protection'
})

// Add structured data for copyright services
useStructuredData({
  "@type": ["LocalBusiness", "LegalService"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog", 
    "name": "Copyright Legal Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Copyright Registration",
          "description": "Professional copyright registration for authors, artists, and creators",
          "serviceType": "Legal Service",
          "provider": {
            "@type": "LegalService",
            "name": "Dobbin IP Law P.C."
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Copyright Consultation",
          "description": "Expert guidance on copyright protection and fair use",
          "serviceType": "Legal Consultation"
        }
      }
    ]
  },
  "knowsAbout": [
    "Copyright Law",
    "Copyright Registration", 
    "Fair Use",
    "Creative Works Protection",
    "Author Rights",
    "Artist Rights"
  ]
})
</script>

<style scoped>
/* Full width sections */
section.w-full {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
</style>