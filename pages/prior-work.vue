<template>
  <div>
    <!-- Header Section -->
    <HeroBanner title="Prior Work" />
    
    <!-- Intro Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <p class="mb-6 text-base leading-relaxed text-gray-700">
            Patents have been secured in a wide range of technical fields, including: flashlights & worklights, laboratory equipment, hunting & fishing equipment, 
            computer hardware/architecture, animal leashes, household items, semiconductors, lasers and LEDs, dentistry, mailboxes, forensics, exercise equipment, 
            games, and especially firearms, ordinance, and firearm accessories. Many trademarks and copyrights have also been registered.
          </p>
          
          <p class="mb-10 text-base leading-relaxed text-gray-700">
            Below, are some actual examples of past work. To view click the patent number.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Patent Carousel Section with full-width background -->
    <PatentCarousel :slides="patentSlides" />
    
    <!-- Call to Action Button -->
    <section class="py-12 bg-white text-center">
      <div class="container mx-auto px-4">
        <a href="#" class="inline-block bg-dobbin-dark-green hover:bg-dobbin-green text-white font-bold py-3 px-8 transition-colors duration-300">
          To see more, please click here.
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import PatentCarousel from '~/components/PatentCarousel.vue';

// Define patent examples for the carousel
const patentSlides = [
  {
    title: "Monolithic LED Chip to Emit Multiple Colors",
    description: "A light emitting diode chip with red, green and blue light emission regions on a single substrate. The light emission regions may be powered selectively to only emit one color light at a time. Or all three regions may be powered simultaneously so that the LED chip emits white light.",
    image: "/img/led-chip.png",
    patentNumber: "7,271,420",
    linkText: "Patent 7,271,420"
  },
  {
    title: "Magazine Grip",
    description: "A magazine grip attachment for ammunition magazines to aid in extraction of magazines from ammunition pouches, providing better grip and reducing noise.",
    image: "/img/magazine-grip.png",
    patentNumber: "9,341,429",
    linkText: "Patent 9,341,429"
  },
  {
    title: "Firearm Gas System",
    description: "A gas system for a firearm comprising a hollow gas tube extending between a forward gas tap in a firearm's barrel and a rearward piston assembly to operate the bolt system.",
    image: "/img/firearm-gas.png",
    patentNumber: "8,689,672",
    linkText: "Patent 8,689,672"
  },
  {
    title: "Security Mailbox",
    description: "A security mailbox utilizing a combination package rest and security panel, with a mail slot to prevent easy access to contents.",
    image: "/img/security-mailbox.png",
    patentNumber: "8,757,494",
    linkText: "Patent 8,757,494"
  }
];

useHead({
  title: 'Prior Work | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Examples of our past work in patents, trademarks, and copyrights across various technical fields.' }
  ]
})
</script>

<style scoped>
/* Add custom styling here if needed */
</style>