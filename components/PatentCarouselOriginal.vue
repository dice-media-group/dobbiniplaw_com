<template>
  <div class="patent-carousel relative">
    <!-- Carousel container with full-width background -->
    <div class="carousel-bg py-20 relative">
      <!-- Navigation arrows -->
      <button 
        @click="prevSlide" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        @click="nextSlide" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Debug Info -->
      <div v-if="showDebug" class="absolute top-2 left-2 bg-white/90 p-2 text-xs rounded shadow-md z-50 max-w-md max-h-60 overflow-auto">
        <h4 class="font-bold mb-1">Patent Content Debug</h4>
        <p>Total patents: {{ allPatents.length }}</p>
        <p>Current index: {{ currentIndex }}</p>
        <p>Data source: {{ fromMarkdown ? 'Markdown' : 'Fallback' }}</p>
        <div>
          <p class="font-semibold mt-2">Patents loaded:</p>
          <ul class="list-disc pl-4 text-xs">
            <li v-for="(patent, idx) in allPatents" :key="idx">
              {{ patent.title }} ({{ patent._path || 'fallback' }})
            </li>
          </ul>
        </div>
        <div v-if="queryError">
          <p class="font-semibold mt-2 text-red-600">Query Error:</p>
          <p>{{ queryError }}</p>
        </div>
        <button @click="showDebug = false" class="absolute top-1 right-1 text-gray-500 hover:text-gray-800">×</button>
      </div>
      
      <!-- Toggle Debug -->
      <button 
        @click="showDebug = !showDebug" 
        class="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded z-50"
        v-if="!showDebug"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      <!-- Carousel content with animation -->
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <!-- Carousel slide container with overflow hidden for animation -->
          <div class="overflow-hidden bg-white shadow-lg rounded" style="min-height: 400px;">
            <transition-group 
              name="slide" 
              tag="div"
              class="relative"
            >
              <!-- Each slide is absolutely positioned and shown/hidden based on index -->
              <div 
                v-for="(patent, idx) in allPatents" 
                :key="patent.title" 
                v-show="idx === currentIndex"
                class="flex flex-col md:flex-row w-full"
              >
                <!-- Slide image -->
                <div class="md:w-1/2 p-10 flex items-center justify-center bg-white border-r border-gray-200">
                  <img 
                    :src="patent.image" 
                    :alt="patent.title" 
                    class="max-w-full max-h-80 object-contain patent-image"
                  />
                </div>
                
                <!-- Slide content -->
                <div class="md:w-1/2 p-10 bg-white">
                  <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green patent-title">{{ patent.title }}</h3>
                  <p class="mb-8 text-gray-700 patent-description">{{ patent.description }}</p>
                  <a 
                    :href="patent.patentNumber ? '#' + patent.patentNumber : '#'"
                    class="inline-block bg-dobbin-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-6 patent-button"
                  >
                    {{ patent.linkText || 'Patent ' + patent.patentNumber }}
                  </a>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

// For debugging
const showDebug = ref(false);
const fromMarkdown = ref(false);
const queryError = ref(null);

// Set up the slide index and patents array
const currentIndex = ref(0);
const markdownPatents = ref([]);
const allPatents = ref([]);

// Animation direction (for transitions)
const direction = ref('right'); // 'right' or 'left'

// Try direct content API access
const fetchPatentsDirectly = async () => {
  try {
    console.log('Fetching patents directly...');
    // Try to directly access the content API
    const timestamp = Date.now(); // To bypass cache
    const response = await fetch(`/_content/query/patents?_params={"where":{"_extension":"md"},"sort":[{"order":1}]}&_hash=${timestamp}`);
    const data = await response.json();
    
    console.log('Direct API results:', data);
    if (data && Array.isArray(data) && data.length > 0) {
      markdownPatents.value = data;
      fromMarkdown.value = true;
      return data;
    }
    return [];
  } catch (err) {
    console.error('Error fetching patents directly:', err);
    queryError.value = err.message;
    return [];
  }
};

// Use Nuxt Content module to fetch patent data
const fetchPatents = async () => {
  try {
    console.log('Fetching patents with queryContent...');
    const result = await queryContent('/patents')
      .where({ _extension: 'md' })
      .sort({ order: 1 })
      .find();
    
    console.log('Query result:', result);
    if (result && result.length > 0) {
      markdownPatents.value = result;
      fromMarkdown.value = true;
      return result;
    }
    return [];
  } catch (err) {
    console.error('Error querying content:', err);
    queryError.value = err.message;
    return [];
  }
};

// Fallback data in case content fetching fails
const fallbackPatents = [
  {
    title: "Monolithic LED Chip to Emit Multiple Colors",
    description: "A light emitting diode chip with red, green and blue light emission regions on a single substrate. The light emission regions may be powered selectively to only emit one color light at a time. Or all three regions may be powered simultaneously so that the LED chip emits white light.",
    image: "/img/prior-work/monolitholic-led-chip-1.png",
    patentNumber: "7,271,420",
    linkText: "Patent 7,271,420"
  },
  {
    title: "Magazine Grip",
    description: "A magazine grip attachment for ammunition magazines to aid in extraction of magazines from ammunition pouches, providing better grip and reducing noise.",
    image: "/img/prior-work/magazine-grip-1.png",
    patentNumber: "9,341,429",
    linkText: "Patent 9,341,429"
  },
  {
    title: "Firearm Gas System",
    description: "A gas system for a firearm comprising a hollow gas tube extending between a forward gas tap in a firearm's barrel and a rearward piston assembly to operate the bolt system.",
    image: "/img/prior-work/gas-system-1.png",
    patentNumber: "8,689,672",
    linkText: "Patent 8,689,672"
  },
  {
    title: "Quick-Change Barrel System",
    description: "A quick-change barrel system for firearms that allows rapid barrel replacement without special tools, increasing versatility and reducing maintenance time.",
    image: "/img/prior-work/Quick-Change-Barrel.png",
    patentNumber: "8,234,808",
    linkText: "Patent 8,234,808"
  }
];

// Load all patent files explicitly
const loadAllPatentFiles = async () => {
  try {
    // Define all the patent files we know exist
    const patentFiles = [
      '/patents/1-monolithic-led-chip',
      '/patents/2-magazine-grip',
      '/patents/3-gas-system',
      '/patents/4-quick-change-barrel',
      '/patents/5-spring-loaded',
      '/patents/6-grip',
      '/patents/7-work-light',
      '/patents/8-stroller-passenger',
      '/patents/9-cable-storage',
      '/patents/10-modular-computer',
      '/patents/11-unoccupied-dwelling',
      '/patents/12-digital-support',
      '/patents/13-gan-layer'
    ];
    
    // Load each file individually
    const loadedPatents = [];
    for (const path of patentFiles) {
      try {
        const result = await queryContent(path).find();
        if (result && result.length > 0) {
          loadedPatents.push(result[0]);
        }
      } catch (error) {
        console.error(`Error loading ${path}:`, error);
      }
    }
    
    console.log('Individually loaded patents:', loadedPatents);
    if (loadedPatents.length > 0) {
      // Sort by order
      loadedPatents.sort((a, b) => (a.order || 999) - (b.order || 999));
      markdownPatents.value = loadedPatents;
      fromMarkdown.value = true;
      return loadedPatents;
    }
    
    return [];
  } catch (err) {
    console.error('Error loading patent files:', err);
    return [];
  }
};

// Current slide based on index
const currentSlide = computed(() => {
  if (allPatents.value.length > 0) {
    return allPatents.value[currentIndex.value];
  }
  return null;
});

// Previous slide navigation with animation direction
const prevSlide = () => {
  if (allPatents.value.length > 0) {
    direction.value = 'left';
    currentIndex.value = (currentIndex.value - 1 + allPatents.value.length) % allPatents.value.length;
  }
};

// Next slide navigation with animation direction
const nextSlide = () => {
  if (allPatents.value.length > 0) {
    direction.value = 'right';
    currentIndex.value = (currentIndex.value + 1) % allPatents.value.length;
  }
};

// Props for configuration
const props = defineProps({
  autoplay: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 5000
  }
});

// Force refresh content (for debugging)
const refreshContent = async () => {
  try {
    console.log('Manually refreshing content...');
    
    // Try all methods of loading content
    const directResult = await fetchPatentsDirectly();
    const queryResult = await fetchPatents();
    const individualResult = await loadAllPatentFiles();
    
    // Use whichever method returned patents
    if (directResult.length > 0) {
      console.log('Using direct API results');
      allPatents.value = directResult;
      fromMarkdown.value = true;
    } else if (queryResult.length > 0) {
      console.log('Using queryContent results');
      allPatents.value = queryResult;
      fromMarkdown.value = true;
    } else if (individualResult.length > 0) {
      console.log('Using individually loaded patents');
      allPatents.value = individualResult;
      fromMarkdown.value = true;
    } else {
      console.log('No markdown patents found, using fallback');
      allPatents.value = fallbackPatents;
      fromMarkdown.value = false;
    }
  } catch (err) {
    console.error('Error refreshing content:', err);
    queryError.value = err.message;
    allPatents.value = fallbackPatents;
    fromMarkdown.value = false;
  }
};

// List all available content files
const listPatentFiles = async () => {
  try {
    console.log('Listing all content files...');
    // This will list all available content files
    const allFiles = await queryContent().find();
    console.log('All content files:', allFiles);
    return allFiles;
  } catch (err) {
    console.error('Error listing content files:', err);
    return [];
  }
};

// Expose properties and methods for parent components
defineExpose({
  allPatents,
  currentSlide,
  fromMarkdown,
  prevSlide,
  nextSlide,
  currentIndex,
  refreshContent,
  listPatentFiles
});

let intervalId = null;

// Initialize content on mount
onMounted(async () => {
  console.log('PatentCarousel mounted');
  
  // Try all content loading methods
  await refreshContent();
  
  // Set up autoplay if enabled
  if (props.autoplay && allPatents.value.length > 0) {
    intervalId = setInterval(nextSlide, props.interval);
  }
});

// Clean up interval on component unmount
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.carousel-bg {
  background-image: url('/img/Patent-Diagram.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #e5ede8; /* Light green color as fallback and overlay tint */
  background-blend-mode: overlay; /* Blend the image with the background color */
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Ensure the background has a green tint */
.carousel-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(32, 108, 70, 0.1); /* Light green overlay */
  z-index: -1;
}

/* Slide animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Animation for individual elements */
.patent-image, .patent-title, .patent-description, .patent-button {
  transition: all 0.5s;
  transition-delay: 0.2s;
}

.slide-enter-from .patent-image,
.slide-enter-from .patent-title,
.slide-enter-from .patent-description,
.slide-enter-from .patent-button {
  opacity: 0;
  transform: translateY(20px);
}

.slide-enter-from .patent-title {
  transition-delay: 0.3s;
}

.slide-enter-from .patent-description {
  transition-delay: 0.4s;
}

.slide-enter-from .patent-button {
  transition-delay: 0.5s;
}
</style>