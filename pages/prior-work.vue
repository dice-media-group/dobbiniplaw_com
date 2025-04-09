<template>
  <div>
    <ContentRefresh ref="contentRefresh" />
    <HeroBanner title="Prior Work" />
    
    <section class="py-8 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <p class="text-base leading-relaxed text-gray-700">
            Below, are some actual examples of past work. To view click the patent number.
          </p>
          
          <DebugControls
            v-model:show="showDebugControls"
            :messages="debugOutput"
            @refresh-content="refreshContent"
            @list-files="listContentFiles"
            @force-refresh="forceRefresh"
            @clear-messages="debugOutput = []"
          />
        </div>
      </div>
    </section>
    
    <PatentCarousel ref="carousel" />
    
    <section class="py-12 bg-white text-center">
      <div class="container mx-auto px-4">
        <a 
          href="#" 
          class="inline-block bg-dobbin-dark-green hover:bg-dobbin-green text-white font-bold py-3 px-6"
        >
          To see more, please click here.
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDebugLog } from '~/composables/useDebugLog';
import PatentCarousel from '~/components/PatentCarousel/PatentCarousel.vue';

const carousel = ref(null);
const contentRefresh = ref(null);
const showDebugControls = ref(false);
const { debugOutput, logDebug } = useDebugLog();

// ... rest of the script implementation moved to composables ...

useHead({
  title: 'Prior Work | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Examples of our past work in patents, trademarks, and copyrights across various technical fields.' }
  ]
});
</script>