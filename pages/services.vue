<template>
  <div>
    <!-- Use the reusable hero banner component -->
    <HeroBanner title="Our Services">
      <p class="font-crimson text-white">
        At Dobbin IP Law, we offer a range of intellectual property services including patents, trademarks, and copyrights. Contact us to discuss how we can help protect your intellectual property.
      </p>
    </HeroBanner>
    
    <div class="services-page container mx-auto px-4 max-w-6xl py-8">
      <ContentDoc />
    </div>
  </div>
</template>

<script setup>
import HeroBanner from '../components/HeroBanner.vue';

useHead({
  title: 'Our Services | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Dobbin IP Law offers comprehensive intellectual property services including patents, trademarks, and copyrights.' }
  ]
})
</script>

<style scoped>
.services-page {
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
  }
}
</style>