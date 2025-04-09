<template>
  <div 
    v-show="isActive"
    class="flex flex-col md:flex-row w-full patent-slide"
  >
    <!-- Slide image with orange background -->
    <div class="md:w-1/2 p-10 bg-white">
      <img 
            :src="patent.image" 
            :alt="patent.title" 
            class="max-w-full max-h-96 object-contain patent-image mx-auto"
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
  </div>
</template>

<script setup>
// Props to receive from parent component
const props = defineProps({
  patent: {
    type: Object,
    required: true
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