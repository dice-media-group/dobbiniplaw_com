<template>
  <div>
    <!-- Hero Banner Section -->
    <section class="bg-dobbin-dark-green text-white py-12 w-full">
      <div class="container mx-auto">
        <div class="mx-auto px-4 max-w-[1140px]">
          <h1 class="text-3xl mb-3 font-crimson text-white">Trademark Information</h1>
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
              Click to View Frequently Asked Questions About Trademarks
            </a>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4 font-crimson">Utah Attorney Protecting Your Brand Nationally</h3>
          </div>
          
          <div class="mb-10">
            <p class="mb-4 font-crimson">
              Your trademark is your identity. Just like you need to be vigilant in protecting your identity, you need to be vigilant in protecting your mark. Registering your trademark helps protect you from "identity" theft in the form of counterfeit goods and services and unfair competition. Registering your trademark can be a complex legal process, and having an experienced attorney can help you avoid unnecessary time, expense, and heart ache.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- About Trademarks Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-xl font-bold mb-4 font-crimson">About Trademarks</h3>
          <p class="mb-4 font-crimson">
            A trademark is anything you use to identify your goods and/or services to the world, just as your own name identifies you. Most are words, some form of graphic design, or a combination of word and design. They can either be registered by the federal government or, where available, a state government. They can also be established by using the mark appropriately. Therefore, that there are two trademark classifications: common law and registered.
          </p>
          <p class="mb-6 font-crimson">
            It is not necessary to register your mark for it to have rights – it can exist and be protectable in your home state or (wherever you used it) merely by the fact you are using it. However, there are several benefits to registering your mark. These include: a public notice of ownership, constructive use in all fifty states, a legal declaration of your rights to the mark and the ability to use it, expand it, and protect it. You can also gain the ability to more easily obtain protection for your mark in other countries.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Trademark Symbols Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-xl font-bold mb-4 font-crimson">Trademarks Symbols and Types</h3>
          <p class="mb-4 font-crimson">
            There are several different trademark symbols. They include:
          </p>
          <ul class="mb-6 list-disc pl-6 font-crimson">
            <li class="mb-2"><strong>®</strong> This symbol means the mark is federally registered. It may be used for either a trademark or service mark.</li>
            <li class="mb-2"><strong>TM</strong> This symbol means that the mark is claimed. It may or may not be in the process of being registered, and may even be registered. It also may or may not be protectable. The TM marking is generally used for physical goods.</li>
            <li class="mb-2"><strong>SM</strong> Like the TM symbol, this symbol means that it is claimed, and generally refers to a service.</li>
          </ul>
        </div>
      </div>
    </section>
    
    <!-- Trade Dress Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-xl font-bold mb-4 font-crimson">Trade Dress</h3>
          <p class="mb-6 font-crimson">
            The image and identity you create as a whole when packaging your goods for sale or when advertising your serves is called a "trade dress." While not a mark, per se, a distinctive trade dress is protectable under Federal and most state laws.
          </p>
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
              <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">Download a Step-by-Step Guide to Trademarks</h3>
              <div class="mb-6">
                <a href="/Trademark.pdf" target="_blank">
                  <img src="/img/trademark-guide-thumbnail.jpg" alt="Trademark Guide" class="w-full border border-gray-300" />
                </a>
              </div>
              <div class="text-center">
                <a href="/Trademark.pdf" target="_blank" class="bg-dobbin-green hover:bg-dobbin-dark-green text-white py-3 px-6 rounded-md inline-block font-crimson">
                  Download a Trademark Guide
                </a>
              </div>
            </div>
            
            <!-- Contact an Attorney -->
            <div>
              <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">Contact an Experienced Trademark Attorney</h3>
              <p class="mb-4 font-crimson">
                If you would like more information regarding trademarks, how they work, and the registration process, please visit our Trademark FAQ section below for answers to common questions.
              </p>
              <p class="mb-6 font-crimson">
                For additional questions, or including questions regarding your particular mark, do not hesitate to 
                <NuxtLink to="/contact" class="text-dobbin-green hover:text-dobbin-dark-green">contact us</NuxtLink>. 
                We would love to schedule your complementary strategy session and help you through any questions or problems you might have.
              </p>
              <div class="text-center">
                <NuxtLink to="/contact" class="bg-dobbin-green hover:bg-dobbin-dark-green text-white py-3 px-6 rounded-md inline-block font-crimson">
                  Schedule a Strategy Session
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Component -->
    <TrademarkFAQ />
    
  </div>
</template>

<script setup>
import TrademarkFAQ from '~/components/TrademarkFAQ.vue';

// Enhanced SEO with the new composable
useSEO({
  title: 'Trademark Registration & Brand Protection',
  description: 'Protect your brand with professional trademark registration services. Utah trademark attorney with expertise in federal trademark applications, trade dress, and brand protection strategies.',
  path: '/trademarks/',
  keywords: 'trademark attorney Utah, trademark registration, brand protection, federal trademark, trademark lawyer, trademark search, trade dress protection, Utah trademark services'
})

// Add structured data for trademark services
useStructuredData({
  "@type": ["LocalBusiness", "LegalService"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Trademark Legal Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Federal Trademark Registration",
          "description": "Complete federal trademark application and prosecution services through USPTO"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Trademark Search & Clearance",
          "description": "Comprehensive trademark searches and clearance opinions before filing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Trade Dress Protection",
          "description": "Protection for distinctive packaging, product design, and overall commercial impression"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Trademark Monitoring & Enforcement",
          "description": "Ongoing trademark monitoring and enforcement services to protect your brand"
        }
      }
    ]
  },
  "knowsAbout": [
    "Federal Trademark Registration",
    "USPTO Procedures",
    "Trademark Prosecution",
    "Brand Protection",
    "Trade Dress",
    "Trademark Opposition",
    "Trademark Cancellation",
    "International Trademark Protection"
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "USPTO Registration",
    "recognizedBy": {
      "@type": "Organization",
      "name": "United States Patent and Trademark Office"
    }
  }
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