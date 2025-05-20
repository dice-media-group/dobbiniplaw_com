<template>
  <div v-if="patent" class="px-4 py-4 md:px-8 md:py-6 bg-gradient-to-b from-black to-dobbin-gray">
    <!-- Card-like container with Netflix-style layout -->
    <div class="featured-patent-card relative overflow-hidden rounded-xl shadow-2xl">
      <!-- Dynamic background layout - stacked on mobile, side-by-side on desktop -->
      <div class="relative h-[420px] md:h-[380px] overflow-hidden">
        <!-- Background image positioned to the right on desktop -->
        <div class="absolute inset-0 z-0">
          <img 
            :src="getFeaturedImageSrc" 
            :alt="patent.title" 
            class="w-full h-full object-cover opacity-60 md:opacity-80"
          />
          
          <!-- Gradient overlay for text readability - shifts right on desktop -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:bg-gradient-to-r md:from-dobbin-blue md:via-dobbin-blue/70 md:to-transparent"></div>
          
          <!-- Card edge highlight effect -->
          <div class="absolute inset-0 pointer-events-none card-highlight-border"></div>
        </div>
        
        <!-- Content container - optimized for side-by-side layout on desktop -->
        <div class="relative z-10 h-full flex flex-col md:flex-row">
          <!-- Left side: Text content -->
          <div class="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-end md:justify-center">
            <!-- Title with proper size scaling -->
            <div class="mb-2">
              <h2 class="text-3xl md:text-5xl font-bold leading-tight text-white patent-title-glow">{{ patent.title }}</h2>
            </div>
            
            <!-- Metadata -->
            <p class="text-lg text-gray-200 mb-3">Patent {{ patent.id }} • {{ formatDate(patent.publicationDate) }}</p>
            
            <!-- Abstract with line clamp -->
            <p v-if="patent.abstract" class="text-gray-300 mb-5 max-w-xl line-clamp-2">
              {{ patent.abstract }}
            </p>
            
            <!-- Watch Now / Play button -->
            <div class="flex space-x-4 mt-2">
              <button 
                class="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-md flex items-center font-bold text-base transition-colors duration-200 shadow-lg"
                @click="$emit('view-details', patent)"
              >
                <span class="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </span>
                View Details
              </button>
              
              <a 
                :href="`https://patents.google.com/patent/${patent.id.replace(/-/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-transparent border border-gray-300 text-white px-6 py-3 rounded-md flex items-center font-bold text-base transition-opacity duration-200 hover:bg-white/10 shadow-lg"
              >
                Google Patents
              </a>
            </div>
          </div>
          
          <!-- Right side: Empty space to show image (on desktop) -->
          <div class="hidden md:block md:w-1/2">
            <!-- Intentionally empty to allow the background image to show through -->
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Loading state -->
  <div v-else-if="isLoading" class="h-96 flex items-center justify-center bg-dobbin-gray">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  </div>
  
  <!-- No featured patent state -->
  <div v-else class="h-96 flex items-center justify-center bg-dobbin-gray">
    <p class="text-gray-400 text-xl">No featured patent available</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  patent: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['view-details']);

// Computed image source
const getFeaturedImageSrc = computed(() => {
  if (hasRealImage(props.patent)) {
    const image = props.patent.images[0];
    
    // Handle both old and new image formats
    if (typeof image === 'string') {
      return image;
    } else if (image.hires) {
      return image.hires;
    } else if (image.thumbnail) {
      return image.thumbnail;
    }
  }
  
  return '/img/gear_only.svg';
});

// Check if a patent has actual images (not just placeholders)
function hasRealImage(patent) {
  if (!patent || !patent.images || patent.images.length === 0) {
    return false;
  }
  
  // Check if any image is a placeholder
  for (const image of patent.images) {
    if (typeof image === 'string' && image.includes('placeholder')) {
      return false;
    } else if (image.thumbnail && image.thumbnail.includes('placeholder')) {
      return false;
    } else if (image.hires && image.hires.includes('placeholder')) {
      return false;
    }
  }
  
  return true;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
</script>

<style scoped>
/* Featured Patent Card Styling */
.featured-patent-card {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  position: relative;
}

.featured-patent-card:hover {
  transform: scale(1.01);
}

/* Card border highlight effect */
.card-highlight-border {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  border-radius: inherit;
}

/* Title glow effect */
.patent-title-glow {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

/* Custom 2-line truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
