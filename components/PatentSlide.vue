<template>
  <div 
    v-show="isActive"
    class="flex flex-col md:flex-row w-full patent-slide"
  >
    <!-- Slide image with orange background -->
    <div class="md:w-1/2 flex bg-orange-400 border-r border-gray-200">
      <div class="w-full flex flex-col justify-center px-6">
        <!-- Added empty div with same height as title margin + padding for alignment -->
        <div class="h-10"></div>
        <div class="flex items-center justify-center">
          <img 
            :src="patent.image" 
            :alt="patent.title" 
            class="max-w-full max-h-96 object-contain patent-image mx-auto"
          />
        </div>
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