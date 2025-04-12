<template>
  <div 
    v-show="isActive"
    class="flex flex-col md:flex-row w-full patent-slide"
  >
    <!-- Added patent existence check -->
    <template v-if="patent">
      <!-- Slide image with orange background -->
      <div class="md:w-1/2 p-10 bg-white">
        <img 
          :src="getImagePath(patent.image)" 
          :alt="patent.title" 
          class="max-w-full max-h-96 object-contain patent-image mx-auto"
          @error="handleImageError"
        />
      </div>
      
      <!-- Slide content -->
      <div class="md:w-1/2 p-10 bg-white">
        <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green patent-title">{{ patent.title }}</h3>
        <p class="mb-8 text-gray-700 patent-description">{{ patent.description }}</p>
        <a 
          :href="getGooglePatentUrl(patent.patentNumber)"
          class="inline-block bg-dobbin-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-6 patent-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ patent.linkText || 'Patent ' + patent.patentNumber }}
        </a>
      </div>
    </template>
    
    <!-- Fallback for undefined patent -->
    <template v-else>
      <div class="w-full p-10 bg-white text-center">
        <p class="text-gray-600">Patent information is currently unavailable.</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Props to receive from parent component
const props = defineProps({
  patent: {
    type: Object,
    default: null // Changed from required to allow null/undefined
  },
  isActive: {
    type: Boolean,
    default: false
  },
  slideDirection: {
    type: String,
    default: 'right'
  }
});

// For image fallback handling
const fallbackSrc = ref('');
const imageError = ref(false);

/**
 * Patent type mappings (most common types)
 * For patents that don't include B1, B2, etc. in patentNumber
 */
const patentTypeMappings = {
  '7271420': 'B2',
  '9341429': 'B2',
  '8689672': 'B2',
  '8234808': 'B2',
  '6212815': 'B1',
};

/**
 * Handles image loading errors and tries to use fallback paths
 */
const handleImageError = (event) => {
  if (!imageError.value) {
    imageError.value = true;
    const originalSrc = event.target.src;
    console.log(`Image failed to load: ${originalSrc}`);
    
    // Try a fallback approach - if in prior-work folder, try direct in img folder and vice versa
    let newSrc = '';
    
    if (originalSrc.includes('/prior-work/')) {
      // If it was in prior-work/ try direct path
      const filename = originalSrc.split('/').pop();
      newSrc = `/img/${filename}`;
    } else {
      // If it was direct path, try prior-work/
      const filename = originalSrc.split('/').pop();
      newSrc = `/img/prior-work/${filename}`;
    }
    
    console.log(`Trying fallback image: ${newSrc}`);
    event.target.src = newSrc;
    fallbackSrc.value = newSrc;
  }
};

/**
 * Gets the appropriate image path with fallback handling
 */
const getImagePath = (imagePath) => {
  if (!imagePath) {
    return '/img/Patent-Diagram.png'; // Default image if none provided
  }
  
  if (imageError.value && fallbackSrc.value) {
    return fallbackSrc.value;
  }
  
  // Ensure the image path has a leading slash
  if (imagePath && !imagePath.startsWith('/')) {
    return `/${imagePath}`;
  }
  
  return imagePath;
};

/**
 * Formats the patent number to create a Google Patents URL
 * @param {string} patentNumber - The patent number (e.g., "7,271,420")
 * @returns {string} - The Google Patents URL
 */
const getGooglePatentUrl = (patentNumber) => {
  if (!patentNumber) return '#';
  
  // Remove commas and spaces from patent number
  let formattedNumber = patentNumber.replace(/,|\s/g, '');
  
  // Check if we need to add B1, B2, etc.
  if (!/[A-Z]\d+$/.test(formattedNumber)) {
    // Get base number without any designation
    const baseNumber = formattedNumber.replace(/^US/i, '');
    
    // Check if we have a type mapping for this patent
    if (patentTypeMappings[baseNumber]) {
      formattedNumber += patentTypeMappings[baseNumber];
    } else {
      // Default to B2 if no mapping exists
      formattedNumber += 'B2';
    }
  }
  
  // Check if it's a US patent (most common case)
  const prefix = formattedNumber.startsWith('US') ? '' : 'US';
  
  // Construct the Google Patents URL
  return `https://patents.google.com/patent/${prefix}${formattedNumber}/en`;
};
</script>

<style scoped>
/* Ensure slide has proper positioning for animation */
.patent-slide {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
}

/* Animation for individual elements - disabled for now */
.patent-image, .patent-title, .patent-description, .patent-button {
  transition: none; /* Disabled transitions */
}

/* Staggered animation disabled */
.slide-enter-from .patent-image,
.slide-enter-from .patent-title,
.slide-enter-from .patent-description,
.slide-enter-from .patent-button {
  opacity: 1;
  transform: none;
  transition-delay: 0s;
}

/* Additional centering and sizing for image */
.patent-image {
  display: block;
  margin: 0 auto;
  max-height: 350px;
  width: auto;
}
</style>