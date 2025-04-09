<template>
  <div 
    v-show="isActive"
    class="flex flex-col md:flex-row w-full patent-slide"
  >
    <!-- Slide image with improved centering, increased height and padding top -->
    <div class="md:w-1/2 pt-12 pb-6 px-6 flex items-center justify-center bg-white border-r border-gray-200">
      <div class="w-full h-full flex items-center justify-center mt-8">
        <img 
          :src="patent.image" 
          :alt="patent.title" 
          class="max-w-full max-h-96 object-contain patent-image mx-auto"
        />
      </div>
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

/* Animation for individual elements */
.patent-image, .patent-title, .patent-description, .patent-button {
  transition: all 0.5s;
}

/* Staggered animation for elements within the slide */
.slide-enter-from .patent-image {
  opacity: 0;
  transform: scale(0.9);
  transition-delay: 0.2s;
}

.slide-enter-from .patent-title {
  opacity: 0;
  transform: scale(0.9);
  transition-delay: 0.3s;
}

.slide-enter-from .patent-description {
  opacity: 0;
  transform: scale(0.9);
  transition-delay: 0.4s;
}

.slide-enter-from .patent-button {
  opacity: 0;
  transform: scale(0.9);
  transition-delay: 0.5s;
}

/* Additional centering and sizing for image */
.patent-image {
  display: block;
  margin: 0 auto;
  max-height: 400px; /* Increased maximum height */
  width: auto;
  margin-top: 1.5rem; /* Additional top margin */
}
</style>