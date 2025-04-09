<template>
  <div>
    <!-- Content Refresh Tool -->
    <ContentRefresh ref="contentRefresh" />
    
    <!-- Header Section -->
    <HeroBanner title="Prior Work" />
    
    <!-- Intro Section -->
    <section class="py-8 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <p class="text-base leading-relaxed text-gray-700">
            Below, are some actual examples of past work. To view click the patent number.
          </p>
          
          <!-- Debug buttons (remove in production) -->
          <div class="mt-4 space-x-2" v-if="showDebugControls">
            <button 
              @click="refreshContent" 
              class="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            >
              Refresh Content
            </button>
            <button 
              @click="listContentFiles" 
              class="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            >
              List Content Files
            </button>
            <button 
              @click="forceRefresh" 
              class="text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded"
            >
              Force Refresh
            </button>
            <button 
              @click="showDebugControls = false" 
              class="text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
            >
              Hide Debug
            </button>
          </div>
          <button 
            v-else 
            @click="showDebugControls = true" 
            class="mt-4 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
          >
            Debug
          </button>
        </div>
      </div>
    </section>
    
    <!-- Patent Carousel Section with full-width background -->
    <PatentCarousel ref="carousel" />
    
    <!-- Call to Action Button -->
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
    
    <!-- Debug console output (remove in production) -->
    <div v-if="debugOutput.length > 0 && showDebugControls" class="fixed bottom-0 right-0 bg-black/80 text-white p-4 m-4 rounded text-xs z-50 max-w-md max-h-60 overflow-auto">
      <h4 class="font-bold mb-1">Debug Output:</h4>
      <div v-for="(msg, idx) in debugOutput" :key="idx" class="mb-1">
        {{ msg }}
      </div>
      <button @click="debugOutput = []" class="absolute top-1 right-1 text-white">Clear</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PatentCarousel from '~/components/PatentCarousel.vue';
import ContentRefresh from '~/components/ContentRefresh.vue';

// Debug helpers
const carousel = ref(null);
const contentRefresh = ref(null);
const showDebugControls = ref(false);
const debugOutput = ref([]);

// Add to debug output
const logDebug = (message) => {
  debugOutput.value.push(`[${new Date().toLocaleTimeString()}] ${message}`);
  console.log(message);
};

// Refresh content in carousel
const refreshContent = async () => {
  if (!carousel.value) {
    logDebug('Carousel component not loaded');
    return;
  }
  
  logDebug('Refreshing carousel content...');
  await carousel.value.refreshContent();
  logDebug(`Content refreshed. Found ${carousel.value.slides.length} patents`);
};

// Force content refresh using the ContentRefresh component
const forceRefresh = async () => {
  if (!contentRefresh.value) {
    logDebug('Content refresh component not loaded');
    return;
  }
  
  logDebug('Forcing full content refresh and page reload...');
  await contentRefresh.value.refreshContent();
};

// List all content files
const listContentFiles = async () => {
  if (!carousel.value) {
    logDebug('Carousel component not loaded');
    return;
  }
  
  logDebug('Listing content files...');
  const files = await carousel.value.listPatentFiles();
  logDebug(`Found ${files.length} content files`);
  
  if (files.length > 0) {
    files.forEach(file => {
      logDebug(`- ${file._path}: ${file.title || 'No title'}`);
    });
  }
};

// Directly query the content store
const manualQueryContent = async () => {
  try {
    logDebug('Manually querying content API...');
    const query = `/patents`;
    
    // Custom fetch to bypass cache
    const response = await fetch(`/_content/query${query}`);
    const data = await response.json();
    
    logDebug(`Manual query results: ${data.length} items found`);
    return data;
  } catch (error) {
    logDebug(`Error in manual query: ${error.message}`);
    return [];
  }
};

// Check content after mount
onMounted(async () => {
  logDebug('Prior Work Page Mounted');
  
  // Try direct content query
  await manualQueryContent();
  
  // Wait a moment for carousel to initialize
  setTimeout(async () => {
    logDebug('Checking carousel component...');
    if (carousel.value) {
      logDebug(`Carousel loaded with ${carousel.value.slides.length} slides`);
      logDebug(`Using markdown content: ${carousel.value.fromMarkdown}`);
      
      // List content files
      await listContentFiles();
    } else {
      logDebug('Carousel component not available');
    }
  }, 1000);
});

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